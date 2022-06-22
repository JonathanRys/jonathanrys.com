import Modal from '~/modal/modal';
import ModalFooter from '~/modal/modalFooter';
import Form from '~/util/form';

const AppointmentModal = () => { 
  return (
    <Modal>
      <Form className="px-5 py-8">
        <h1 className="text-xl font-medium leading-normal text-zinc-800 pb-2 mb-5 border-b-2">Create Appointment</h1>
        <div className="flex flex-col pb-2">
          <label htmlFor="title">Title</label>
          <input name="title" type="text" className="border-2 rounded" />
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="location">Location</label>
          <input name="location" type="text" className="border-2 rounded" />
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="startDate">Start Date</label>
          <input name="startDate" type="text" className="border-2 rounded" />
        </div>
        <div className="flex flex-col pb-2">
          <label htmlFor="endDate">End Date</label>
          <input name="endDate" type="text" className="border-2 rounded" />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description">Description</label>
          <textarea name="description" className="border-2 rounded"></textarea>
        </div>
      </Form>
      <ModalFooter close={true} buttons={[
        { onClick: () => {}, value: 'Create' }
      ]}/>
    </Modal>
  )
}

export default AppointmentModal;
