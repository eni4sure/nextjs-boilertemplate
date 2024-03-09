import SEO from "@/components/SEO";

export default function Error404() {
    return (
        <>
            <SEO title="404: Page Not Found" />

            <main className="flex min-h-[97vh] flex-col items-center bg-[#F7F8FB] p-5">
                {/* <div className="m-auto w-full max-w-8xl"> */}

                <div className="max-w-8xl m-auto">
                    <h3 className="text-center text-3xl font-semibold">404</h3>

                    <p className="mt-2 text-center text-xl font-light">Sorry, the page you are looking for does not exist.</p>
                </div>
            </main>
        </>
    );
}
