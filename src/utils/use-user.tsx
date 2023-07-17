import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import jwt_decode, { JwtPayload } from "jwt-decode";

import { APIVersion1GetCurrentUser } from "@/http";

export default function useUser() {
    const { data: userQuery, ...utils } = useQuery(["auth-user"], APIVersion1GetCurrentUser, {
        cacheTime: Infinity,
        staleTime: 60000 * 10 /* 10 mins */,
    });

    const accessToken = getCookie("access-token", {}) as string;

    let user = null;

    try {
        const decodedToken: JwtPayload = jwt_decode(accessToken || "");
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
        isAuthenticated: !!accessToken,
        ...utils,
    };
}
