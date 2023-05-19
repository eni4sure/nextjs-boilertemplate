import { useQuery } from "@tanstack/react-query";
import jwt_decode, { JwtPayload } from "jwt-decode";
import { getCookie, hasCookie } from "cookies-next";

import { userGetMe } from "@/http";

const useUser = () => {
    const {
        isError,
        isLoading,
        isRefetching,
        data: userData,
        refetch,
    } = useQuery(["auth-user"], userGetMe, {
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
        user = userData?.data.data || null;
    }

    return {
        user,
        isLoadingUser,
        isAuthenticated,
        refreshAuthState: refetch,
    };
};

export default useUser;
