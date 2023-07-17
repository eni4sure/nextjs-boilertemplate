import { useQuery } from "@tanstack/react-query";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { getCookie, hasCookie } from "cookies-next";

import { APIVersion1GetCurrentUser } from "@/http";

export default function useUser() {
    const { data: userQuery, ...utils } = useQuery(["auth-user"], APIVersion1GetCurrentUser, {
        cacheTime: Infinity,
        staleTime: 60000 * 10 /* 10 mins */,
    });

    const isAuthenticated = hasCookie("access-token");

    let user = null;

    try {
        const decodedToken: JwtPayload = jwt_decode((getCookie("access-token") as string) || "");
        delete decodedToken.iat;
        delete decodedToken.exp;

        user = decodedToken;
    } catch (error) {
        // do nothing, catches error like "invalid token", "token expired", etc
    }

    if (userQuery) {
        user = userQuery?.data || null;
    }

    return {
        user,
        isAuthenticated,
        ...utils,
    };
}
