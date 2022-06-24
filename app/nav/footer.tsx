import type { FC } from "react";
import { useState } from "react";

import Notification from '~/util/notification'

interface FooterProps {
  hide?: boolean
}
  
const Footer: FC<FooterProps> = ({ hide }) => {
  const [message, setMessage] = useState('');

  const copyHandler = () => {
  navigator.clipboard.writeText('jonathan.rk.rys@gmail.com')
  setMessage('Email copied to clipboard');
  }

  const footerLinks = [
  {
      id: 1,
      title: 'Contact',
      icon: 'icon-mail4',
      href: 'mailto: jonathan.rk.rys@gmail.com',
      onClick: copyHandler
  }, {
      id: 2,
      title: 'LinkedIn',
      icon: 'icon-linkedin',
      href: 'https://www.linkedin.com/in/jonathan-rys-a937724b/'
  }, {
      id: 3,
      title: 'GitHub',
      icon: 'icon-github',
      href: 'https://github.com/JonathanRys'
  },
  ];

  return (
  <>
      {
      hide ? null :
      <footer className="w-full py-3 z-40 bg-zinc-300 text-base font-medium fixed bottom-0">
          <Notification message={ message } setMessage={ setMessage }/>
          <ul className="w-full flex align-center justify-around">
          {
              footerLinks.map(link => (
              <a 
                  onClick={ link.onClick || undefined }
                  key={`footer-link-${link.id}`}
                  className="hover:text-black hover:font-bold text-shadow"
                  href={ link.href }>
                  <i className={ link.icon }></i> { link.title }
              </a>
              ))
          }
          </ul>
      </footer>
      }
  </>
  );
}

export default Footer;
