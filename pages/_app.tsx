import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } }));

    return (
        <>
            <Head>
                <title>nextjs-tailwind-typescript-starter</title>

                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="title" content="nextjs-tailwind-typescript-starter" />
                <meta name="description" content="This is nextjs-tailwind-typescript-starter built with NextJS, Typescript and TailwindCSS" />

                <link rel="icon" href="https://nextjs-tailwind-typescript-starter.com.com/assets/logo/logo-icon.png" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nextjs-tailwind-typescript-starter.com/" />
                <meta property="og:title" content="nextjs-tailwind-typescript-starter" />
                <meta property="og:description" content="This is nextjs-tailwind-typescript-starter built with NextJS, Typescript and TailwindCSS" />
                <meta property="og:image" content="https://nextjs-tailwind-typescript-starter.com/assets/site-preview.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://nextjs-tailwind-typescript-starter.com/" />
                <meta property="twitter:title" content="nextjs-tailwind-typescript-starter" />
                <meta property="twitter:description" content="This is nextjs-tailwind-typescript-starter built with NextJS, Typescript and TailwindCSS" />
                <meta property="twitter:image" content="https://nextjs-tailwind-typescript-starter.com/assets/site-preview.png" />
            </Head>

            <ToastContainer newestOnTop={true} pauseOnHover={false} autoClose={3000} />

            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />

                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default MyApp;
