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
  // Pull this to root so one can close the menu when clicking the body
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
    // I would create a custom type except I feel that form? belongs on MouseEvent.target and should be updated there
    e.target.form?.submit()
    // @ts-ignore end
  }

  return (
    <nav className="nav nav-bg w-full text-base sm:font-medium">
      <Link to='/' className={`font-semibold${onHomePage ? ' disabled': ' text-shadow'}`}>
        <i className="icon-home pl-2 sm:pl-4 pr-2"></i>Home
      </Link>
      <div 
        className="relative overflow-visible right-2 py-2 -m-1 flex icon-menu text-2xl sm:hidden"
        onClick={() => setMenuOpen(!menuOpen)}>
        { menuOpen &&
          <ul onClick={ clickHandler } className="mobile-nav font-sans mobile-nav-bg">
            { menuItems.map( (item, index) => (
              <li className={`px-4 py-5 hover:bg-zinc-300${pathname === item.to ? ' disabled' : ' text-shadow'}`}>
                <Link key={`menu-item-${index}`} to={ item.to }>
                  <i className={ item.icon }></i> { item.title }
                </Link>
              </li>
            )) }
            {
              user ?
              <Form action="/logout" method="post">
                <button type="submit" title="Logout" className="px-4 py-3 hover:bg-zinc-300 text-shadow">
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
            className={`px-4 py-5 menu-item${pathname === item.to ? ' disabled' : ' text-shadow'}`}>
            { item.title }
          </Link>
        )) }
        {
          user ?
          <Form action="/logout" method="post">
            <button
              type="submit"
              title="Logout"
              className="px-4 py-5 menu-item text-shadow">
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
