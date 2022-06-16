import { Outlet, useLoaderData } from '@remix-run/react';

export const loader = () => {
  const data = {
    appointments: [
      {
        id: 1,
        title: 'Meeting',
        location: 'Cambridge, MA',
        startDate: '2022-06-15T15:00:00.000Z',
        endDate: '2022-06-15T18:00:00.000Z',
        description: ''
      },
      {
        id: 2,
        title: 'Meeting',
        location: 'Zoom',
        startDate: '2022-12-15T12:00:00.000Z',
        endDate: '2022-12-15T11:00:00.000Z',
        description: ''
      },
      {
        id: 3,
        title: 'Meeting',
        location: 'Boston, MA',
        startDate: '2022-07-14T07:00:00.000Z',
        endDate: '2022-07-14T08:30:00.000Z',
        description: ''
      },
    ]
  };

  return data;
};

interface Appointment {
  id: number,
  title: string,
  location: string,
  startDate: string,
  endDate: string,
  description: string
}

const Appointments = () => {    
    const { appointments } = useLoaderData();

    return (
      <>
        <h1 className="text-xl">Schedule</h1>
        <p>Here is my schedule.  If you&apos;d like to set up some time to talk, please <a className="hyperlink" href="mailto: jonathan.rk.rys@gmail.com">reach out</a>.</p>
        <ul>
          {
            appointments.map( (appointment: Appointment) => {
              const startTime = new Date(appointment.startDate).toLocaleString();
              const endTime = new Date(appointment.endDate).toLocaleString();

              return (
                <li className="my-8 p-5 rounded-md bg-zinc-200" key={`job-${appointment.id}` }>
                    <h4 className="py-1">
                      { appointment.location }
                    </h4>
                    <div>
                      <span className="font-bold">
                        { appointment.title }
                      </span> ({ startTime } - { endTime }): { appointment.description }
                    </div>
                </li>
              );
            })
          }            
        </ul>
        <Outlet />
      </>
    );
};

export default Appointments;