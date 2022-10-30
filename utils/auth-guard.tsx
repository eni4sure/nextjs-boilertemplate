import React from "react";
import Router from "next/router";
import { hasCookie } from "cookies-next";
import type { NextPage, NextPageContext } from "next";

// Custom function to handle Redirect during getInitialProps
export const Redirect = (context: any, target: string) => {
    if (context.res) {
        // If this is server, return a temp redirect code with new location
        context.res.writeHead(302, { Location: target });
        context.res.end();
    } else {
        // In the browser, we just replace the route
        Router.replace(target);
    }

    return { props: {} };
};

export const withAuth = <T extends object>(WrappedComponent: NextPage<T>) => {
    return class AuthenticatedPage extends React.Component<T> {
        static async getInitialProps(context: NextPageContext) {
            // If the auth-token doesn't exist, redirect to /login
            if (!hasCookie("auth-token", context)) {
                Redirect(context, `/auth/login?next=${context.asPath}`);
            }

            return { query: context.query };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};

export const withoutAuth = <T extends object>(WrappedComponent: NextPage<T>) => {
    return class UnAuthenticatedPage extends React.Component<T> {
        static async getInitialProps(context: NextPageContext) {
            // If the auth-token exist
            if (hasCookie("auth-token", context)) {
                // If the there's a pending next route, go there.
                if (context.query && context.query.next) {
                    Redirect(context, `${context.query.next}`);
                }

                // Go to dashboard
                Redirect(context, "/dashboard");
            }

            return { query: context.query };
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
};
