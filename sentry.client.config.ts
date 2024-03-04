// This file configures the initialization of Sentry on the client.
// The config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
import { CONFIGS, DEPLOYMENT_ENV } from "@/configs";

Sentry.init({
    dsn: CONFIGS.SENTRY.DSN,

    tracesSampleRate: 0.4, // % of transactions that will be sampled
    replaysOnErrorSampleRate: 1.0, // % of errors that will be recorded for replay

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: DEPLOYMENT_ENV === "development",

    // This sets the sample rate to be 10%. You may want this to be 100% while
    // in development and sample at a lower rate in production
    replaysSessionSampleRate: DEPLOYMENT_ENV === "development" ? 1.0 : 0.05, // % of sessions that will be recorded for replay

    integrations: [
        Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
});
