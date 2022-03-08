import React from "react";
import { useQuery } from "react-query";
import { getCookie } from "cookies-next";
import type { AxiosResponse } from "axios";
import jwtDecode, { JwtPayload } from "jwt-decode";

import { userGetMe } from "../api";

const useUser = () => {
	const [userData, setUserData] = React.useState<null | object | any>(null);

	const { isLoading, isError } = useQuery("auth-user", userGetMe, {
		onSuccess: (response: AxiosResponse) => setUserData(response.data.data),
		onError: () => {
			const decodeJwt: JwtPayload = jwtDecode((getCookie("auth-token") as string) || "");
			delete decodeJwt.iat;
			delete decodeJwt.exp;
			setUserData(decodeJwt);
		},
	});

	return {
		isLoading,
		user: userData,
		isError,
	};
};

export default useUser;
