import React from 'react'
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCards from "@/components/StartupCards";

const UserStartups = async ({ id }) => {
    const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });

    return (
        <>
            {startups.length > 0 ? (
                startups.map((startup) => (
                    <StartupCards key={startup._id} post={startup} />
                ))
            ) : (
                <p className="no-result">No startups yet</p>
            )}
        </>
    );
}

export default UserStartups
