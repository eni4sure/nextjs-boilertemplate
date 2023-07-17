import React from "react";
import Router from "next/router";
import { getCookie } from "cookies-next";
import { NextPage, NextPageContext } from "next";

// Custom function to handle Redirect during getInitialProps
export const Redirect = (context: NextPageContext, target: string) => {
    if (context.res) {
        // If this is server, return a temp redirect code with new location
        context.res.writeHead(307, { Location: target });
        context.res.end();
    } else {
        // In the browser, we just replace the route
        Router.replace(target);
    }

    return {};
};

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithAuthLogic: NextPage<P, {}> = (props) => {
        // Add additional props or modify existing props
        const modifiedProps = {
            ...props,
        };

        // Return the wrapped component with modified props
        return <WrappedComponent {...modifiedProps} />;
    };

    WithAuthLogic.getInitialProps = async (context: NextPageContext) => {
        const accessToken = getCookie("access-token", context);

        // If the access-token doesn't exist, redirect to /login with the current route as the next route parameter.
        if (!accessToken) return Redirect(context, `/auth/login?next=${context.asPath}`);

        return { query: context.query };
    };

    return WithAuthLogic;
};

export const withoutAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
    const WithoutAuthLogic: NextPage<P, {}> = (props) => {
        // Add additional props or modify existing props
        const modifiedProps = {
            ...props,
        };

        // Return the wrapped component with modified props
        return <WrappedComponent {...modifiedProps} />;
    };

    WithoutAuthLogic.getInitialProps = async (context: NextPageContext) => {
        const accessToken = getCookie("access-token", context);

        if (!accessToken) return { query: context.query };

        // If the access-token exist and there's a pending next route, go there.
        if (context.query && context.query.next) {
            return Redirect(context, `${context.query.next}`);
        }

        // otherwise, redirect to /dashboard
        return Redirect(context, "/dashboard");
    };

    return WithoutAuthLogic;
};
