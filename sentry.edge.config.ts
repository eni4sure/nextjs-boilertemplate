// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.

import * as Sentry from "@sentry/nextjs";
import { CONFIGS, DEPLOYMENT_ENV } from "@/configs";

Sentry.init({
    dsn: CONFIGS.SENTRY.DSN,

    tracesSampleRate: 0.4, // % of transactions that will be sampled

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: DEPLOYMENT_ENV === "development",
});
