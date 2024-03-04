import SEO from "@/components/SEO";

export default function Error404() {
    return (
        <>
            <SEO title="404: Page Not Found" />

            <main className="flex flex-col items-center min-h-[97vh] p-5 bg-[#F7F8FB]">
                {/* <div className="m-auto w-full max-w-8xl"> */}

                <div className="m-auto max-w-8xl">
                    <h3 className="text-3xl text-center font-semibold">404</h3>

                    <p className="text-xl text-center font-light mt-2">Sorry, the page you are looking for does not exist.</p>
                </div>
            </main>
        </>
    );
}
