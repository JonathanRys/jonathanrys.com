import { createRequestHandler } from "@remix-run/architect";
import * as build from "@remix-run/dev/server-build";

if (process.env.NODE_ENV !== "production") {
  require("./mocks");
}

// Set server timezone
process.env.TZ = 'America/New_York';

export const handler = createRequestHandler({
  build,
  mode: process.env.NODE_ENV,
});
