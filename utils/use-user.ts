import { useQuery } from "@tanstack/react-query";
import jwtDecode, { JwtPayload } from "jwt-decode";
import { getCookie, hasCookie } from "cookies-next";

import { userGetMe } from "../http";

const useUser = () => {
    const {
        isError,
        isLoading,
        isRefetching,
        data: User,
        refetch
    } = useQuery(["auth-user"], userGetMe, {
        cacheTime: Infinity,
        staleTime: 60000 * 10 /* 10 mins */
    });

    if (isError && hasCookie("auth-token")) {
        const decodeJwt: JwtPayload = jwtDecode((getCookie("auth-token") as string) || "");
        delete decodeJwt.iat;
        delete decodeJwt.exp;

        return {
            isLoadingUser: isLoading || isRefetching,
            user: decodeJwt || null
        };
    }

    return {
        isLoadingUser: isLoading || isRefetching,
        user: User?.data.data || null,
        refreshAuthState: refetch
    };
};

export default useUser;
