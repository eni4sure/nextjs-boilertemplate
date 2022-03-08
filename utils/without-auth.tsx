import React from "react";
import { getCookie } from "cookies-next";
import { NextRouter, useRouter } from "next/router";

const withoutAuth = (WrappedComponent: React.FC) => {
	const NewComponent = () => {
		const router: NextRouter = useRouter();
		const authToken = getCookie("auth-token");

		if (authToken) {
			router.replace("/dashboard");
			return <></>;
		}

		return <WrappedComponent />;
	};

	return NewComponent;
};

export default withoutAuth;
