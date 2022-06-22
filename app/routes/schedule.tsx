import { Outlet, Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction } from "@remix-run/node";

import { getUser } from "~/session.server";

import type { Appointment } from "~/models/appointment.server";
import { getAppointmentListItems } from "~/models/appointment.server";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) {
    return [];
  }

  return await getAppointmentListItems({ userId: user.id });
};

const Appointments = () => {    
    const { appointments } = useLoaderData();

    return (
      <>
        <h1 className="text-xl">Schedule</h1>
        <p>Here is my schedule.  If you&apos;d like to set up some time to talk, 
          <Link className="hyperlink" to="/schedule/create"> schedule a meeting </Link>
          or feel free to <a className="hyperlink" href="mailto: jonathan.rk.rys@gmail.com">reach out via email</a>.</p>
        <ul>
          {
            appointments && appointments.map( (appointment: Appointment, index: number) => {
              const startTime = new Date(appointment.startDate).toLocaleString();
              const endTime = new Date(appointment.endDate).toLocaleString();

              return (
                <li className={`${index ? 'my-8' : 'mb-8'} p-5 rounded-md bg-zinc-200`} key={`job-${appointment.id}` }>
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
