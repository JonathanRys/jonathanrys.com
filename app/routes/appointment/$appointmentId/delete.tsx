import type { LoaderFunction, ActionFunction } from "@remix-run/node";
import { Form, useLoaderData } from '@remix-run/react';
import Modal from '~/modal/modal';
import ModalFooter from '~/modal/modalFooter';
// import { useOptionalUser } from "~/utils";
import { deleteAppointment, getAppointment } from "~/models/appointment.server";
import invariant from "tiny-invariant";
import type { Appointment, AppointmentItem } from "~/models/appointment.server";
import { json, redirect } from "@remix-run/node";
import { requireUserId } from "~/session.server";

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

export const action: ActionFunction = async ({ request, params }) => {
  const userId = await requireUserId(request);
  invariant(params.appointmentId, "appointmentId not found");

  await deleteAppointment({ userId, id: params.appointmentId });

  return redirect('/appointment');
}

const DeleteAppointmentModal = () => {
  // const user = useOptionalUser();
  const { appointment } = useLoaderData();
  const skToId = (sk: AppointmentItem["sk"]): Appointment["id"] => sk.replace(/^appointment#/, "");

  return (
    <Modal>
      <Form action={`/appointment/${skToId(appointment.id)}/delete`} method="post">
        <div className="px-5 py-8">
          <h1 className="text-xl font-medium leading-normal text-zinc-800 pb-2 mb-5 border-b-2">Delete Appointment</h1>
          <div className="flex flex-col pb-2">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" readOnly className="inactive px-2 py-1" value={ appointment.title } />
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="location">Location</label>
            <select name="location" className="inactive px-2 py-1" defaultValue={ appointment.location }>
              <option value={appointment.location}>{appointment.location}</option>
            </select>
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="startDate">Start Date</label>
            <input name="startDate" type="text" readOnly className="inactive px-2 py-1" value={ appointment.startDate } />
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="endDate">End Date</label>
            <input name="endDate" type="text" readOnly className="inactive px-2 py-1" value={ appointment.endDate } />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea name="description" readOnly className="inactive px-2 py-1" value={ appointment.description }></textarea>
          </div>
        </div>
        <ModalFooter close={true} buttons={[
          { submit: true, value: 'Delete' }
        ]}/>
      </Form>
    </Modal>
  )
}

export default DeleteAppointmentModal;
