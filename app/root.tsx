import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import type {
  ReactNode,
  FC,
} from "react";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation
} from "@remix-run/react";

import tailwindStylesheetUrl from "./styles/tailwind.css";
import customStylesheetUrl from "./styles/styles.css";
import { getUser } from "./session.server";

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
type Props = {
  children: ReactNode
};

type Error = {
  message: string
}

type State = {
  hasError: boolean,
  error?: Error
}

interface PropsWithTitle extends Props {
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
    user: await getUser(request),
  });
};

// Document component 
const Document: FC<PropsWithTitle> = ({ children, title = 'Jonathan Rys | Home' }) => {
  return (
    <html lang="en" className="h-full min-h-screen">
      <head>
        <Meta />
        <Links />
        <title>{ title }</title>
      </head>
      <body className="h-full min-h-screen">
        { children }
        {
          process.env.NODE_ENV === 'development' ?
          <LiveReload /> : null
        }
      </body>
    </html>
  );
};

// Header component for logo and navigation
const menuItems = [
  {
    to: '/schedule',
    icon: '',
    title: 'Schedule'
  }, {
    to: '/jobs',
    icon: '',
    title: 'Work Experience'
  }, {
    to: '/about',
    icon: '',
    title: 'About'
  },
];

const Header = () => {
  return (
    <nav className="flex align-center z-50 w-full fixed top-0 justify-between bg-zinc-300 text-base font-medium">
      <Link to='/' className="font-bold p-2">Home</Link>
      <ul className="flex">
        { menuItems.map( (item, index) => (
          <li key={`menu-item-${index}`} className="mx-4 my-3">
            <Link to={ item.to }>{ item.title }</Link>
          </li>
        )) }
      </ul>
    </nav>
  )
}

const footerLinks = [
  {
    id: 1,
    title: 'Contact',
    href: 'mailto: jonathan.rk.rys@gmail.com'
  }, {
    id: 2,
    title: 'LinkedIn',
    href: 'https://www.linkedin.com/in/jonathan-rys-a937724b/'
  }, {
    id: 3,
    title: 'GitHub',
    href: 'https://github.com/JonathanRys'
  },

];

const Footer: FC<FooterProps> = ({ hide }) => {
  return (
    <>
      {
        hide ? null :
        <footer className="w-full py-3 z-50 bg-zinc-300 text-base font-medium fixed bottom-0">
          <ul className="w-full flex align-center justify-around">
            {
              footerLinks.map(link => (<a key={`footer-link-${link.id}`} href={ link.href }>{ link.title }</a>))
            }
          </ul>
        </footer>
      }
    </>
  );
}

// Layout wrapper to isolate the order and layout of major sctions
const Layout: FC<Props> = ({ children }) => {
  const location = useLocation();

  return (
    <>
      <Header />
      <div className="container mx-auto h-full z-0 py-16">
        { children }
        <div className="h-16"></div> { /*Spacer for fixed footer*/ }
      </div>
      <Footer hide={ location.pathname === '/' } />
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
