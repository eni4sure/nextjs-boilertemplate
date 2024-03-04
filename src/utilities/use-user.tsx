import { getCookie } from "cookies-next";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode, JwtPayload } from "jwt-decode";

import { APIVersion1GetCurrentUser } from "@/http";

export default function useUser() {
    const { data: userQuery, ...utils } = useQuery({
        queryKey: ["auth-user"],
        staleTime: 60000 * 10 /* 10 mins */,
        queryFn: () => APIVersion1GetCurrentUser(),
    });

    const accessToken = getCookie("access-token", {}) as string;

    let user = null;

    try {
        const decodedToken: JwtPayload = jwtDecode(accessToken || "");
        delete decodedToken.iat;
        delete decodedToken.exp;

        user = decodedToken;
    } catch (error) {
        // do nothing, catches error like "invalid token", "token expired", etc
    }

    if (userQuery) {
        user = userQuery.data || null;
    }

    return {
        user,
        isAuthenticated: !!accessToken,
        ...utils,
    };
}
