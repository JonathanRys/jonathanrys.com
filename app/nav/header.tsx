import type { FC, MouseEvent } from "react";
import type { User } from '~/types/base'
import { useState } from "react";
import {
  Form,
  Link,
} from "@remix-run/react";

interface HeaderProps {
  user?: User,
  pathname: string
}

const Header:FC<HeaderProps> = ({ user, pathname }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const onHomePage = pathname === '/';

  const menuItems = [
    {
      to: '/appointment',
      icon: 'icon-calendar',
      title: 'Appointments'
    }, {
      to: '/jobs',
      icon: 'icon-briefcase',
      title: 'Work Experience'
    }, {
      to: '/about',
      icon: 'icon-info',
      title: 'About'
    },
  ];

  // Take care of eveything here rather than deferring to higher processes to avoid complication
  const clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    // @ts-ignore-start
    // I would create a custom type except I feel that form? belongs on MouseEvent.target
    e.target.form?.submit()
    // @ts-ignore end
  }

  return (
    <nav className="px-3 py-2 nav nav-bg w-full text-base sm:font-medium">
      <Link to='/' className={`font-bold p-2 home-icon-highlight${onHomePage ? ' disabled': ''}`}>
        <i className="icon-home"></i> Home
      </Link>
      <div 
        className="relative overflow-visible right-0 flex icon-menu text-2xl sm:hidden" 
        onClick={() => setMenuOpen(!menuOpen)}>
        { menuOpen &&
          <ul onClick={ clickHandler } className="mobile-nav font-sans bg-zinc-200 border-zinc-400">
            { menuItems.map( (item, index) => (
              <Link key={`menu-item-${index}`} to={ item.to }>
                <li className={`mx-4 my-3 hover:bg-zinc-300${pathname === item.to ? ' disabled' : ' text-shadow'}`}>
                  <i className={ item.icon }></i> { item.title }
                </li>
              </Link>
            )) }
            {
              user ?
              <Form action="/logout" method="post">
                <button type="submit" title="Logout" className="mx-4 my-3 hover:bg-zinc-300 text-shadow">
                  <i className="icon-exit"></i> Logout
                </button>
              </Form>: 
              null
            }
          </ul>
        }
      </div>
      <ul className="desktop-nav hidden sm:flex">
        { menuItems.map( (item, index) => (
          <Link
            key={`menu-item-${index}`}
            to={ item.to }
            title={ item.title }
            className={`mx-4 my-3 menu-item${pathname === item.to ? ' disabled' : ' text-shadow'}`}>
            { item.title }
          </Link>
        )) }
        {
          user ?
          <Form action="/logout" method="post">
            <button
              type="submit"
              title="Logout"
              className="mx-4 my-3 menu-item text-shadow">
              Logout
            </button>
          </Form> :
          null
        }
      </ul>
    </nav>
  )
}

export default Header;
