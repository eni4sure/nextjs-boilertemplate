import Router from "next/router";
import axios, { AxiosError, AxiosInstance } from "axios";
import { deleteCookie, getCookie, hasCookie } from "cookies-next";

const baseURL = process.env.BACKEND_BASE_URL;

const config: any = {
    baseURL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json"
    }
};

// Create new axios instance
const $http: AxiosInstance = axios.create(config);

$http.interceptors.request.use((config: any) => {
    // If auth-token is available, add it to the Axios API header
    if (hasCookie("auth-token", {})) {
        config.headers["Authorization"] = `Bearer ${getCookie("auth-token", {})}`;
    }

    return config;
});

$http.interceptors.response.use(undefined, async (error: AxiosError<any>) => {
    // If response returned, Intercept the responses and check if status code is 401
    if (error.response && error.response.status === 401) {
        switch (error.response.data.message) {
            case "-middleware/user-not-found": {
                Router.replace("/auth/logout");
                break;
            }

            case "-middleware/user-email-not-verified": {
                if (Router.pathname !== "/dashboard/verify-email") Router.replace("/dashboard/verify-email");
                break;
            }

            case "-middleware/user-deactivated": {
                if (Router.pathname !== "/dashboard/deactivated") Router.replace("/dashboard/deactivated");
                break;
            }

            case "-middleware/user-not-authorized": {
                if (Router.pathname !== "/dashboard/unauthorized") Router.replace("/dashboard/unauthorized");
                break;
            }

            case "-middleware/token-expired": {
                deleteCookie("auth-token", {});
                if (Router.pathname !== "/auth/login") Router.replace({ pathname: "/auth/login", query: { next: Router.pathname } });
                break;
            }
        }
    }

    return Promise.reject(error);
});

export default $http;
