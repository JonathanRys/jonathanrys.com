var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require < "u" ? require : typeof Proxy < "u" ? new Proxy(x, {
  get: (a, b) => (typeof require < "u" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require < "u")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// mocks/index.js
var require_mocks = __commonJS({
  "mocks/index.js"() {
    "use strict";
    var { setupServer } = __require("msw/node"), server = setupServer();
    server.listen({ onUnhandledRequest: "bypass" });
    process.once("SIGINT", () => server.close());
    process.once("SIGTERM", () => server.close());
  }
});

// server.ts
import { createRequestHandler } from "@remix-run/architect";

// server-entry-module:@remix-run/dev/server-build
var server_build_exports = {};
__export(server_build_exports, {
  assets: () => assets_manifest_default,
  assetsBuildDirectory: () => assetsBuildDirectory,
  entry: () => entry,
  future: () => future,
  mode: () => mode,
  publicPath: () => publicPath,
  routes: () => routes
});

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { RemixServer } from "@remix-run/react";
import { renderToString } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  let markup = renderToString(
    /* @__PURE__ */ jsxDEV(RemixServer, { context: remixContext, url: request.url }, void 0, !1, {
      fileName: "app/entry.server.tsx",
      lineNumber: 12,
      columnNumber: 5
    }, this)
  );
  return responseHeaders.set("Content-Type", "text/html"), new Response("<!DOCTYPE html>" + markup, {
    status: responseStatusCode,
    headers: responseHeaders
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ErrorBoundry: () => ErrorBoundry,
  default: () => App,
  links: () => links,
  loader: () => loader,
  meta: () => meta
});
import { useEffect as useEffect2 } from "react";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useLoaderData
} from "@remix-run/react";

// app/styles/tailwind.css
var tailwind_default = "/_static/build/_assets/tailwind-YBEVBUQN.css";

// app/styles/styles.css
var styles_default = "/_static/build/_assets/styles-QSKV3SMO.css";

// node_modules/react-datepicker/dist/react-datepicker.css
var react_datepicker_default = "/_static/build/_assets/react-datepicker-GXUPDFX7.css";

// app/session.server.ts
import { createCookieSessionStorage, redirect } from "@remix-run/node";
import invariant2 from "tiny-invariant";

// app/models/user.server.ts
import arc from "@architect/functions";
import bcrypt from "bcryptjs";
import invariant from "tiny-invariant";
async function getUserById(id) {
  let result = await (await arc.tables()).user.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": id }
  }), [record] = result.Items;
  return record ? { id: record.pk, email: record.email } : null;
}
async function getUserByEmail(email) {
  return getUserById(`email#${email}`);
}
async function getUserPasswordByEmail(email) {
  let result = await (await arc.tables()).password.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": `email#${email}` }
  }), [record] = result.Items;
  return record ? { hash: record.password } : null;
}
async function createUser(email, password) {
  let hashedPassword = await bcrypt.hash(password, 10), db = await arc.tables();
  await db.password.put({
    pk: `email#${email}`,
    password: hashedPassword
  }), await db.user.put({
    pk: `email#${email}`,
    email
  });
  let user = await getUserByEmail(email);
  return invariant(user, "User not found after being created. This should not happen"), user;
}
async function verifyLogin(email, password) {
  let userPassword = await getUserPasswordByEmail(email);
  if (!(!userPassword || !await bcrypt.compare(password, userPassword.hash)))
    return getUserByEmail(email);
}

// app/session.server.ts
invariant2(process.env.SESSION_SECRET, "SESSION_SECRET must be set");
var sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: !0,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: [process.env.SESSION_SECRET],
    secure: !1
  }
}), USER_SESSION_KEY = "userId";
async function getSession(request) {
  let cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}
async function getUserId(request) {
  return (await getSession(request)).get(USER_SESSION_KEY);
}
async function getUser(request) {
  let userId = await getUserId(request);
  if (userId === void 0)
    return null;
  let user = await getUserById(userId);
  if (user)
    return user;
  throw await logout(request);
}
async function requireUserId(request, redirectTo = new URL(request.url).pathname) {
  let userId = await getUserId(request);
  if (!userId) {
    let searchParams = new URLSearchParams([["redirectTo", redirectTo]]);
    throw redirect(`/login?${searchParams}`);
  }
  return userId;
}
async function createUserSession({
  request,
  userId,
  remember,
  redirectTo
}) {
  let session = await getSession(request);
  return session.set(USER_SESSION_KEY, userId), redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, {
        maxAge: remember ? 60 * 60 * 24 * 7 : void 0
      })
    }
  });
}
async function logout(request) {
  let session = await getSession(request);
  return redirect("/", {
    headers: {
      "Set-Cookie": await sessionStorage.destroySession(session)
    }
  });
}

// app/nav/footer.tsx
import { useState } from "react";

// app/util/notification.tsx
import { useEffect } from "react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var Notification = ({ message, setMessage }) => (useEffect(() => {
  setTimeout(() => {
    setMessage("");
  }, 2500);
}, [message, setMessage]), /* @__PURE__ */ jsxDEV2("div", { className: `notification${message ? "" : " hidden"}`, children: message }, void 0, !1, {
  fileName: "app/util/notification.tsx",
  lineNumber: 17,
  columnNumber: 5
}, this)), notification_default = Notification;

