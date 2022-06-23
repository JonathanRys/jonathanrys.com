import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import type { FC } from "react";
import type { WrapperProps } from '~/types/base';
import { json } from "@remix-run/node";
import { useState } from "react";
import {
  Form,
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useLoaderData,  
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStylesheetUrl from "./styles/styles.css";

import { getUser } from "./session.server";

import Notification from '~/util/notification'

// HTML <head> section components
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", href: tailwindStylesheetUrl },
    { rel: "stylesheet", href: customStylesheetUrl },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", href: "/_static/favicon.ico" },
  ];
};

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1",
});

// Type declarations
type Error = {
  message: string
}

type State = {
  hasError: boolean,
  error?: Error
}

interface PropsWithTitle extends WrapperProps {
  title?: string
};

interface FooterProps {
  hide?: boolean
}

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

// Loader
export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request)
  });
};

// Document component 
const Document: FC<PropsWithTitle> = ({ children, title = 'Jonathan Rys | Home' }) => {
  return (
    <html lang="en" className="h-full min-h-screen font-sans text-zinc-600">
      <head>
        <Meta />
        <Links />
        <title>{ title }</title>
      </head>
      <body className="h-full min-h-screen">
        { children }
        {
          process.env.NODE_ENV === 'development' ?
          <LiveReload port={8002} /> : null
        }
      </body>
    </html>
  );
};

// Header component for logo and navigation
const menuItems = [
  {
    to: '/appointments',
    icon: 'icon-calendar',
    title: 'Schedule'
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

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const onHomePage = location.pathname === '/';
  const { user } = useLoaderData()
  
  return (
    <nav className="px-3 py-2 nav w-full bg-zinc-300 text-base sm:font-medium">
      <Link to='/' className={`font-bold p-2 home-icon-highlight${onHomePage ? ' disabled': ''}`}>
        <i className="icon-home"></i> Home
      </Link>
      <div 
        className="relative overflow-visible right-0 flex icon-menu text-2xl sm:hidden" 
        onClick={() => setMenuOpen(!menuOpen)}>
        { menuOpen &&
          <ul className="mobile-nav font-sans bg-zinc-200 border-zinc-400">
            { menuItems.map( (item, index) => (
              <Link key={`menu-item-${index}`} to={ item.to }>
                <li className={`mx-4 my-3 hover:bg-zinc-300${location.pathname === item.to ? ' disabled' : ' text-shadow'}`}>
                  <i className={ item.icon }></i> { item.title }
                </li>
              </Link>
            )) }
            { user ?
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
            className={`mx-4 my-3 menu-item${location.pathname === item.to ? ' disabled' : ' text-shadow'}`}>
            <li>
              { item.title }
            </li>
          </Link>
        )) }
        { user ?
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

// Layout wrapper to isolate the order and layout of major sctions
const Layout: FC<WrapperProps> = ({ children }) => {
  const location = useLocation();
  const onHomePage = location.pathname === '/';

  return (
    <>
      <Header />
      <div className={`container mx-auto h-full z-0 ${ onHomePage ? 'px-0 py-10 sm:py-20' : 'px-2 sm:px-0 py-16 sm:py-20'}`}>
        { children }
        <div className="h-16"></div> { /*Spacer for fixed footer*/ }
      </div>
      <Footer hide={ onHomePage } />
    </>
  );
};

// Error Boundry function
export const ErrorBoundry: FC<State> = ({ error }) => {
  return (
    <Document>
      <Layout>
        <div>
          <h1>Error</h1>
          <p>{ error && error.message }</p>
        </div>
      </Layout>
    </Document>
  )
}

// Create the app structure
export default function App() {
    return (
      <Document>
        <Layout>
          <Outlet />
        </Layout>
        <ScrollRestoration />
        <Scripts />
      </Document>
    );
}
