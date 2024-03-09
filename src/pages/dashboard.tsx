import SEO from "@/components/SEO";

import useUser from "@/utilities/use-user";
import { withAuth } from "@/utilities/auth-guard";

function Dashboard() {
    const { user } = useUser();

    return (
        <>
            <SEO title="Dashboard" />

            <main className="flex min-h-screen flex-col items-center p-5">
                {/* <div className="m-auto w-full max-w-8xl"> */}

                <div className="max-w-8xl m-auto">
                    <h3 className="my-5 text-5xl font-semibold" suppressHydrationWarning>
                        Dashboard - User: {JSON.stringify(user)}
                    </h3>
                </div>
            </main>
        </>
    );
}

export default withAuth(Dashboard);
