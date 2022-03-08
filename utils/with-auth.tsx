import React from "react";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";

import { userGetMe } from "../api";

import type { AxiosError } from "axios";

const withAuth = (WrappedComponent: React.FC) => {
    const NewComponent = () => {
        const router: NextRouter = useRouter();

        // Check if auth token is in cookie
        const authToken = getCookie("auth-token");

        React.useEffect(() => {
            if (!authToken) {
                // If auth token is not in cookie, redirect to login page
                router.push("/");
            }
        }, []);

        // If auth token is in cookie, check if it is valid
        useQuery("auth-user", userGetMe, {
            onError: (error: AxiosError) => {
                const message = error.response ? error.response.data.message : error.message;
                // Handle invalid auth token error and redirect somewhere
                router.push("/");
            },
            enabled: !!authToken
        });

        return <WrappedComponent />;
    };

    return NewComponent;
};

export default withAuth;
