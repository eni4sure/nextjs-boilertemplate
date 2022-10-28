import { useQuery } from "@tanstack/react-query";

import { userGetMe } from "../http";

const useUser = () => {
    const {
        isLoading,
        isRefetching,
        data: User
    } = useQuery(["auth-user"], userGetMe, {
        cacheTime: Infinity,
        staleTime: 60000 * 10 /* 10 mins */
    });

    return {
        isLoadingUser: isLoading || isRefetching,
        user: User?.data.data || null
    };
};

export default useUser;
