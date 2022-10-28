import React from "react";
import Head from "next/head";
import "../styles/globals.css";
import { ToastContainer } from "react-toastify";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import type { AppProps } from "next/app";

function App({ Component, pageProps }: AppProps) {
    const [queryClient] = React.useState(() => new QueryClient({ defaultOptions: { queries: { retry: false, refetchOnWindowFocus: false } } }));

    return (
        <>
            <Head>
                <title>nextjs-typescript-starter-with-tailwind</title>

                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="title" content="nextjs-typescript-starter-with-tailwind" />
                <meta name="description" content="This is nextjs-typescript-starter-with-tailwind built with NextJS, Typescript and TailwindCSS" />

                <link rel="icon" href="https://nextjs-typescript-starter-with-tailwind.com/assets/logo/icon.png" />

                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nextjs-typescript-starter-with-tailwind.com/" />
                <meta property="og:title" content="nextjs-typescript-starter-with-tailwind" />
                <meta property="og:description" content="This is nextjs-typescript-starter-with-tailwind built with NextJS, Typescript and TailwindCSS" />
                <meta property="og:image" content="https://nextjs-typescript-starter-with-tailwind.com/assets/site-metaimage.png" />

                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://nextjs-typescript-starter-with-tailwind.com/" />
                <meta property="twitter:title" content="nextjs-typescript-starter-with-tailwind" />
                <meta property="twitter:description" content="This is nextjs-typescript-starter-with-tailwind built with NextJS, Typescript and TailwindCSS" />
                <meta property="twitter:image" content="https://nextjs-typescript-starter-with-tailwind.com/assets/site-metaimage.png" />
            </Head>

            <ToastContainer newestOnTop={true} pauseOnHover={false} autoClose={3000} />

            <QueryClientProvider client={queryClient}>
                <Component {...pageProps} />

                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </>
    );
}

export default App;