// app/nav/footer.tsx
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var Footer = ({ hide }) => {
  let [message, setMessage] = useState("");
  return /* @__PURE__ */ jsxDEV3(Fragment, { children: hide ? null : /* @__PURE__ */ jsxDEV3("footer", { className: "w-full py-3 nav-bg z-40 text-base font-medium fixed bottom-0", children: [
    /* @__PURE__ */ jsxDEV3(notification_default, { message, setMessage }, void 0, !1, {
      fileName: "app/nav/footer.tsx",
      lineNumber: 43,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV3("ul", { className: "w-full flex align-center justify-around", children: [
      {
        id: 1,
        title: "Contact",
        icon: "icon-mail4",
        href: "mailto: jonathan.rk.rys@gmail.com",
        onClick: () => {
          navigator.clipboard.writeText("jonathan.rk.rys@gmail.com"), setMessage("Email copied to clipboard");
        }
      },
      {
        id: 2,
        title: "LinkedIn",
        icon: "icon-linkedin",
        href: "https://www.linkedin.com/in/jonathan-rys-a937724b/"
      },
      {
        id: 3,
        title: "GitHub",
        icon: "icon-github",
        href: "https://github.com/JonathanRys"
      }
    ].map((link) => /* @__PURE__ */ jsxDEV3(
      "a",
      {
        onClick: link.onClick || void 0,
        className: "hover:text-black hover:font-bold text-shadow",
        href: link.href,
        children: [
          /* @__PURE__ */ jsxDEV3("i", { className: link.icon }, void 0, !1, {
            fileName: "app/nav/footer.tsx",
            lineNumber: 52,
            columnNumber: 19
          }, this),
          " ",
          link.title
        ]
      },
      `footer-link-${link.id}`,
      !0,
      {
        fileName: "app/nav/footer.tsx",
        lineNumber: 47,
        columnNumber: 15
      },
      this
    )) }, void 0, !1, {
      fileName: "app/nav/footer.tsx",
      lineNumber: 44,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/nav/footer.tsx",
    lineNumber: 42,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/nav/footer.tsx",
    lineNumber: 39,
    columnNumber: 3
  }, this);
}, footer_default = Footer;

// app/nav/header.tsx
import { useState as useState2 } from "react";
import { Form, Link } from "@remix-run/react";
import { jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var Header = ({ user, pathname }) => {
  let [menuOpen, setMenuOpen] = useState2(!1), onHomePage = pathname === "/", menuItems = [
    {
      to: "/portfolio",
      icon: "icon-folder",
      title: "Portfolio"
    },
    // {
    //   to: "/appointment",
    //   icon: "icon-calendar",
    //   title: "Appointments",
    // },
    // {
    //   to: "/blog",
    //   icon: "icon-pencil",
    //   title: "Blog",
    // },
    {
      to: "/jobs",
      icon: "icon-briefcase",
      title: "Work Experience"
    },
    {
      to: "/about",
      icon: "icon-info",
      title: "About"
    }
  ];
  return /* @__PURE__ */ jsxDEV4("nav", { className: "nav nav-bg w-full text-base sm:font-medium", children: [
    /* @__PURE__ */ jsxDEV4(
      Link,
      {
        to: "/",
        className: `font-semibold${onHomePage ? " disabled" : " text-shadow"}`,
        children: [
          /* @__PURE__ */ jsxDEV4("i", { className: "icon-home pl-2 pr-2 sm:pl-4" }, void 0, !1, {
            fileName: "app/nav/header.tsx",
            lineNumber: 61,
            columnNumber: 9
          }, this),
          "Home"
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/nav/header.tsx",
        lineNumber: 57,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV4(
      "div",
      {
        className: "icon-menu relative right-2 -m-1 flex overflow-visible py-2 text-xl sm:hidden",
        onClick: () => setMenuOpen(!menuOpen),
        children: menuOpen && /* @__PURE__ */ jsxDEV4(
          "ul",
          {
            onClick: (e) => {
              e.preventDefault(), e.stopPropagation(), setMenuOpen(!1), e.target.form?.submit();
            },
            className: "mobile-nav mobile-nav-bg font-sans",
            children: [
              menuItems.map((item, index) => /* @__PURE__ */ jsxDEV4(
                "li",
                {
                  className: `px-4 py-5 hover:bg-zinc-300${pathname === item.to ? " disabled" : " text-shadow"}`,
                  children: /* @__PURE__ */ jsxDEV4(Link, { to: item.to, children: [
                    /* @__PURE__ */ jsxDEV4("i", { className: item.icon }, void 0, !1, {
                      fileName: "app/nav/header.tsx",
                      lineNumber: 80,
                      columnNumber: 19
                    }, this),
                    " ",
                    item.title
                  ] }, void 0, !0, {
                    fileName: "app/nav/header.tsx",
                    lineNumber: 79,
                    columnNumber: 17
                  }, this)
                },
                `menu-item-${index}`,
                !1,
                {
                  fileName: "app/nav/header.tsx",
                  lineNumber: 73,
                  columnNumber: 15
                },
                this
              )),
              user ? /* @__PURE__ */ jsxDEV4(Form, { action: "/logout", method: "post", children: /* @__PURE__ */ jsxDEV4(
                "button",
                {
                  type: "submit",
                  title: "Logout",
                  className: "text-shadow px-4 py-3 hover:bg-zinc-300",
                  children: [
                    /* @__PURE__ */ jsxDEV4("i", { className: "icon-exit" }, void 0, !1, {
                      fileName: "app/nav/header.tsx",
                      lineNumber: 91,
                      columnNumber: 19
                    }, this),
                    " Logout"
                  ]
                },
                void 0,
                !0,
                {
                  fileName: "app/nav/header.tsx",
                  lineNumber: 86,
                  columnNumber: 17
                },
                this
              ) }, void 0, !1, {
                fileName: "app/nav/header.tsx",
                lineNumber: 85,
                columnNumber: 15
              }, this) : null
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/nav/header.tsx",
            lineNumber: 68,
            columnNumber: 11
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/nav/header.tsx",
        lineNumber: 63,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV4("ul", { className: "desktop-nav hidden sm:flex", children: [
      menuItems.map((item, index) => /* @__PURE__ */ jsxDEV4(
        Link,
        {
          to: item.to,
          title: item.title,
          className: `px-4 py-5 menu-item${pathname === item.to ? " disabled" : " text-shadow"}`,
          children: item.title
        },
        `menu-item-${index}`,
        !1,
        {
          fileName: "app/nav/header.tsx",
          lineNumber: 100,
          columnNumber: 11
        },
        this
      )),
      user ? /* @__PURE__ */ jsxDEV4(Form, { action: "/logout", method: "post", children: /* @__PURE__ */ jsxDEV4(
        "button",
        {
          type: "submit",
          title: "Logout",
          className: "menu-item text-shadow px-4 py-5",
          children: "Logout"
        },
        void 0,
        !1,
        {
          fileName: "app/nav/header.tsx",
          lineNumber: 113,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/nav/header.tsx",
        lineNumber: 112,
        columnNumber: 11
      }, this) : null
    ] }, void 0, !0, {
      fileName: "app/nav/header.tsx",
      lineNumber: 98,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/nav/header.tsx",
    lineNumber: 56,
    columnNumber: 5
  }, this);
}, header_default = Header;

// app/root.tsx
import { Fragment as Fragment2, jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", type: "text/css", href: tailwind_default },
  { rel: "stylesheet", type: "text/css", href: styles_default },
  { rel: "stylesheet", type: "text/css", href: react_datepicker_default },
  // NOTE: Architect deploys the public directory to /_static/
  { rel: "icon", id: "light-scheme-icon", type: "image/png", href: "/_static/favicon.ico" },
  { rel: "icon", id: "dark-scheme-icon", type: "image/png", href: "/_static/favicon_dark.ico" }
], meta = () => ({
  charset: "utf-8",
  viewport: "width=device-width,initial-scale=1"
}), loader = async ({ request }) => json({
  user: await getUser(request)
}), Document = ({ children, title = "Jonathan Rys | Home" }) => (useEffect2(() => {
  let matcher = window.matchMedia("(prefers-color-scheme: dark)"), lightIcon = document.querySelector("link#light-scheme-icon"), darkIcon = document.querySelector("link#dark-scheme-icon");
  if (!lightIcon || !darkIcon)
    return;
  let onUpdate = () => {
    matcher.matches ? (lightIcon.remove(), document.head.append(darkIcon)) : (darkIcon.remove(), document.head.append(lightIcon));
  };
  matcher.addEventListener("change", onUpdate), onUpdate();
}), /* @__PURE__ */ jsxDEV5("html", { lang: "en", className: "h-full min-h-screen font-sans text-zinc-600", children: [
  /* @__PURE__ */ jsxDEV5("head", { children: [
    /* @__PURE__ */ jsxDEV5(Meta, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 97,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5(Links, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 98,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV5("title", { children: title }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 99,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 96,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV5("body", { className: "h-full min-h-screen", children: [
    children,
    /* @__PURE__ */ jsxDEV5(LiveReload, { port: 8002 }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 105,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 101,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/root.tsx",
  lineNumber: 95,
  columnNumber: 5
}, this)), Layout = ({ children }) => {
  let location = useLocation(), { user } = useLoaderData(), onHomePage = location.pathname === "/";
  return /* @__PURE__ */ jsxDEV5(Fragment2, { children: [
    /* @__PURE__ */ jsxDEV5(header_default, { user, pathname: location.pathname }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 120,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5("div", { className: `container mx-auto h-full z-0 ${onHomePage ? "px-0 py-10 sm:py-20" : "px-2 sm:px-0 py-16 sm:py-20"}`, children: [
      children,
      /* @__PURE__ */ jsxDEV5("div", { className: "h-16" }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 123,
        columnNumber: 9
      }, this),
      " "
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 121,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(footer_default, { hide: onHomePage }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 125,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 119,
    columnNumber: 5
  }, this);
}, ErrorBoundry = ({ error }) => /* @__PURE__ */ jsxDEV5(Document, { children: /* @__PURE__ */ jsxDEV5(Layout, { children: /* @__PURE__ */ jsxDEV5("div", { children: [
  /* @__PURE__ */ jsxDEV5("h1", { children: "Error" }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 136,
    columnNumber: 11
  }, this),
  /* @__PURE__ */ jsxDEV5("p", { children: error && error.message }, void 0, !1, {
    fileName: "app/root.tsx",
    lineNumber: 137,
    columnNumber: 11
  }, this)
] }, void 0, !0, {
  fileName: "app/root.tsx",
  lineNumber: 135,
  columnNumber: 9
}, this) }, void 0, !1, {
  fileName: "app/root.tsx",
  lineNumber: 134,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/root.tsx",
  lineNumber: 133,
  columnNumber: 5
}, this);
function App() {
  return /* @__PURE__ */ jsxDEV5(Document, { children: [
    /* @__PURE__ */ jsxDEV5(Layout, { children: /* @__PURE__ */ jsxDEV5(Outlet, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 149,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 148,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(ScrollRestoration, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 151,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV5(Scripts, {}, void 0, !1, {
      fileName: "app/root.tsx",
      lineNumber: 152,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 147,
    columnNumber: 5
  }, this);
}

// app/routes/appointment.tsx
var appointment_exports = {};
__export(appointment_exports, {
  default: () => appointment_default,
  loader: () => loader2,
  meta: () => meta2
});
import { Outlet as Outlet2, Link as Link2, useLoaderData as useLoaderData2 } from "@remix-run/react";
import { useState as useState3 } from "react";

// app/models/appointment.server.ts
import arc2 from "@architect/functions";
import { createId } from "@paralleldrive/cuid2";

// app/utils.ts
import { useMatches, useLocation as useLocation2 } from "@remix-run/react";
import { useMemo } from "react";
var DEFAULT_REDIRECT = "/";
function safeRedirect(to, defaultRedirect = DEFAULT_REDIRECT) {
  return !to || typeof to != "string" || !to.startsWith("/") || to.startsWith("//") ? defaultRedirect : to;
}
function useMatchesData(id) {
  let matchingRoutes = useMatches();
  return useMemo(
    () => matchingRoutes.find((route2) => route2.id === id),
    [matchingRoutes, id]
  )?.data;
}
function isUser(user) {
  return user && typeof user == "object" && typeof user.email == "string";
}
function useOptionalUser() {
  let data = useMatchesData("root");
  if (!(!data || !isUser(data.user)))
    return data.user;
}
function useUser() {
  let maybeUser = useOptionalUser();
  if (!maybeUser)
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead."
    );
  return maybeUser;
}
function validateEmail(email) {
  return typeof email == "string" && email.length > 3 && email.includes("@");
}

// app/models/appointment.server.ts
var skToId = (sk) => sk.replace(/^appointment#/, "");
async function getAppointmentListItems({
  userId
}) {
  let db = await arc2.tables(), admins = [
    "email#admin@jonathanrys.com",
    `email#${process.env.ADMIN_EMAIL}`
  ], response, result;
  if (userId && admins.includes(userId)) {
    let params = { TableName: "appointment" };
    response = await db.appointment.scan(params), result = response.Items.map(
      (item) => ({
        userId: item.userId,
        title: item.title,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
        id: skToId(item.sk)
      })
    );
  } else
    response = await db.appointment.query({
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: { ":pk": userId }
    }), result = response.Items.map(
      (item) => ({
        userId: item.userId,
        title: item.title,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        description: item.description,
        id: skToId(item.sk)
      })
    );
  return result;
}

// app/routes/appointment.tsx
import { Fragment as Fragment3, jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var loader2 = async ({ request }) => {
  let user = await getUser(request);
  return user ? await getAppointmentListItems({ userId: user.id }) : [];
}, meta2 = () => ({
  title: "Upcoming Appointments"
}), Icon = ({ location }) => {
  switch (location) {
    case "phone":
      return /* @__PURE__ */ jsxDEV6("i", { className: "icon-phone" }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 37,
        columnNumber: 13
      }, this);
    case "zoom":
      return /* @__PURE__ */ jsxDEV6("i", { className: "icon-video-camera" }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 39,
        columnNumber: 13
      }, this);
  }
  return null;
}, Appointments = () => {
  let user = useOptionalUser(), appointments = useLoaderData2(), [message, setMessage] = useState3("");
  return /* @__PURE__ */ jsxDEV6(Fragment3, { children: [
    /* @__PURE__ */ jsxDEV6(notification_default, { message, setMessage }, void 0, !1, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("h1", { className: "text-xl", children: "Upcoming appointments" }, void 0, !1, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 57,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("p", { className: "mt-5", children: [
      "If you'd like to set up some time to talk,",
      user ? /* @__PURE__ */ jsxDEV6(Link2, { className: "hyperlink", to: "/appointment/create?redirectTo=/appointment", children: " schedule an appointment " }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 61,
        columnNumber: 9
      }, this) : /* @__PURE__ */ jsxDEV6(Link2, { className: "hyperlink", to: "/login", children: " Log in " }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      "or feel free to ",
      /* @__PURE__ */ jsxDEV6("a", { className: "hyperlink", href: "mailto: jonathan.rk.rys@gmail.com", onClick: () => {
        navigator.clipboard.writeText("jonathan.rk.rys@gmail.com"), setMessage("Email copied to clipboard");
      }, children: "reach out via email" }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 64,
        columnNumber: 25
      }, this),
      "."
    ] }, void 0, !0, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6("ul", { children: user && appointments ? appointments.map((appointment, index) => /* @__PURE__ */ jsxDEV6("li", { className: "my-8 p-5 list-item-bubble", children: [
      /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between w-full", children: [
        /* @__PURE__ */ jsxDEV6("h4", { className: "py-1", children: [
          /* @__PURE__ */ jsxDEV6(Icon, { location: appointment.location }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 76,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6("span", { className: "font-bold", children: ` ${appointment.title}` }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 77,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/appointment.tsx",
          lineNumber: 75,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { children: [
          /* @__PURE__ */ jsxDEV6("span", { className: "hidden sm:inline", children: "(" }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 82,
            columnNumber: 21
          }, this),
          appointment.startDate,
          " - ",
          appointment.endDate,
          /* @__PURE__ */ jsxDEV6("span", { className: "hidden sm:inline", children: ")" }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 82,
            columnNumber: 115
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/appointment.tsx",
          lineNumber: 81,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 74,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ jsxDEV6("div", { className: "flex justify-between", children: [
        /* @__PURE__ */ jsxDEV6("div", { className: "w-full", children: appointment.description }, void 0, !1, {
          fileName: "app/routes/appointment.tsx",
          lineNumber: 86,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ jsxDEV6("div", { className: "tools", children: [
          /* @__PURE__ */ jsxDEV6(Link2, { to: `/appointment/${appointment.id}/edit?redirectTo=/appointment`, children: /* @__PURE__ */ jsxDEV6("i", { title: "edit", className: "icon-pencil px-2" }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 90,
            columnNumber: 94
          }, this) }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ jsxDEV6(Link2, { to: `/appointment/${appointment.id}/delete?redirectTo=/appointment`, children: /* @__PURE__ */ jsxDEV6("i", { title: "delete", className: "icon-bin2 px-2" }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 91,
            columnNumber: 96
          }, this) }, void 0, !1, {
            fileName: "app/routes/appointment.tsx",
            lineNumber: 91,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/appointment.tsx",
          lineNumber: 89,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 85,
        columnNumber: 17
      }, this)
    ] }, `job-${appointment.id}`, !0, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 73,
      columnNumber: 15
    }, this)) : /* @__PURE__ */ jsxDEV6(Fragment3, { children: [
      /* @__PURE__ */ jsxDEV6("li", { className: "my-4 mx-1", children: "You have no upcoming appointments." }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 98,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV6("li", { className: "my-4 mx-1 text-sm", children: "Scheduling an appointment will send a confirmation email and an email alert one day before the event to both parties." }, void 0, !1, {
        fileName: "app/routes/appointment.tsx",
        lineNumber: 99,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 97,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 68,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV6(Outlet2, {}, void 0, !1, {
      fileName: "app/routes/appointment.tsx",
      lineNumber: 103,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/appointment.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}, appointment_default = Appointments;

// app/routes/portfolio.tsx
var portfolio_exports = {};
__export(portfolio_exports, {
  default: () => portfolio_default,
  meta: () => meta3
});
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var meta3 = () => [
  {
    title: "Portfolio"
  }
], portfolioData = [
  {
    id: 1,
    title: "HealthVision",
    company: "HDAI",
    text: "Worked on all aspects of this application which is available in hospitals throughout the country inside Epic. This application allows physicians and nurses to gain valuable insights into their patients' medical history using data science and AI tools."
  },
  {
    id: 2,
    title: "PhysGPT",
    company: "Private Investor",
    text: "This project ingested millions of vectors of data from over 5000 PDFs (some 100,000 pages long) that were OCRed, split into chunks, embedded, and uploaded to Pinecone. When the user enters a query via the UI, the query is converted to a vector and sent to Pinecone.  Pinecone then takes that vector, finds the top 10 closest (most semantically similar) vectors, and returns them.  I then query MongoDB to get the actual text and book metadata and I query the LLM with the text and a prompt as context to get an AI-generated summary of the topic. This was built with FastAPI and React then Dockerized and pushed to ECR. The infrastructure was provisioned on AWS using Terraform.  User management and account info is stored in DynamoDB, vectors are stored in Pinecone (I also tested this with Milvus but Pinecone was better)."
  },
  {
    id: 3,
    title: "jonathanrys.com",
    company: "Personal Project",
    text: "I built this site using ReMix.  I chose ReMix for a few reasons: I was interested in proxy state management using MobX in React, I had read Kent C. Dodd's article on ReMix and wanted to try it out, and I wanted to learn DynamoDB.  ReMix comes with a basic home page design out of the box.  I liked it better than any previous idea I had and didn't want to re-invent the wheel, so I modified it and added some pages of my own.  Design guidelines say to choose 3 colors for your brand and stick with those; I chose black, white and gray ;).  I'm not really much of a designer, but I can quickly build complex, pixel-perfect UIs."
  },
  {
    id: 4,
    title: "Queuing system",
    company: "BetterLesson",
    text: "Took over ownership of the queuing system and the associated webhooks. I managed setting up and configuring a FIFO queue as well as dead-letter queues. This was built in AWS Lambda(Python) and SQS.  The queuing system handled webhook calls from Zoom and Salesforce and updated our app and data warehouse whenever a data source changed.  This project was fun because all of the functions had to be idempotent for this to work."
  },
  {
    id: 5,
    title: "Coaching Platform",
    company: "BetterLesson",
    text: "Worked on various features of our interactive coaching platform, from video integration with Zoom to user management consoles. This application was built with Flask and React and pulled data from Zoom, Salesforce, CoachBase, and MySQL together to allow teachers and their coaches to lay out a learning plan, share milestones and feedback, and schedule and share clips from video meetings all within our platform."
  },
  {
    id: 6,
    title: "Python 3 Upgrade",
    company: "BetterLesson",
    text: "Led the upgrade of our servers in all environments from Python 2.7 to Python 3.6 and updated the encoding and collation of character-based columns in MySQL to utf8 from latin1."
  },
  {
    id: 7,
    title: "Arduino project for my parents",
    company: "Mom & Dad",
    text: "Wrote C++ code to control the lights on the stairs at my parent's house using motion sensors.  This required using a priority queue so that someone triggering one set of lights doesn't affect another set of previously triggered lights."
  },
  {
    id: 8,
    title: "Mobile app to check product ingredients",
    company: "Personal Project",
    text: "Designed and built a mobile app for Android using React Native.  This app allows the user to set dietary preferences within the app and then scan food products at the store.  The app takes the barcode and calls the OpenFoodFacts.org API to get a list of ingredients and other dietary information.  Then it makes a call to my Python API to classify the ingredients.  Then, based on the user's preferences, the UI would let them know if the product met their approval."
  },
  {
    id: 9,
    title: "OnSite",
    company: "American Tower",
    text: "This was an app to help technicians take inventory of the equipment on cell phone towers. The app needed to be available offline so they could upload the data when they returned to their homes so I made heavy use of localStorage and service workers. This app was built with jQuery, CSS, and HTML.  I was not initially the architect on this project, but I came to own the product."
  },
  {
    id: 10,
    title: "Digits",
    company: "Pearson",
    text: "This was a digital learning platform that I helped work on. It was built with HTML, CSS, MathML, and Javascript."
  },
  {
    id: 11,
    title: "Texaco Project",
    company: "Texaco",
    text: "Rewrote legacy FORTRAN code to work with the inputs and outputs of the flowcharting software Aspen.  Used the results to program EEPROM chips for use in refinery control systems.  This required rewriting all the loops to use a newer syntax and all I had was a dot-matrix printed FORTRAN manual to help me.  After getting the code working in the flowcharting software, we were able to run simulations and adjust the inputs to find the optimal solution.  We then took that solution and used it to program EEPROM chips for use in the refinery's control systems."
  }
], Portfolio = () => /* @__PURE__ */ jsxDEV7("div", { children: [
  /* @__PURE__ */ jsxDEV7("h1", { className: "mb-2 text-2xl", children: "Portfolio" }, void 0, !1, {
    fileName: "app/routes/portfolio.tsx",
    lineNumber: 83,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV7("div", { children: [
    /* @__PURE__ */ jsxDEV7("h3", { className: "text-lg", children: "Here are some of the projects I'm proud of:" }, void 0, !1, {
      fileName: "app/routes/portfolio.tsx",
      lineNumber: 85,
      columnNumber: 9
    }, this),
    portfolioData.map((folio) => /* @__PURE__ */ jsxDEV7("div", { className: "list-item-bubble my-10 p-5", children: [
      /* @__PURE__ */ jsxDEV7("h5", { className: "mb-2 text-base font-semibold", children: [
        folio.title,
        " (",
        /* @__PURE__ */ jsxDEV7("span", { className: "text-sm", children: folio.company }, void 0, !1, {
          fileName: "app/routes/portfolio.tsx",
          lineNumber: 89,
          columnNumber: 30
        }, this),
        ")"
      ] }, void 0, !0, {
        fileName: "app/routes/portfolio.tsx",
        lineNumber: 88,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV7("p", { children: folio.text }, void 0, !1, {
        fileName: "app/routes/portfolio.tsx",
        lineNumber: 91,
        columnNumber: 13
      }, this)
    ] }, `folio-${folio.id}`, !0, {
      fileName: "app/routes/portfolio.tsx",
      lineNumber: 87,
      columnNumber: 11
    }, this))
  ] }, void 0, !0, {
    fileName: "app/routes/portfolio.tsx",
    lineNumber: 84,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/portfolio.tsx",
  lineNumber: 82,
  columnNumber: 5
}, this), portfolio_default = Portfolio;

// app/routes/logout.tsx
var logout_exports = {};
__export(logout_exports, {
  action: () => action,
  loader: () => loader3
});
import { redirect as redirect2 } from "@remix-run/node";
var action = async ({ request }) => logout(request), loader3 = async () => redirect2("/");

// app/routes/about.tsx
var about_exports = {};
__export(about_exports, {
  default: () => about_default,
  meta: () => meta4
});
import { Fragment as Fragment4, jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var meta4 = () => [
  {
    title: "About Jonathan"
  }
], About = () => /* @__PURE__ */ jsxDEV8(Fragment4, { children: [
  /* @__PURE__ */ jsxDEV8("h1", { className: "mb-2 text-2xl", children: "About Me" }, void 0, !1, {
    fileName: "app/routes/about.tsx",
    lineNumber: 32,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV8("ul", { children: [
    {
      id: 1,
      title: "Interests",
      text: "I enjoy studying science and mathematics of all kinds.  I've been vegan for 9 years and vegetarian for 20.  I love hiking and camping any time of year and have hiked all 48 of the 4000-footers in NH in all 4 seasons."
      // @todo: make this dynamic 10/15/15
    },
    {
      id: 2,
      title: "Hobbies",
      text: "Hiking, Rock/Ice Climbing, Kayaking, Cooking, Foraging, Mycology, Microscopy, Speed cubing"
    },
    {
      id: 3,
      title: "About Me",
      text: "I've lived in the Boston area my whole life. I learned to use a computer so I could play video games at a very young age.  I remember using DOS 3.0 on a 16 GHz machine and booting from a floppy disk.  I learned BASIC in High school and I taught myself C and wrote an H.P. Lovecraft-inspired text-based video game with some animated graphics.  Then one summer I helped my father to rewrite some FORTRAN code and used the results to program EEPROM chips.  This got me excited about a career in computer science."
    }
  ].map((item) => /* @__PURE__ */ jsxDEV8("li", { className: "list-item-bubble my-10 p-5", children: [
    /* @__PURE__ */ jsxDEV8("h5", { className: "mb-2 text-base font-semibold", children: item.title }, void 0, !1, {
      fileName: "app/routes/about.tsx",
      lineNumber: 36,
      columnNumber: 13
    }, this),
    /* @__PURE__ */ jsxDEV8("p", { children: item.text }, void 0, !1, {
      fileName: "app/routes/about.tsx",
      lineNumber: 37,
      columnNumber: 13
    }, this)
  ] }, `about-${item.id}`, !0, {
    fileName: "app/routes/about.tsx",
    lineNumber: 35,
    columnNumber: 11
  }, this)) }, void 0, !1, {
    fileName: "app/routes/about.tsx",
    lineNumber: 33,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/about.tsx",
  lineNumber: 31,
  columnNumber: 5
}, this), about_default = About;

// app/routes/index.tsx
var routes_exports = {};
__export(routes_exports, {
  default: () => Index
});
import { Link as Link3 } from "@remix-run/react";
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
function Index() {
  let user = useOptionalUser();
  return /* @__PURE__ */ jsxDEV9("main", { className: "relative sm:flex sm:items-center sm:justify-center", children: /* @__PURE__ */ jsxDEV9("div", { className: "relative sm:pb-16 sm:pt-8", children: [
    /* @__PURE__ */ jsxDEV9("div", { className: "mx-auto max-w-7xl sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV9("div", { className: "relative shadow-xl sm:overflow-hidden sm:rounded-2xl", children: [
      /* @__PURE__ */ jsxDEV9("div", { className: "absolute inset-0", children: [
        /* @__PURE__ */ jsxDEV9(
          "img",
          {
            className: "h-full w-full object-cover",
            src: "/_static/cover_image.jpg",
            alt: 'Boot spur from "the HoJo" near Tuckerman ravine'
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 20,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV9("div", { className: "absolute inset-0 bg-[color:rgba(156,156,156,0.5)] mix-blend-multiply" }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 25,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 19,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV9("div", { className: "lg:pb-18 relative px-4 pt-16 pb-8 sm:px-6 sm:pt-24 sm:pb-14 lg:px-8 lg:pt-32", children: /* @__PURE__ */ jsxDEV9("div", { className: "mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center", children: user ? /* @__PURE__ */ jsxDEV9(
        Link3,
        {
          to: "/appointment/create",
          className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 sm:px-8",
          children: "Schedule an Apppointment"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/index.tsx",
          lineNumber: 30,
          columnNumber: 19
        },
        this
      ) : /* @__PURE__ */ jsxDEV9("div", { className: "space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0", children: [
        /* @__PURE__ */ jsxDEV9(
          Link3,
          {
            to: "/join",
            className: "flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-zinc-900 shadow-sm hover:bg-zinc-200 sm:px-8",
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 38,
            columnNumber: 21
          },
          this
        ),
        /* @__PURE__ */ jsxDEV9(
          Link3,
          {
            to: "/login",
            className: "flex items-center justify-center rounded-md bg-zinc-600 px-4 py-3 font-medium text-white hover:bg-zinc-700  ",
            children: "Log In"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/index.tsx",
            lineNumber: 44,
            columnNumber: 21
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/index.tsx",
        lineNumber: 37,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 28,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/routes/index.tsx",
        lineNumber: 27,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/index.tsx",
      lineNumber: 18,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV9("div", { className: "mx-auto max-w-7xl py-2 px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxDEV9("div", { className: "mt-6 flex flex-wrap justify-center gap-8", children: [
      {
        src: "https://user-images.githubusercontent.com/1500684/157991167-651c8fc5-2f72-4afa-94d8-2520ecbc5ebc.svg",
        alt: "AWS",
        href: "https://aws.com"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157991935-26c0d587-b866-49f5-af34-8f04be1c9df2.svg",
        alt: "DynamoDB",
        href: "https://aws.amazon.com/dynamodb/"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157990874-31f015c3-2af7-4669-9d61-519e5ecfdea6.svg",
        alt: "Architect",
        href: "https://arc.codes"
      },
      {
        src: "/_static/logos/remix_logo.svg",
        alt: "Remix",
        href: "https://remix.run"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157764276-a516a239-e377-4a20-b44a-0ac7b65c8c14.svg",
        alt: "Tailwind",
        href: "https://tailwindcss.com"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157764454-48ac8c71-a2a9-4b5e-b19c-edef8b8953d6.svg",
        alt: "Cypress",
        href: "https://www.cypress.io"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772386-75444196-0604-4340-af28-53b236faa182.svg",
        alt: "MSW",
        href: "https://mswjs.io"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772447-00fccdce-9d12-46a3-8bb4-fac612cdc949.svg",
        alt: "Vitest",
        href: "https://vitest.dev"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772662-92b0dd3a-453f-4d18-b8be-9fa6efde52cf.png",
        alt: "Testing Library",
        href: "https://testing-library.com"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772934-ce0a943d-e9d0-40f8-97f3-f464c0811643.svg",
        alt: "Prettier",
        href: "https://prettier.io"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157772990-3968ff7c-b551-4c55-a25c-046a32709a8e.svg",
        alt: "ESLint",
        href: "https://eslint.org"
      },
      {
        src: "https://user-images.githubusercontent.com/1500684/157773063-20a0ed64-b9f8-4e0b-9d1e-0b65a3d4a6db.svg",
        alt: "TypeScript",
        href: "https://typescriptlang.org"
      }
    ].map((img) => /* @__PURE__ */ jsxDEV9(
      "a",
      {
        href: img.href,
        className: "flex h-16 w-32 justify-center p-1 grayscale transition hover:grayscale-0 focus:grayscale-0",
        children: /* @__PURE__ */ jsxDEV9("img", { alt: img.alt, src: img.src }, void 0, !1, {
          fileName: "app/routes/index.tsx",
          lineNumber: 126,
          columnNumber: 17
        }, this)
      },
      img.href,
      !1,
      {
        fileName: "app/routes/index.tsx",
        lineNumber: 121,
        columnNumber: 15
      },
      this
    )) }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 58,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/index.tsx",
      lineNumber: 57,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/index.tsx",
    lineNumber: 16,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/index.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  ErrorBoundry: () => ErrorBoundry2,
  action: () => action2,
  default: () => LoginPage,
  loader: () => loader4,
  meta: () => meta5
});
import { json as json2, redirect as redirect3 } from "@remix-run/node";
import { Form as Form2, Link as Link4, useActionData, useSearchParams } from "@remix-run/react";
import * as React from "react";
import { jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var loader4 = async ({ request }) => await getUserId(request) ? redirect3("/") : json2({}), action2 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo")), remember = formData.get("remember");
  if (!validateEmail(email))
    return json2(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return json2(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return json2(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  let user = await verifyLogin(email, password);
  return user ? createUserSession({
    request,
    userId: user.id,
    remember: remember === "on",
    redirectTo
  }) : json2(
    { errors: { email: "Invalid email or password" } },
    { status: 400 }
  );
}, meta5 = () => ({
  title: "Login"
}), ErrorBoundry2 = ({ error }) => /* @__PURE__ */ jsxDEV10("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ jsxDEV10("div", { className: "mx-auto w-full max-w-md px-8", children: [
  /* @__PURE__ */ jsxDEV10("h1", { className: "text-xl font-medium leading-normal text-zinc-800", children: "Error:" }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 89,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV10("pre", { children: error?.message }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 90,
    columnNumber: 9
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/login.tsx",
  lineNumber: 88,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/routes/login.tsx",
  lineNumber: 87,
  columnNumber: 5
}, this);
function LoginPage() {
  let [searchParams] = useSearchParams(), redirectTo = searchParams.get("redirectTo") || "/appointment", actionData = useActionData(), emailRef = React.useRef(null), passwordRef = React.useRef(null);
  return React.useEffect(() => {
    actionData?.errors?.email ? emailRef.current?.focus() : actionData?.errors?.password && passwordRef.current?.focus();
  }, [actionData]), /* @__PURE__ */ jsxDEV10("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ jsxDEV10("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ jsxDEV10(Form2, { method: "post", className: "space-y-6 form", noValidate: !0, children: [
    /* @__PURE__ */ jsxDEV10("div", { children: [
      /* @__PURE__ */ jsxDEV10(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-zinc-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 116,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV10("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": actionData?.errors?.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "w-full rounded border border-zinc-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 123,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.email && /* @__PURE__ */ jsxDEV10("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 136,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 122,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 115,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV10("div", { children: [
      /* @__PURE__ */ jsxDEV10(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-zinc-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/login.tsx",
          lineNumber: 144,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV10("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "current-password",
            "aria-invalid": actionData?.errors?.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-zinc-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 151,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.password && /* @__PURE__ */ jsxDEV10("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 162,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 150,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 143,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV10("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 169,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV10(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-sky-500  py-2 px-4 text-white hover:bg-sky-600 focus:bg-sky-400",
        children: "Log in"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/login.tsx",
        lineNumber: 170,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ jsxDEV10("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxDEV10("div", { className: "flex items-center", children: [
        /* @__PURE__ */ jsxDEV10(
          "input",
          {
            id: "remember",
            name: "remember",
            type: "checkbox",
            className: "h-4 w-4 rounded border-zinc-300 text-sky-600 focus:ring-sky-500"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 178,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV10(
          "label",
          {
            htmlFor: "remember",
            className: "ml-2 block text-sm text-zinc-900",
            children: "Remember me"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 184,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 177,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV10("div", { className: "text-center text-sm text-zinc-500", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ jsxDEV10(
          Link4,
          {
            className: "text-sky-500 underline",
            to: {
              pathname: "/join",
              search: searchParams.toString()
            },
            children: "Sign up"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 193,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 191,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 176,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 114,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 113,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 112,
    columnNumber: 5
  }, this);
}

// app/routes/notes.tsx
var notes_exports = {};
__export(notes_exports, {
  default: () => NotesPage,
  loader: () => loader5
});
import { json as json3 } from "@remix-run/node";
import { Form as Form3, Link as Link5, NavLink, Outlet as Outlet3, useLoaderData as useLoaderData3 } from "@remix-run/react";

// app/models/note.server.ts
import arc3 from "@architect/functions";
import { createId as createId2 } from "@paralleldrive/cuid2";
var skToId2 = (sk) => sk.replace(/^note#/, "");
async function getNoteListItems({
  userId
}) {
  return (await (await arc3.tables()).note.query({
    KeyConditionExpression: "pk = :pk",
    ExpressionAttributeValues: { ":pk": userId }
  })).Items.map((n) => ({
    title: n.title,
    id: skToId2(n.sk)
  }));
}

// app/routes/notes.tsx
import { jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var loader5 = async ({ request }) => {
  let userId = await requireUserId(request), noteListItems = await getNoteListItems({ userId });
  return json3({ noteListItems });
};
function NotesPage() {
  let data = useLoaderData3(), user = useUser();
  return /* @__PURE__ */ jsxDEV11("div", { className: "flex h-full min-h-screen flex-col", children: [
    /* @__PURE__ */ jsxDEV11("header", { className: "flex items-center justify-between bg-slate-800 p-4 text-white", children: [
      /* @__PURE__ */ jsxDEV11("h1", { className: "text-3xl font-bold", children: /* @__PURE__ */ jsxDEV11(Link5, { to: ".", children: "Notes" }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 27,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 26,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11("p", { children: user.email }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 29,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11(Form3, { action: "/logout", method: "post", children: /* @__PURE__ */ jsxDEV11(
        "button",
        {
          type: "submit",
          className: "rounded bg-slate-600 py-2 px-4 text-blue-100 hover:bg-blue-500 active:bg-blue-600",
          children: "Logout"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/notes.tsx",
          lineNumber: 31,
          columnNumber: 11
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 30,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 25,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV11("main", { className: "flex h-full bg-white", children: [
      /* @__PURE__ */ jsxDEV11("div", { className: "h-full w-80 border-r bg-gray-50", children: [
        /* @__PURE__ */ jsxDEV11(Link5, { to: "new", className: "block p-4 text-xl text-blue-500", children: "+ New Note" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 42,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV11("hr", {}, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this),
        data.noteListItems.length === 0 ? /* @__PURE__ */ jsxDEV11("p", { className: "p-4", children: "No notes yet" }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 49,
          columnNumber: 13
        }, this) : /* @__PURE__ */ jsxDEV11("ol", { children: data.noteListItems.map((note) => /* @__PURE__ */ jsxDEV11("li", { children: /* @__PURE__ */ jsxDEV11(
          NavLink,
          {
            className: ({ isActive }) => `block border-b p-4 text-xl ${isActive ? "bg-white" : ""}`,
            to: note.id,
            children: [
              "\u{1F4DD} ",
              note.title
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/routes/notes.tsx",
            lineNumber: 54,
            columnNumber: 19
          },
          this
        ) }, note.id, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 53,
          columnNumber: 17
        }, this)) }, void 0, !1, {
          fileName: "app/routes/notes.tsx",
          lineNumber: 51,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 41,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV11("div", { className: "flex-1 p-6", children: /* @__PURE__ */ jsxDEV11(Outlet3, {}, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 69,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/routes/notes.tsx",
        lineNumber: 68,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/notes.tsx",
      lineNumber: 40,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/notes.tsx",
    lineNumber: 24,
    columnNumber: 5
  }, this);
}

// app/routes/blog/index.tsx
var blog_exports = {};
__export(blog_exports, {
  default: () => blog_default
});
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var articles = [
  {
    id: 1,
    title: "Agile",
    subTitle: "Myths and misunderstandings",
    summary: "Agile is one of the most widely used and widely misunderstood frameworks out there. Let's try to clear things up.",
    link: "/blog/agile"
  },
  {
    id: 2,
    title: "CSS and JS",
    subTitle: "Star-crossed lovers",
    summary: "CSS was not designed with JS in mind.  JS was not designed with CSS in mind.  Should we try to mix the two?",
    link: "/blog/css-and-js"
  },
  {
    id: 3,
    title: "Testing",
    subTitle: "When to test, what to test, and how to test",
    summary: "Should we write unit tests or e2e tests?  How much coverage is too much coverage?",
    link: "/blog/testing"
  },
  {
    id: 4,
    title: "Bugs",
    subTitle: "Where they come from and how to keep them out",
    summary: "Bugs don't just appear out of nowhere.  We create them by giving them good places to form, by not testing properly, and by not having the processes in place to prevent them from recurring.",
    link: "/blog/bugs"
  },
  {
    id: 5,
    title: "Functional Programming Paradigms",
    subTitle: "From group theory to type systems",
    summary: "A brief overview of the functional programming landscape and why it makes sense.  Explore concepts like the Y-combinator, Monads, Options, and Eithers",
    link: "/blog/functional-programming"
  }
], Blog = () => /* @__PURE__ */ jsxDEV12("div", { children: [
  /* @__PURE__ */ jsxDEV12("h1", { className: "text-2xl", children: "Blog Posts" }, void 0, !1, {
    fileName: "app/routes/blog/index.tsx",
    lineNumber: 49,
    columnNumber: 7
  }, this),
  articles.map((article) => /* @__PURE__ */ jsxDEV12(
    "div",
    {
      className: "list-item-bubble my-10 p-5",
      children: [
        /* @__PURE__ */ jsxDEV12("div", { className: "mb-2 flex items-baseline", children: [
          /* @__PURE__ */ jsxDEV12("h1", { className: "mr-2 text-lg font-bold", children: [
            article.title,
            ":"
          ] }, void 0, !0, {
            fileName: "app/routes/blog/index.tsx",
            lineNumber: 56,
            columnNumber: 13
          }, this),
          " ",
          /* @__PURE__ */ jsxDEV12("h2", { className: "text-base", children: article.subTitle }, void 0, !1, {
            fileName: "app/routes/blog/index.tsx",
            lineNumber: 57,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/blog/index.tsx",
          lineNumber: 55,
          columnNumber: 11
        }, this),
        article.summary
      ]
    },
    `blog-article-${article.id}`,
    !0,
    {
      fileName: "app/routes/blog/index.tsx",
      lineNumber: 51,
      columnNumber: 9
    },
    this
  ))
] }, void 0, !0, {
  fileName: "app/routes/blog/index.tsx",
  lineNumber: 48,
  columnNumber: 5
}, this), blog_default = Blog;

// app/routes/jobs.tsx
var jobs_exports = {};
__export(jobs_exports, {
  default: () => jobs_default,
  meta: () => meta6
});
import { Link as Link6, Outlet as Outlet4 } from "@remix-run/react";
import { Fragment as Fragment5, jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var meta6 = () => [
  {
    title: "Work Experience"
  }
], Jobs = () => /* @__PURE__ */ jsxDEV13(Fragment5, { children: [
  /* @__PURE__ */ jsxDEV13("h1", { className: "text-2xl", children: "Work Experience" }, void 0, !1, {
    fileName: "app/routes/jobs.tsx",
    lineNumber: 73,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV13("ul", { children: [
    {
      id: 1,
      title: "Sr. Software Engineer",
      companyName: "Health Data Analytics Institute",
      companyLogo: "/_static/logos/hdai_logo1.png",
      location: "Dedham, MA",
      startDate: "2023",
      endDate: "present",
      description: "Worked with NestJS, React, React Query, and TypeScript to build APIs and application features.  Helped with the configuration and rollout of a new testing initiative using Playwright.  Migrated the frontend unit testing framework from Jest to Vitest.  Created database diagrams for the frontend teams.  Wrote documentation, participated in story design, helped design new DB tables.  Performed code reviews, mentored junior developers, helped define coding standards, etc.  Led the upgrade of Node, React, Typescript, ESlint, and numerous other libraries.  Configured Vite/Rollup, ESLint, Typescript, and node.  Aligned the configuration systems between the front and back end.  Significantly reduced time spent starting the app locally and switching environments.  Moved the backend app to a containerized deployment with Docker to be deployed to ECS.  Set up GitHub actions to build and deploy both the backend(ECR) and the frontend(S3) of the app."
    },
    {
      id: 2,
      title: "Lead Software Engineer",
      companyName: "Self-employed",
      companyLogo: "",
      location: "Remote",
      startDate: "2023",
      endDate: "2023",
      description: "Ingested data from a collection of several thousand PDFs producing millions of vectors.  Split the data into chunks based on token count because the token limit restriction prevented effective texttiling.  I\u2019m looking into building a hybrid solution.  Applied NLP techniques using nltk.  Created vector embeddings from the text chunks and saved them in Pinecone/Milvus.  Built a RAG-based GPT chatbot using the data in the vector DB for semantic search, then provided that result as context to the generative language model to create a summary about the topic.  Developed and deployed the architecture around these systems to AWS using terraform.  Created mockups in Balsamiq and used Trello for project management."
    },
    {
      id: 3,
      title: "Sr. Software Engineer",
      companyName: "BetterLesson",
      companyLogo: "/_static/logos/BL-Logo-Inline.svg",
      location: "Cambridge, MA",
      startDate: "2018",
      endDate: "2021",
      description: "Used Git and Jira, daily for project management. Used Python and Flask in tandem with SQLAlchemy to bring data to the front-end.  Used ElasticSearch, Alembic/MySQL, PostgreSQL, Quickbase, and Salesforce to store and retrieve data. Used JavaScript and React to build Front-end UIs.  Lead the adoption of automated testing using Jest, Enzyme and RTL. Implemented code-quality standards using ES-lint and Pylint in our CI/CD pipeline. Configured webpack. Used serverless to test AWS lambdas locally.  Set up systems involving webhooks, AWS lambdas, S3 and supervisor processes to poll SQS to collect messages added by the lambda. Used packer to build a new Docker container for our local environments to facilitate a Python3 upgrade.  Built and deployed new Linux servers using packer and Terraform. Used the AWS Console to manage our systems.  Configured NginX for local routing and proxying.  Set up and polled standard, FIFO, and dead-letter queues in SQS."
    },
    {
      id: 4,
      title: "Software Engineer",
      companyName: "American Tower",
      companyLogo: "/_static/logos/atc_logo.png",
      location: "Woburn, MA",
      startDate: "2015",
      endDate: "2018",
      description: "Built enterprise applications using HTML5, CSS3, JavaScript and ES6. While there I used node.js and Express.js to expose REST services which supply data from Oracle or MSSQL to the front-end as JSON.  Used React, npm, webpack, etc. to build single-page apps with authentication and authorization that consume data from REST services. Also used many packages from npm including socket.io, reactstrap, babel, axios and Sass.  Configured build automation using CircleCI, Travis CI and Jenkins. Built several responsive, dynamic widgets for the _static web site including some using the Google Maps API.  Taught design patterns, lead code reviews and gave presentations on React, npm, webpack, Git, and Redux.  Used HOCs, currying and composition to refactor code to make it more modular and maintainable."
    },
    {
      id: 5,
      title: "Web Developer",
      companyName: "Pearson Inc.",
      companyLogo: "/_static/logos/pearson_logo_white_bg.png",
      location: "Boston, MA",
      startDate: "2012",
      endDate: "2015",
      description: "Employed HTML5, XML, CSS3, JavaScript, jQuery, and Bootstrap to build and modify responsive web-pages in Backbone for both distributed content and internal use. Used object-oriented JavaScript in Google AppScripts with JSON objects and various APIs to automate Google sheets. Wrote UNIX shell-scripts to sort and manage files, and Perl scripts to parse documents and extract text.  Responsible for dynamically creating data used to link PDF, image, and video files to create various digital products containing 35,000+ files."
    }
  ].map((job) => /* @__PURE__ */ jsxDEV13("li", { className: "list-item-bubble my-10 p-5", children: [
    /* @__PURE__ */ jsxDEV13("h4", { className: "py-1", children: [
      /* @__PURE__ */ jsxDEV13(
        Link6,
        {
          className: "text-lg font-medium",
          to: {
            pathname: `/jobs/${job.id}`,
            search: "company"
          },
          children: [
            job.companyName,
            " - ",
            job.location,
            job.companyLogo && /* @__PURE__ */ jsxDEV13("div", { className: "float-right", children: /* @__PURE__ */ jsxDEV13(
              "img",
              {
                height: 40,
                width: 120,
                src: job.companyLogo,
                alt: "Company logo"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/jobs.tsx",
                lineNumber: 89,
                columnNumber: 23
              },
              this
            ) }, void 0, !1, {
              fileName: "app/routes/jobs.tsx",
              lineNumber: 88,
              columnNumber: 21
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/routes/jobs.tsx",
          lineNumber: 79,
          columnNumber: 17
        },
        this
      ),
      " "
    ] }, void 0, !0, {
      fileName: "app/routes/jobs.tsx",
      lineNumber: 78,
      columnNumber: 15
    }, this),
    /* @__PURE__ */ jsxDEV13("div", { children: [
      /* @__PURE__ */ jsxDEV13("span", { className: "font-bold", children: job.title }, void 0, !1, {
        fileName: "app/routes/jobs.tsx",
        lineNumber: 100,
        columnNumber: 17
      }, this),
      " (",
      job.startDate,
      " ",
      "- ",
      job.endDate,
      "): ",
      job.description
    ] }, void 0, !0, {
      fileName: "app/routes/jobs.tsx",
      lineNumber: 99,
      columnNumber: 15
    }, this)
  ] }, `job-${job.id}`, !0, {
    fileName: "app/routes/jobs.tsx",
    lineNumber: 77,
    columnNumber: 13
  }, this)) }, void 0, !1, {
    fileName: "app/routes/jobs.tsx",
    lineNumber: 74,
    columnNumber: 7
  }, this),
  /* @__PURE__ */ jsxDEV13(Outlet4, {}, void 0, !1, {
    fileName: "app/routes/jobs.tsx",
    lineNumber: 107,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/jobs.tsx",
  lineNumber: 72,
  columnNumber: 5
}, this), jobs_default = Jobs;

// app/routes/join.tsx
var join_exports = {};
__export(join_exports, {
  ErrorBoundry: () => ErrorBoundry3,
  action: () => action3,
  default: () => Join,
  loader: () => loader6,
  meta: () => meta7
});
import { json as json4, redirect as redirect4 } from "@remix-run/node";
import { Form as Form4, Link as Link7, useActionData as useActionData2, useSearchParams as useSearchParams2 } from "@remix-run/react";
import * as React2 from "react";
import { jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var loader6 = async ({ request }) => await getUserId(request) ? redirect4("/") : json4({}), action3 = async ({ request }) => {
  let formData = await request.formData(), email = formData.get("email"), password = formData.get("password"), redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  if (!validateEmail(email))
    return json4(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  if (typeof password != "string" || password.length === 0)
    return json4(
      { errors: { password: "Password is required" } },
      { status: 400 }
    );
  if (password.length < 8)
    return json4(
      { errors: { password: "Password is too short" } },
      { status: 400 }
    );
  if (await getUserByEmail(email))
    return json4(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  let user = await createUser(email, password);
  return createUserSession({
    request,
    userId: user.id,
    remember: !1,
    redirectTo
  });
}, meta7 = () => ({
  title: "Sign Up"
}), ErrorBoundry3 = ({ error }) => /* @__PURE__ */ jsxDEV14("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ jsxDEV14("div", { className: "mx-auto w-full max-w-md px-8", children: [
  /* @__PURE__ */ jsxDEV14("h1", { className: "text-xl font-medium leading-normal text-zinc-800", children: "Error:" }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 90,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV14("pre", { children: error?.message }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 91,
    columnNumber: 9
  }, this)
] }, void 0, !0, {
  fileName: "app/routes/join.tsx",
  lineNumber: 89,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/routes/join.tsx",
  lineNumber: 88,
  columnNumber: 5
}, this);
function Join() {
  let [searchParams] = useSearchParams2(), redirectTo = safeRedirect(searchParams.get("redirectTo"), "/"), actionData = useActionData2(), emailRef = React2.useRef(null), passwordRef = React2.useRef(null);
  return React2.useEffect(() => {
    actionData?.errors?.email ? emailRef.current?.focus() : actionData?.errors?.password && passwordRef.current?.focus();
  }, [actionData]), /* @__PURE__ */ jsxDEV14("div", { className: "flex min-h-full flex-col justify-center", children: /* @__PURE__ */ jsxDEV14("div", { className: "mx-auto w-full max-w-md px-8", children: /* @__PURE__ */ jsxDEV14(Form4, { method: "post", className: "space-y-6 form", noValidate: !0, children: [
    /* @__PURE__ */ jsxDEV14("div", { children: [
      /* @__PURE__ */ jsxDEV14(
        "label",
        {
          htmlFor: "email",
          className: "block text-sm font-medium text-zinc-700",
          children: "Email address"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 117,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV14("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsxDEV14(
          "input",
          {
            ref: emailRef,
            id: "email",
            required: !0,
            autoFocus: !0,
            name: "email",
            type: "email",
            autoComplete: "email",
            "aria-invalid": actionData?.errors?.email ? !0 : void 0,
            "aria-describedby": "email-error",
            className: "w-full rounded border border-zinc-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 124,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.email && /* @__PURE__ */ jsxDEV14("div", { className: "pt-1 text-red-700", id: "email-error", children: actionData.errors.email }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 137,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 123,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 116,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV14("div", { children: [
      /* @__PURE__ */ jsxDEV14(
        "label",
        {
          htmlFor: "password",
          className: "block text-sm font-medium text-zinc-700",
          children: "Password"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 145,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV14("div", { className: "mt-1", children: [
        /* @__PURE__ */ jsxDEV14(
          "input",
          {
            id: "password",
            ref: passwordRef,
            name: "password",
            type: "password",
            autoComplete: "new-password",
            "aria-invalid": actionData?.errors?.password ? !0 : void 0,
            "aria-describedby": "password-error",
            className: "w-full rounded border border-zinc-500 px-2 py-1 text-lg"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/join.tsx",
            lineNumber: 152,
            columnNumber: 15
          },
          this
        ),
        actionData?.errors?.password && /* @__PURE__ */ jsxDEV14("div", { className: "pt-1 text-red-700", id: "password-error", children: actionData.errors.password }, void 0, !1, {
          fileName: "app/routes/join.tsx",
          lineNumber: 163,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/join.tsx",
        lineNumber: 151,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 144,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV14("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 170,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ jsxDEV14(
      "button",
      {
        type: "submit",
        className: "w-full rounded bg-sky-500  py-2 px-4 text-white hover:bg-sky-600 focus:bg-sky-400",
        children: "Create Account"
      },
      void 0,
      !1,
      {
        fileName: "app/routes/join.tsx",
        lineNumber: 171,
        columnNumber: 11
      },
      this
    ),
    /* @__PURE__ */ jsxDEV14("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxDEV14("div", { className: "text-center text-sm text-zinc-500", children: [
      "Already have an account?",
      " ",
      /* @__PURE__ */ jsxDEV14(
        Link7,
        {
          className: "text-sky-500 underline",
          to: {
            pathname: "/login",
            search: searchParams.toString()
          },
          children: "Log in"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/join.tsx",
          lineNumber: 180,
          columnNumber: 15
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/routes/join.tsx",
      lineNumber: 178,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "app/routes/join.tsx",
      lineNumber: 177,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/join.tsx",
    lineNumber: 115,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 114,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/join.tsx",
    lineNumber: 113,
    columnNumber: 5
  }, this);
}

// cypress/support/test-routes/create-user.ts
var create_user_exports = {};
__export(create_user_exports, {
  action: () => action4,
  default: () => create_user_default
});
import "@remix-run/node";
var action4 = async ({ request }) => {
  let { email } = await request.json();
  if (!email)
    throw new Error("email required for login");
  if (!email.endsWith("@example.com"))
    throw new Error("All test emails must end in @example.com");
  let user = await createUser(email, "myreallystrongpassword");
  if (user)
    return createUserSession({
      request,
      userId: user.id,
      remember: !0,
      redirectTo: "/"
    });
}, create_user_default = null;

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/_static/build/entry.client-6SREP5BV.js", imports: ["/_static/build/_shared/chunk-J7BWL7T7.js", "/_static/build/_shared/chunk-LPPYD6HP.js", "/_static/build/_shared/chunk-6FZTSJIS.js", "/_static/build/_shared/chunk-IZ2HZTBT.js", "/_static/build/_shared/chunk-UUCMHJJ2.js", "/_static/build/_shared/chunk-VDD37JSE.js", "/_static/build/_shared/chunk-WN4IQK2U.js"] }, routes: { "../cypress/support/test-routes/create-user": { id: "../cypress/support/test-routes/create-user", parentId: "root", path: "__tests/create-user", index: void 0, caseSensitive: void 0, module: "/_static/build/_.._/cypress/support/test-routes/create-user-CKRJDCVY.js", imports: void 0, hasAction: !0, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/_static/build/root-MBIVBHLJ.js", imports: ["/_static/build/_shared/chunk-SN7WORGT.js", "/_static/build/_shared/chunk-NGMGOBMD.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/about": { id: "routes/about", parentId: "root", path: "about", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/about-HXJMYHMW.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/appointment": { id: "routes/appointment", parentId: "root", path: "appointment", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/appointment-GQO3RS5S.js", imports: ["/_static/build/_shared/chunk-NNIK6ZRY.js", "/_static/build/_shared/chunk-CQ63G7NL.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/blog": { id: "routes/blog", parentId: "root", path: "blog", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/blog-LSVFCFBZ.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/index": { id: "routes/index", parentId: "root", path: "index", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/index-APRPSJNE.js", imports: ["/_static/build/_shared/chunk-CQ63G7NL.js"], hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/jobs": { id: "routes/jobs", parentId: "root", path: "jobs", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/jobs-623ENDNW.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/join": { id: "routes/join", parentId: "root", path: "join", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/join-442L4O2O.js", imports: ["/_static/build/_shared/chunk-YAI26XTG.js", "/_static/build/_shared/chunk-NNIK6ZRY.js", "/_static/build/_shared/chunk-CQ63G7NL.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/login-4UR27SV7.js", imports: ["/_static/build/_shared/chunk-YAI26XTG.js", "/_static/build/_shared/chunk-NNIK6ZRY.js", "/_static/build/_shared/chunk-CQ63G7NL.js"], hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/logout-TFHAYXS5.js", imports: void 0, hasAction: !0, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/notes": { id: "routes/notes", parentId: "root", path: "notes", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/notes-PEFS6HZX.js", imports: ["/_static/build/_shared/chunk-NNIK6ZRY.js", "/_static/build/_shared/chunk-CQ63G7NL.js"], hasAction: !1, hasLoader: !0, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 }, "routes/portfolio": { id: "routes/portfolio", parentId: "root", path: "portfolio", index: void 0, caseSensitive: void 0, module: "/_static/build/routes/portfolio-OEKCWQZF.js", imports: void 0, hasAction: !1, hasLoader: !1, hasClientAction: !1, hasClientLoader: !1, hasErrorBoundary: !1 } }, version: "8498c8dc", hmr: { runtime: "/_static/build/_shared\\chunk-UUCMHJJ2.js", timestamp: 1731765879736 }, url: "/_static/build/manifest-8498C8DC.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1, v3_relativeSplatPath: !1, v3_throwAbortReason: !1, v3_singleFetch: !1, v3_lazyRouteDiscovery: !1, unstable_optimizeDeps: !1, unstable_routeConfig: !1 }, publicPath = "/_static/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/appointment": {
    id: "routes/appointment",
    parentId: "root",
    path: "appointment",
    index: void 0,
    caseSensitive: void 0,
    module: appointment_exports
  },
  "routes/portfolio": {
    id: "routes/portfolio",
    parentId: "root",
    path: "portfolio",
    index: void 0,
    caseSensitive: void 0,
    module: portfolio_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/about": {
    id: "routes/about",
    parentId: "root",
    path: "about",
    index: void 0,
    caseSensitive: void 0,
    module: about_exports
  },
  "routes/index": {
    id: "routes/index",
    parentId: "root",
    path: "index",
    index: void 0,
    caseSensitive: void 0,
    module: routes_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/notes": {
    id: "routes/notes",
    parentId: "root",
    path: "notes",
    index: void 0,
    caseSensitive: void 0,
    module: notes_exports
  },
  "routes/blog": {
    id: "routes/blog",
    parentId: "root",
    path: "blog",
    index: void 0,
    caseSensitive: void 0,
    module: blog_exports
  },
  "routes/jobs": {
    id: "routes/jobs",
    parentId: "root",
    path: "jobs",
    index: void 0,
    caseSensitive: void 0,
    module: jobs_exports
  },
  "routes/join": {
    id: "routes/join",
    parentId: "root",
    path: "join",
    index: void 0,
    caseSensitive: void 0,
    module: join_exports
  },
  "../cypress/support/test-routes/create-user": {
    id: "../cypress/support/test-routes/create-user",
    parentId: "root",
    path: "__tests/create-user",
    index: void 0,
    caseSensitive: void 0,
    module: create_user_exports
  }
};

// server.ts
process.env.TZ = "America/New_York", require_mocks();
var handler = createRequestHandler({
  build: server_build_exports,
  mode: "development"
});
export {
  handler
};
//# sourceMappingURL=index.js.map
