import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import CodeExplanation from '@/components/AI Labs/CodeExplanation'
const page = async () => {
    const session = await getServerSession(NEXT_AUTH);
    let isUserLoggedIn = false;


    if (session) {
        isUserLoggedIn = true;
    } else {
        isUserLoggedIn = false
    }

    return (
        <>
            <CodeExplanation isUserLoggedIn={isUserLoggedIn} />
        </>
    )
}

export default page