import { Outlet, Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { useState } from 'react';

import { getUser } from "~/session.server";
import type { Appointment } from "~/models/appointment.server";
import { getAppointmentListItems } from "~/models/appointment.server";

import Notification from '~/util/notification'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  if (!user) {
    return [];
  }

  return await getAppointmentListItems({ userId: user.id });
};

export const meta: MetaFunction = () => {
  return {
    title: "Upcoming Appointments",
  };
};

const Appointments = () => {    
    const { appointments } = useLoaderData();
    const [message, setMessage] = useState('');

    const copyHandler = () => {
      navigator.clipboard.writeText('jonathan.rk.rys@gmail.com')
      setMessage('Email copied to clipboard');
    }

    return (
      <>
        <Notification message={message} setMessage={setMessage}/>
        <h1 className="text-xl">Upcoming appointments</h1>
        <p className="mt-5">If you&apos;d like to set up some time to talk, 
          <Link className="hyperlink" to="/appointment/create?redirectTo=/appointment"> schedule an appointment </Link>
          or feel free to <a className="hyperlink" href="mailto: jonathan.rk.rys@gmail.com" onClick={ copyHandler }>
            reach out via email
          </a>.
        </p>
        <ul>
          {
            appointments ? 
            appointments.map( (appointment: Appointment, index: number) => {
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
            }) :
            <>
              <li className='my-4 mx-1'>You have no upcoming appointments.</li>
              <li className='my-4 mx-1 text-sm'>Scheduling an appointment will send a confirmation email and an email alert one day before the event to both parties.</li>
            </>
          }            
        </ul>
        <Outlet />
      </>
    );
};

export default Appointments;
