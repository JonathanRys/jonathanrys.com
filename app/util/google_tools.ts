import { getTokensByUserId, upsertToken } from "~/models/oauth.server";
import { safeRedirect } from "~/utils";
import type { Auth } from "googleapis";
import { google } from "googleapis";
import type { User } from "~/models/user.server";
import type { OAuth } from "~/models/oauth.server";
import type { Appointment, AppointmentItem } from "~/models/appointment.server";

interface GCalDateTime {
  date?: Date;
  dateTime: Date;
  timeZone: string;
}

export type CalendarEvent = {
  creatorEmail: string;
  calendarId?: string;
  description?: string;
  end: GCalDateTime;
  location?: string;
  start: GCalDateTime;
  summary?: string;
};

export type Email = {
  title: string;
  body: string;
  to: User["email"];
};

const userIdToEmail = (sk: User["id"]): User["email"] =>
  sk.replace(/^email#/, "");
const emailToUserId = (id: User["email"]): User["id"] => `email#${id}`;

// Google Calendar
export const generateOAuthUrl = (
  oauth2Client: Auth.OAuth2Client,
  redirectUrl?: string
) => {
  // pass SCOPES in to increase reusability
  const SCOPES = [
    "https://www.googleapis.com/auth/calendar",
    // 'https://www.googleapis.com/auth/calendar.events.readonly',
    // 'https://mail.google.com/',
    // 'https://www.googleapis.com/auth/gmail.addons.current.action.compose',
    // 'https://www.googleapis.com/auth/gmail.compose',
    // 'https://www.googleapis.com/auth/gmail.modify',
    // 'https://www.googleapis.com/auth/gmail.send',
  ];

  const url = oauth2Client.generateAuthUrl({
    // 'offline' means request a refresh_token
    access_type: "offline",
    scope: SCOPES,
  });

  return url;
};

export const verifyToken = async () => {
  // @TODO: Add code if this is needed
};

export const getNewToken = async (
  oauth2Client: Auth.OAuth2Client,
  userId: OAuth["id"],
  code: string
) => {
  /**
   * Gets a new OAuth2 token
   */
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  // Handler for updating tokens
  const tokenHandler = async (tokens: Auth.Credentials) => {
    return await upsertToken(userId, tokens);
  };

  oauth2Client.on("tokens", tokenHandler);
};

export const tryStoredCredentials = async (
  oauth2Client: Auth.OAuth2Client,
  userId: OAuth["id"]
): Promise<boolean> => {
  /**
   * Used the stored refresh_token to request new credentials
   */
  const userTokens = await getTokensByUserId(userId);

  if (userTokens?.refresh_token) {
    oauth2Client.setCredentials({
      refresh_token: userTokens.refresh_token,
    });
    return true;
  }
  return false;
};

// Translation layer
export const appointmentToCalendarEvent = (
  appointment: Appointment
): CalendarEvent => {
  const default_timezone = "America/New_York"; // @TODO: get from config

  return {
    creatorEmail: userIdToEmail(appointment.userId),
    calendarId: "primary",
    description: appointment.description,
    end: {
      dateTime: new Date(appointment.endDate),
      timeZone: appointment.timeZone || default_timezone,
    },
    location: appointment.location,
    start: {
      dateTime: new Date(appointment.startDate),
      timeZone: appointment.timeZone || default_timezone,
    },
    summary: appointment.title,
  };
};

export const calendarEventToAppointment = (
  event: CalendarEvent
): Appointment => {
  return {
    userId: emailToUserId(event.creatorEmail),
    title: event.summary || "",
    description: event.description || "",
    location: event.location || "",
    startDate: event.start.dateTime.toLocaleString(),
    endDate: event.end.dateTime.toLocaleString(),
  };
};

export const appointmentToEmail = (
  appointment: Appointment & AppointmentItem
): Email => {
  const emailIntro = "<b>A new appointment has been created.</b>\n\n";
  const emailFooter =
    '\n\nBack to <a href="https://jonathanrys.com">jonathanrys.com</a>';

  return {
    to: userIdToEmail(appointment.pk),
    title: appointment.title,
    body: emailIntro + appointment.description + emailFooter,
  };
};

// Meeting CRUD functionality
export const addMeeting = async (
  userId: User["id"],
  meeting: {
    title: string;
    description: string;
    location: string;
    startDate: Date;
    endDate: Date;
  }
) => {
  //create client
  const oauth2Client = new google.auth.OAuth2(
    process.env.GCAL_CLIENT_ID,
    process.env.GCAL_CLIENT_SECRET
    // redirectUrl
  );

  if (!(await tryStoredCredentials(oauth2Client, userId))) {
    return safeRedirect(generateOAuthUrl(oauth2Client));
  }

  // create the meeting

  return meeting;
};

export const getMeetings = () => {
  // const SCOPES = 'https://www.googleapis.com/auth/calendar.events.readonly';
  return [];
};

export const editMeeting = (options: {
  id: string;
  title: string;
  description: string;
  location: string;
  startDate: Date;
  endDate: Date;
}) => {
  // const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  return options;
};

export const deleteMeeting = (options: { id: string }) => {
  // const SCOPES = 'https://www.googleapis.com/auth/calendar.events';
  return options;
};

const makeBody = (email: Email) => {
  const str = [
    'Content-Type: text/plain; charset="UTF-8"\n',
    "MIME-Version: 1.0\n",
    "Content-Transfer-Encoding: 7bit\n",
    "to: ",
    email.to,
    "\n",
    "bcc: ",
    process.env.ADMIN_EMAIL,
    "\n",
    "from: ",
    process.env.ADMIN_EMAIL,
    "\n",
    "subject: ",
    email.title,
    "\n\n",
    email.body,
  ].join("");

  return Buffer.from(str)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
};

// GMail
const gmail = google.gmail({
  version: "v1",
  auth: process.env.GOOGLE_API_KEY,
});

export const sendEmail = async (email: Email) => {
  const auth = new google.auth.GoogleAuth({
    scopes: ["https://www.googleapis.com/auth/gmail.send"],
  });

  // Acquire an auth client, and bind it to all future calls
  const authClient = await auth.getClient();
  console.log("client:", authClient);
  // google.options({auth: authClient});

  return gmail.users.messages.send(
    {
      auth: process.env.GOOGLE_API_KEY,
      userId: "me",
      requestBody: {
        raw: makeBody(email),
      },
    },
    function (err, response) {
      return err || response;
    }
  );
};

export const sendAppointmentEmail = (
  appointment: Appointment & AppointmentItem
) => {
  return sendEmail(appointmentToEmail(appointment));
};
