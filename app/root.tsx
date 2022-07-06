import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction
} from "@remix-run/node";
import type { FC } from "react";
import type { WrapperProps } from '~/types/base';
import { json } from "@remix-run/node";
import {
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
import datepickerStylesheetUrl from "react-datepicker/dist/react-datepicker.css";

import { getUser } from "./session.server";

import Footer from "./nav/footer";
import Header from "./nav/header";

// HTML <head> section components
export const links: LinksFunction = () => {
  return [
    { rel: "stylesheet", type: "text/css", href: tailwindStylesheetUrl },
    { rel: "stylesheet", type: "text/css", href: customStylesheetUrl },
    { rel: "stylesheet", type: "text/css", href: datepickerStylesheetUrl },
    // NOTE: Architect deploys the public directory to /_static/
    { rel: "icon", type: "image/svg+xml", href: "/_static/favicon.svg" },
    { rel: "icon", id: "light-scheme-icon", type: "image/png", href: "/_static/favicon.ico" },
    { rel: "icon", id: "dark-scheme-icon", type: "image/png", href: "/_static/favicon_dark.ico" },
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
      { /* Script to swap favicon in dark mode */}
      <script src="/_static/js/favicon_swapper.js"></script>
    </html>
  );
};

// Layout wrapper to isolate the order and layout of major sctions
const Layout: FC<WrapperProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useLoaderData()
  const onHomePage = location.pathname === '/';

  return (
    <>
      <Header user={ user } pathname={ location.pathname } />
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
