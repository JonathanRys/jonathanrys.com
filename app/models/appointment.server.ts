import arc from "@architect/functions";
import cuid from "cuid";

import type { User } from "./user.server";

export type Appointment = {
  id: ReturnType<typeof cuid>;
  userId: User["id"];
  title: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
};

export type AppointmentItem = {
  pk: User["id"];
  sk: `appointment#${Appointment["id"]}`;
};

const skToId = (sk: AppointmentItem["sk"]): Appointment["id"] => sk.replace(/^appointment#/, "");
const idToSk = (id: Appointment["id"]): AppointmentItem["sk"] => `appointment#${id}`;

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
}: Pick<Appointment, "userId">): Promise<Array<Pick<Appointment, "id" | "title" | "location" | "startDate" | "endDate">>> {
  const db = await arc.tables();

  const result = await db.appointment.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId },
  });

  return result.Items.map((n: any) => ({
    title: n.title,
    location: n.location,
    startDate: n.startDate,
    endDate: n.endDate,
    description: n.description,
    id: skToId(n.sk),
  }));
}

export async function createAppointment({
  userId,
  title,
  description,
  location,
  startDate,
  endDate
}: Pick<Appointment, "description" | "title" | "userId" | "location" | "startDate" | "endDate">): Promise<Appointment> {
  const db = await arc.tables();

  const result = await db.appointment.put({
    pk: userId,
    sk: idToSk(cuid()),
    title: title,
    description: description,
    location: location,
    startDate: startDate,
    endDate: endDate
  });
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
  title,
  description,
  location,
  startDate,
  endDate
}: Pick<Appointment, "description" | "title" | "userId" | "location" | "startDate" | "endDate">): Promise<Appointment> {
  const db = await arc.tables();

  const result = await db.appointment.update({
    pk: userId,
    sk: idToSk(cuid()),
    ...arguments // @TODO:security
  });
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

export async function deleteAppointment({ id, userId }: Pick<Appointment, "id" | "userId">) {
  const db = await arc.tables();
  console.log('deleting', id)
  return db.appointment.delete({ pk: userId, sk: idToSk(id) });
}
