import { Outlet, Link, useLoaderData } from '@remix-run/react';
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import type { FC } from "react";
import { useState } from 'react';

import { getUser } from "~/session.server";
import type { Appointment } from "~/models/appointment.server";
import { getAppointmentListItems } from "~/models/appointment.server";
import { useOptionalUser } from "~/utils";
import Notification from '~/util/notification'

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  console.log('Loader user:', user)
  if (!user) {
    return [];
  }

  const appointments = await getAppointmentListItems({ userId: user.id });

  console.log('Loader appointments:', appointments)

  return appointments;
};

export const meta: MetaFunction = () => {
  return {
    title: "Upcoming Appointments",
  };
};

type IconProps = {
  location: string
}

const Icon: FC<IconProps> = ({ location }) => {
  switch(location) {
  case 'phone':
    return (<i className="icon-phone"></i>)
  case 'zoom':
    return (<i className="icon-video-camera"></i>)
  }
  return null;
}

const Appointments = () => {
  const user = useOptionalUser();
  const appointments = useLoaderData();
  const [message, setMessage] = useState('');

  console.log('user:', user)
  console.log('appointments:', appointments)

  const copyHandler = () => {
    navigator.clipboard.writeText('jonathan.rk.rys@gmail.com')
    setMessage('Email copied to clipboard');
  }

  return (
    <>
      <Notification message={message} setMessage={setMessage}/>
      <h1 className="text-xl">Upcoming appointments</h1>
      <p className="mt-5">If you&apos;d like to set up some time to talk,
        {
        user ?
        <Link className="hyperlink" to="/appointment/create?redirectTo=/appointment"> schedule an appointment </Link> :
        <Link className="hyperlink" to="/login"> Log in </Link>
        }
        or feel free to <a className="hyperlink" href="mailto: jonathan.rk.rys@gmail.com" onClick={ copyHandler }>
          reach out via email
        </a>.
      </p>
      <ul>
        {
          user && appointments ? 
          appointments.map( (appointment: Appointment, index: number) => {
            return (
              <li className="my-8 p-5 rounded-md bg-zinc-200" key={`job-${appointment.id}` }>
                <div className="flex justify-between w-full">
                  <h4 className="py-1">
                    <Icon location={ appointment.location } />
                    <span className="font-bold">
                      {` ${appointment.title}`}
                    </span>
                  </h4>
                  <div>
                    <span className="hidden sm:inline">(</span>{ appointment.startDate } - { appointment.endDate }<span className="hidden sm:inline">)</span>
                  </div>
                </div>
                <div className='flex justify-between'>
                  <div className='w-full'>
                    { appointment.description }
                  </div>
                  <div className='tools'>
                    <Link to={`/appointment/${appointment.id}/edit?redirectTo=/appointment`}><i title="edit" className='icon-pencil px-2'></i></Link>
                    <Link to={`/appointment/${appointment.id}/delete?redirectTo=/appointment`}><i title="delete" className='icon-bin2 px-2'></i></Link>
                  </div>
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
