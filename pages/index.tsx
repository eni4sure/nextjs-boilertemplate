import React from "react";
import type { NextPage } from "next";

import { Loading } from "../components";
import { useUser, withAuth } from "../utils";

const Home: NextPage = () => {
    return (
        <>
            <h1 className="text-5xl text-center underline">nextjs-tailwind-typescript-starter</h1>

            <Loading isParent={false} />
        </>
    );
};

export default Home;
