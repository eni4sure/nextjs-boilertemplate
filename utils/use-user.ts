import React from "react";
import { getCookie } from "cookies-next";
import type { AxiosResponse } from "axios";
import { useQuery } from "@tanstack/react-query";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { userGetMe } from "../api";

const useUser = (fromCache?: boolean) => {
    const [userData, setUserData] = React.useState<null | object | any>(null);

    const { isLoading, isError } = useQuery(["auth-user"], userGetMe, {
        onSuccess: (response: AxiosResponse) => {
            setUserData(response.data.data);
        },
        onError: () => {
            // if fromCache break; don't load cookie token for useUser
            if (fromCache) return;

            const decodeJwt: JwtPayload = jwtDecode((getCookie("auth-token") as string) || "");
            delete decodeJwt.iat;
            delete decodeJwt.exp;

            setUserData(decodeJwt);
        },
        enabled: fromCache == true ? false : true
    });

    React.useEffect(() => {
        // if fromCache is true, then we don't need to fetch the user data, just return the user data from localStorage
        if (fromCache) {
            setUserData(JSON.parse(localStorage.getItem("user") as string));
        }
    }, []);

    // update localStorage when userData is updated from useQuery
    if (!fromCache && userData) {
        localStorage.setItem("user", JSON.stringify(userData));
    }

    return {
        isLoading,
        user: userData,
        isError
    };
};

export default useUser;
