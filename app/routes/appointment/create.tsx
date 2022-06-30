import type { MetaFunction, ActionFunction } from "@remix-run/node";
import { useState, useRef, useEffect } from 'react';
import { json, redirect } from "@remix-run/node";
import Modal from '~/modal/modal';
import ModalFooter from '~/modal/modalFooter';
import { Form, useActionData } from "@remix-run/react";
import { useOptionalUser } from "~/utils";
import { requireUserId } from "~/session.server";
import DatePicker from "react-datepicker";
import { createAppointment } from '~/models/appointment.server'

export const meta: MetaFunction = () => {
  return {
    title: "Schedule an Appointment",
  };
};

type ActionData = {
  errors?: {
    title?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    description?: string;
  };
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");
  const location = formData.get("location");
  const startDate = formData.get("startDate");
  const endDate = formData.get("endDate");
  const description = formData.get("description");

  // validate data
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
  await createAppointment({
    userId,
    title,
    location,
    startDate: startDate,
    endDate: endDate,
    description
  });

  return redirect(`/appointment`);

}

const CreateAppointmentModal = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const user = useOptionalUser();
  const actionData = useActionData() as ActionData;
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    } else if (actionData?.errors?.description) {
      descriptionRef.current?.focus();
    }
  }, [actionData]);

  return (
    <Modal>
      <Form action="/appointment/create" method="post">
        <div className="px-5 py-8">
          <h1 className="text-xl font-medium leading-normal text-zinc-800 pb-2 mb-5 border-b-2">Create Appointment</h1>
          <div className="flex flex-col pb-2">
            <label htmlFor="title">Title</label>
            <input name="title" ref={titleRef} type="text" className="border-2 rounded px-2 py-1" defaultValue={`Meeting with ${user?.email.split('@')[0]}`} />
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="location">Location</label>
            <select name="location" className="border-2 rounded px-2 py-1">
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
            <textarea name="description" ref={descriptionRef} className="border-2 rounded px-2 py-1"></textarea>
          </div>
        </div>
        <ModalFooter close={true} buttons={[
          { onClick: () => {}, submit: true, value: 'Create' }
        ]}/>
      </Form>
    </Modal>
  )
}

export default CreateAppointmentModal;
