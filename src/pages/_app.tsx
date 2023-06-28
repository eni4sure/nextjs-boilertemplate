import React from "react";
import axios from "axios";
import "@/styles/globals.css";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { NextRouter, useRouter } from "next/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function App({ Component, pageProps }: AppProps) {
    const router: NextRouter = useRouter();

    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
                queryCache: new QueryCache({
                    onError: async (error) => {
                        // check if the error is an axios error
                        if (axios.isAxiosError(error)) {
                            if (error.response && error.response.status === 401) {
                                if (error.response.data.message === "-middleware/user-not-found") {
                                    router.replace("/logout");
                                }

                                if (error.response.data.message === "-middleware/user-email-not-verified") {
                                    if (router.pathname !== "/dashboard/verify-email") router.replace("/dashboard/verify-email");
                                }

                                if (error.response.data.message === "-middleware/user-deactivated") {
                                    if (router.pathname !== "/dashboard/deactivated") router.replace("/dashboard/deactivated");
                                }

                                if (error.response.data.message === "-middleware/user-not-authorized") {
                                    if (router.pathname !== "/dashboard/unauthorized") router.replace("/dashboard/unauthorized");
                                }
                            }
                        }
                    },
                }),
            })
    );

    return (
        <>
            <ToastContainer newestOnTop={true} pauseOnHover={false} autoClose={3000} />

            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />

                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}
