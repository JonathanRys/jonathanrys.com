import arc from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";

import type { User } from "./user.server";
import { sendAppointmentEmail } from "~/util/google_tools";

export type Appointment = {
  id?: ReturnType<typeof createId>;
  userId: User["id"];
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  timeZone?: string;
  gcal_event_id?: string;
};

export type AppointmentItem = {
  pk: User["id"];
  sk: `appointment#${Appointment["id"]}`;
};

const skToId = (sk: AppointmentItem["sk"]): Appointment["id"] =>
  sk.replace(/^appointment#/, "");
const idToSk = (id: Appointment["id"]): AppointmentItem["sk"] =>
  `appointment#${id}`;

export async function getAppointment({
  id,
  userId,
}: Pick<Appointment, "id" | "userId">): Promise<Appointment | null> {
  const db = await arc.tables();

  const result = await await db.appointment.get({ pk: userId, sk: idToSk(id) });

  if (result) {
    return {
      userId: result.pk,
      id: result.sk,
      title: result.title,
      description: result.description,
      location: result.location,
      startDate: result.startDate,
      endDate: result.endDate,
    };
  }
  return null;
}

export async function getAppointmentListItems({
  userId,
}: Pick<Appointment, "userId">): Promise<
  Array<
    Pick<Appointment, "id" | "title" | "location" | "startDate" | "endDate">
  >
> {
  const db = await arc.tables();

  const admins = [
    "email#admin@jonathanrys.com",
    `email#${process.env.ADMIN_EMAIL}`,
  ];

  let response;
  let result;

  if (userId && admins.includes(userId)) {
    response = await db.appointment.scan({});
    result = response.Items.map(
      (item: Appointment & AppointmentItem): Appointment => ({
        userId: item.userId,
        title: item.title,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
        id: skToId(item.sk),
      })
    );
  } else {
    response = await db.appointment.query({
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": userId },
    });
    result = response.Items.map(
      (item: Appointment & AppointmentItem): Appointment => ({
        userId: item.userId,
        title: item.title,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
        id: skToId(item.sk),
      })
    );
  }

  return result;
}

export async function createAppointment({
  userId,
  title,
  description,
  location,
  startDate,
  endDate,
}: Pick<
  Appointment,
  "description" | "title" | "userId" | "location" | "startDate" | "endDate"
>): Promise<Appointment> {
  const db = await arc.tables();

  const result = await db.appointment.put({
    pk: userId,
    sk: idToSk(createId()),
    title: title,
    description: description,
    location: location,
    startDate: startDate,
    endDate: endDate,
  });

  // Add calendar event

  // Send email confirmation
  try {
    sendAppointmentEmail(result);
  } catch (err) {
    console.log("Error sending event creation email:", err);
  }

  return {
    id: skToId(result.sk),
    userId: result.pk,
    title: result.title,
    description: result.description,
    location: result.location,
    startDate: result.startDate,
    endDate: result.endDate,
  };
}

export async function updateAppointment({
  userId,
  id,
  title,
  description,
  location,
  startDate,
  endDate,
}: Pick<
  Appointment,
  | "description"
  | "title"
  | "userId"
  | "id"
  | "location"
  | "startDate"
  | "endDate"
>): Promise<Appointment> {
  const db = await arc.tables();

  const result = await db.appointment.put({
    pk: userId,
    sk: id,
    title: title,
    description: description,
    location: location,
    startDate: startDate,
    endDate: endDate,
  });

  if (result) {
    db.appointment.delete({ pk: userId, sk: idToSk(id) });
  }

  // Update calendar

  // Send update email
  try {
    sendAppointmentEmail(result);
  } catch (err) {
    console.log("Error sending event update email:", err);
  }

  return {
    id: id,
    userId: result.pk,
    title: result.title,
    description: result.description,
    location: result.location,
    startDate: result.startDate,
    endDate: result.endDate,
  };
}

export async function deleteAppointment({
  id,
  userId,
}: Pick<Appointment, "id" | "userId">) {
  const db = await arc.tables();

  const appointment = (await db.appointment.delete({
    pk: userId,
    sk: idToSk(id),
  })) as Appointment & AppointmentItem;

  // Delete calendar event

  // Send deleted email
  try {
    sendAppointmentEmail(appointment);
  } catch (err) {
    console.log("Error sending event deleted email:", err);
  }

  return appointment;
}
