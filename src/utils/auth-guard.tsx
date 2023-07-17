import React from "react";
import Router from "next/router";
import { hasCookie } from "cookies-next";
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
        // If the access-token doesn't exist, redirect to /login
        if (!hasCookie("access-token", context)) {
            return Redirect(context, `/auth/login?next=${context.asPath}`);
        }

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
        // If the access-token exist
        if (hasCookie("access-token", context)) {
            // If the there's a pending next route, go there.
            if (context.query && context.query.next) {
                return Redirect(context, `${context.query.next}`);
            }

            // Go to dashboard
            return Redirect(context, "/dashboard");
        }

        return { query: context.query };
    };

    return WithoutAuthLogic;
};
