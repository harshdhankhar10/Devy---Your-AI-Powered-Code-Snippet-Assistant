import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import CodeTranslation from '@/components/AI Labs/CodeTranslation'

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
            <CodeTranslation isUserLoggedIn={isUserLoggedIn} />

        </>
    )
}

export default page