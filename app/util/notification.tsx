import type { FC } from "react";
import { useEffect } from 'react';

export type Props = {
  setMessage: (message: string) => void,
  message: string
}

const Notification:FC<Props> = ({ message, setMessage }) => {
  useEffect(() => {
    setTimeout(() => {
      setMessage('')
    }, 2500)
  }, [message, setMessage])

  return (
    <div className={`notification${ message ? '' : ' hidden'}`}>
      { message }
    </div>
  )
};

export default Notification;
