import type { MetaFunction } from "@remix-run/node";
import Modal from '~/modal/modal';
import ModalFooter from '~/modal/modalFooter';
import Form from '~/util/form';
import { useOptionalUser } from "~/utils";

export const meta: MetaFunction = () => {
  return {
    title: "Schedule an Appointment",
  };
};

const CreateAppointmentModal = () => {
  const user = useOptionalUser();

  return (
    <Modal>
      <Form action="/appointment/create">
        <div className="px-5 py-8">
          <h1 className="text-xl font-medium leading-normal text-zinc-800 pb-2 mb-5 border-b-2">Create Appointment</h1>
          <div className="flex flex-col pb-2">
            <label htmlFor="title">Title</label>
            <input name="title" type="text" className="border-2 rounded px-2 py-1" defaultValue={`Meeting with ${user && user.email.split('@')[0]}`} />
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
            <input name="startDate" type="text" className="border-2 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col pb-2">
            <label htmlFor="endDate">End Date</label>
            <input name="endDate" type="text" className="border-2 rounded px-2 py-1" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>
            <textarea name="description" className="border-2 rounded px-2 py-1"></textarea>
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
