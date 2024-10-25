import type { FC, MouseEvent } from "react";
import type { User } from "~/types/base";
import { useState } from "react";
import { Form, Link } from "@remix-run/react";

interface HeaderProps {
  user?: User;
  pathname: string;
}

const Header: FC<HeaderProps> = ({ user, pathname }) => {
  // Pull this to root so one can close the menu when clicking the body
  const [menuOpen, setMenuOpen] = useState(false);
  const onHomePage = pathname === "/";

  const menuItems = [
    {
      to: "/portfolio",
      icon: "icon-folder",
      title: "Portfolio",
    },
    // {
    //   to: "/appointment",
    //   icon: "icon-calendar",
    //   title: "Appointments",
    // },
    {
      to: "/jobs",
      icon: "icon-briefcase",
      title: "Work Experience",
    },
    {
      to: "/about",
      icon: "icon-info",
      title: "About",
    },
  ];

  // Take care of eveything here rather than deferring to higher processes to avoid complication
  const clickHandler = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setMenuOpen(false);
    // @ts-ignore-start
    // I would create a custom type except I feel that form? belongs on MouseEvent.target and should be updated there
    e.target.form?.submit();
    // @ts-ignore end
  };

  return (
    <nav className="nav nav-bg w-full text-base sm:font-medium">
      <Link
        to="/"
        className={`font-semibold${onHomePage ? " disabled" : " text-shadow"}`}
      >
        <i className="icon-home pl-2 pr-2 sm:pl-4"></i>Home
      </Link>
      <div
        className="icon-menu relative right-2 -m-1 flex overflow-visible py-2 text-xl sm:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen && (
          <ul
            onClick={clickHandler}
            className="mobile-nav mobile-nav-bg font-sans"
          >
            {menuItems.map((item, index) => (
              <li
                key={`menu-item-${index}`}
                className={`px-4 py-5 hover:bg-zinc-300${
                  pathname === item.to ? " disabled" : " text-shadow"
                }`}
              >
                <Link to={item.to}>
                  <i className={item.icon}></i> {item.title}
                </Link>
              </li>
            ))}
            {user ? (
              <Form action="/logout" method="post">
                <button
                  type="submit"
                  title="Logout"
                  className="text-shadow px-4 py-3 hover:bg-zinc-300"
                >
                  <i className="icon-exit"></i> Logout
                </button>
              </Form>
            ) : null}
          </ul>
        )}
      </div>
      <ul className="desktop-nav hidden sm:flex">
        {menuItems.map((item, index) => (
          <Link
            key={`menu-item-${index}`}
            to={item.to}
            title={item.title}
            className={`px-4 py-5 menu-item${
              pathname === item.to ? " disabled" : " text-shadow"
            }`}
          >
            {item.title}
          </Link>
        ))}
        {user ? (
          <Form action="/logout" method="post">
            <button
              type="submit"
              title="Logout"
              className="menu-item text-shadow px-4 py-5"
            >
              Logout
            </button>
          </Form>
        ) : null}
      </ul>
    </nav>
  );
};

export default Header;
