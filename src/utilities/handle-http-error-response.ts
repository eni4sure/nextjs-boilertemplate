import axios from "axios";
import { NextRouter } from "next/router";

export const handleHTTPResponse = async (error: any, router: NextRouter) => {
    // check if the error is an axios error
    if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
            if (error.response.data.message === "-middleware/user-not-found") {
                router.replace("/logout");
            }

            if (error.response.data.message === "-middleware/user-email-not-verified") {
                if (router.pathname !== "/dashboard/verify-email") router.replace("/dashboard/verify-email");
            }

            if (error.response.data.message === "-middleware/user-deactivated") {
                router.replace("/logout");
            }

            if (error.response.data.message === "-middleware/user-not-authorized") {
                if (router.pathname !== "/dashboard/unauthorized") router.replace("/dashboard/unauthorized");
            }

            // this will run if the token is expired, and we've tried to refresh the token, but it's also expired
            if (error.response.data.message === "-middleware/token-expired") {
                // update the message to the user
                error.response.data.message = "Login session has expired. Please login again.";
                router.replace("/logout");
            }
        }
    }
};
