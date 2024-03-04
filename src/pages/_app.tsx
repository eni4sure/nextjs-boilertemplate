import React from "react";
import "@/styles/globals.css";
import { ToastContainer } from "react-toastify";
import { NextRouter, useRouter } from "next/router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";
import { handleHTTPResponse } from "@/utilities/handle-http-error-response";

export default function App({ Component, pageProps }: AppProps) {
    const router: NextRouter = useRouter();

    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } },
                mutationCache: new MutationCache({
                    onError: async (error) => {
                        await handleHTTPResponse(error, router);
                    },
                }),
                queryCache: new QueryCache({
                    onError: async (error) => {
                        await handleHTTPResponse(error, router);
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
