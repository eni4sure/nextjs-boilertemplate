import SEO from "@/components/SEO";

import useUser from "@/utilities/use-user";
import { withAuth } from "@/utilities/auth-guard";

function Dashboard() {
    const { user } = useUser();

    return (
        <>
            <SEO title="Dashboard" />

            <main className="flex flex-col items-center min-h-screen p-5">
                {/* <div className="m-auto w-full max-w-8xl"> */}

                <div className="m-auto max-w-8xl">
                    <h3 className="text-5xl font-semibold my-5" suppressHydrationWarning>Dashboard - User: {JSON.stringify(user)}</h3>
                </div>
            </main>
        </>
    );
}

export default withAuth(Dashboard);
