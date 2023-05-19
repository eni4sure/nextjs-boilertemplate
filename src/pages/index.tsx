// import { } from "@/utils";
import { SEO } from "@/components";

export default function Home() {
    return (
        <>
            <SEO title="Home" />

            <main className="flex flex-col items-center min-h-screen p-5">
                {/* <div className="m-auto w-full max-w-8xl"> */}
                <div className="m-auto max-w-8xl">
                    <h3 className="text-5xl font-semibold my-5">Home</h3>
                </div>
            </main>
        </>
    );
}
