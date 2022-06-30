import type { MetaFunction, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useState, useRef, useEffect } from 'react';
import { json, redirect } from "@remix-run/node";
import Modal from '~/modal/modal';
import ModalFooter from '~/modal/modalFooter';
import invariant from "tiny-invariant";
import { Form, useLoaderData, useActionData } from "@remix-run/react";
import { requireUserId } from "~/session.server";
import type { Appointment, AppointmentItem } from "~/models/appointment.server";
import { updateAppointment, getAppointment } from "~/models/appointment.server";
// import { useOptionalUser } from "~/utils";
import DatePicker from "react-datepicker";

export const meta: MetaFunction = () => {
  return {
    title: "Edit an Appointment",
  };
};

type LoaderData = {
  appointment: Appointment;
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.appointmentId, "appointmentId not found");

  const appointment = await getAppointment({ userId, id: params.appointmentId });
  if (!appointment) {
    throw new Response("Not Found", { status: 404 });
  }
  return json<LoaderData>({ appointment });
};

type ActionData = {
  errors?: {
    title?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  }
  location?: string
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const id = formData.get("id");
  const title = formData.get("title");
  const location = formData.get("location");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const description = formData.get("description");

  // validate data
  if (typeof id !== "string" || id.length === 0) {
    return json<ActionData>(
      {
        errors: { title: "Invalid  required" },
        location: "/",
      },
      { status: 302 }
    );
  }

  if (typeof title !== "string" || title.length === 0) {
    return json<ActionData>(
      { errors: { title: "Title is required" } },
      { status: 400 }
    );
  }

  if (typeof location !== "string" || location.length === 0) {
    return json<ActionData>(
      { errors: { location: "Location is required" } },
      { status: 400 }
    );
  }

  if (typeof startDate !== "string" || startDate.length === 0) {
    return json<ActionData>(
      { errors: { startDate: "Start date is required" } },
      { status: 400 }
    );
  }

  if (typeof endDate !== "string" || endDate.length === 0) {
    return json<ActionData>(
      { errors: { endDate: "Start date is required" } },
      { status: 400 }
    );
  }

  if (typeof description !== "string" || description.length === 0) {
    return json<ActionData>(
      { errors: { description: "A description is required" } },
      { status: 400 }
    );
  }

  // update database
  await updateAppointment({
    userId,
    id,
    title,
    location,
    startDate: startDate,
    endDate: endDate,
    description
  });

  return redirect(`/appointment`);
}

const EditAppointmentModal = () => {
  const { appointment } = useLoaderData();

  const [startDate, setStartDate] = useState(new Date(appointment.startDate));
  const [endDate, setEndDate] = useState(new Date(appointment.endDate));
  const titleRef = useRef<HTMLInputElement>(appointment.title);
  const descriptionRef = useRef<HTMLTextAreaElement>(appointment.description);

  const actionData = useActionData() as ActionData;

  const skToId = (sk: AppointmentItem["sk"]): Appointment["id"] => sk.replace(/^appointment#/, "");

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Modal>
      <Form action={`/appointment/${skToId(appointment.id)}/edit`} method="post">
        <div className="px-5 py-8">
          <h1 className="text-xl font-medium leading-normal text-zinc-800 pb-2 mb-5 border-b-2">Edit Appointment</h1>
          <input name="id" type="hidden" value={ appointment.id } />
          <div className="flex flex-col pb-2">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" className="border-2 rounded px-2 py-1" ref={titleRef} defaultValue={ appointment.title } />
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="location">Location</label>
            <select name="location" className="border-2 rounded px-2 py-1" defaultValue={ appointment.location } >
              <option value="phone">Phone call</option>
              <option value="zoom">Zoom meeting</option>
            </select>
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="startDate">Start Date</label>
            <DatePicker
              name="startDate"
              className="border-2 rounded px-2 py-1"
              showTimeSelect
              selected={startDate}
              dateFormat="Pp"
              onChange={ (date:Date) => setStartDate(date) }/>
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="endDate">End Date</label>
            <DatePicker 
              name="endDate"
              className="border-2 rounded px-2 py-1"
              showTimeSelect
              selected={endDate}
              dateFormat="Pp"
              onChange={ (date:Date) => setEndDate(date) }/>
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="border-2 rounded px-2 py-1" ref={ descriptionRef } defaultValue={appointment.description}></textarea>
          </div>
        </div>
        <ModalFooter close={true} buttons={[
          { onClick: () => {}, submit: true, value: 'Update' }
        ]}/>
      </Form>
    </Modal>
  )
}

export default EditAppointmentModal;
