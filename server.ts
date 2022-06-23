import { createRequestHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV === "development") {
  // Set dev server timezone to the local timezone.
  process.env.TZ = 'America/New_York';

  require("./mocks");
}

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
