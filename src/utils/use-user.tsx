import { useQuery } from "@tanstack/react-query";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { getCookie, hasCookie } from "cookies-next";

import { APIGetCurrentUser } from "@/http";

export default function useUser() {
    const {
        isError,
        isLoading,
        isRefetching,
        data: userQuery,
        refetch,
    } = useQuery(["auth-user"], APIGetCurrentUser, {
        cacheTime: Infinity,
        staleTime: 60000 * 10 /* 10 mins */,
    });

    const isLoadingUser = isLoading || isRefetching;
    const isAuthenticated = hasCookie("auth-token");

    let user = null;

    if (isError && isAuthenticated) {
        const decodedToken: JwtPayload = jwt_decode((getCookie("auth-token") as string) || "");
        delete decodedToken.iat;
        delete decodedToken.exp;

        user = decodedToken;
    } else {
        user = userQuery?.data || null;
    }

    return {
        user,
        isLoadingUser,
        isAuthenticated,
        refreshAuthState: refetch,
    };
}
