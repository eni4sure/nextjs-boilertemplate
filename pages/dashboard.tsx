import type { NextPage } from "next";

// import { } from "../components"
import { withAuth, useUser } from "../utils";

const Dashboard: NextPage = () => {
    const { user } = useUser();

    return (
        <>
            <main className="flex flex-col items-center min-h-screen p-5">
                {/* <div className="m-auto w-full max-w-8xl"> */}

                <div className="m-auto max-w-8xl">
                    <h3 className="text-5xl font-semibold my-5">Dashboard 1 {user?.firstName}</h3>
                </div>
            </main>
        </>
    );
};

export default withAuth(Dashboard);
