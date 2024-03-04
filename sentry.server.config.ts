// This file configures the initialization of Sentry on the server.
// The config here will be used whenever the server handles a request.

import * as Sentry from "@sentry/nextjs";
import { CONFIGS, DEPLOYMENT_ENV } from "@/configs";

Sentry.init({
    dsn: CONFIGS.SENTRY.DSN,

    tracesSampleRate: 0.4, // % of transactions that will be sampled

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: DEPLOYMENT_ENV === "development",
});
