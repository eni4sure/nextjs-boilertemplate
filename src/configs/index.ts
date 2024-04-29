import packageInfo from "../../package.json";

// How to use this:
// ============================================================
// This file is used to store all the environment variables and constants used in the application.

// # To add a new variable:
// ============================================================
// - For environment variables & constants that are the same across all environments, add them to the GLOBAL_CONSTANTS object.
// - For environment-specific variables (i.e they change depending on the environemnt), add them to the environment's object in each of the CONFIG_BUILDER object.

// # To add a new environment:
// ============================================================
// 1. Add a new key to the CONFIG_BUILDER object with the environment name.
// 2. Duplicate the development object and replace the values with the new environment's values.

const APP_VERSION = packageInfo.version;
const DEPLOYMENT_ENV = process.env.DEPLOYMENT_ENV || "development";

const GLOBAL_CONSTANTS = {
    // System Constants
    // ============================================================
    APP_NAME: "nextjs-boilertemplate",

    // Sentry & Monitoring Configs
    // ============================================================
    SENTRY: {
        RELEASE: APP_VERSION,
        DSN: "", // TODO: Add Sentry DSN here
        PROJECT: "", // TODO: Add Sentry Project here
        ORGANISATION: "", // TODO: Add Sentry Organisation here
    },
};

const CONFIG_BUILDER = {
    development: {
        ...GLOBAL_CONSTANTS,

        // System Constants
        // ============================================================
        URL: {
            API_BASE_URL: "https://localhost:4000",
        },

        // App Level Configs
        // ============================================================

        // e.g
        // STRIPE: {
        //     PUBLIC_KEY: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        // },
    },

    production: {
        ...GLOBAL_CONSTANTS,

        // System Constants
        // ============================================================
        URL: {
            API_BASE_URL: "https://api.nextjs-boilertemplate.com",
        },

        // App Level Configs
        // ============================================================

        // e.g
        // STRIPE: {
        //     PUBLIC_KEY: "pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        // },
    },
} as const;

// Check if DEPLOYMENT_ENV is valid
if (!Object.keys(CONFIG_BUILDER).includes(DEPLOYMENT_ENV)) {
    throw new Error(`Invalid DEPLOYMENT_ENV: ${DEPLOYMENT_ENV}`);
}

const CONFIGS = CONFIG_BUILDER[DEPLOYMENT_ENV as keyof typeof CONFIG_BUILDER];

// Uncomment below to check configs set
// console.log("CONFIGS:", CONFIGS);

export { DEPLOYMENT_ENV, APP_VERSION, CONFIGS };
