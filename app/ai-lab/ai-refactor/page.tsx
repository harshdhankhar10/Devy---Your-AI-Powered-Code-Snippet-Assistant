import React from 'react'
import AIRefactor from '@/components/AI Labs/AIRefactor'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'

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

            <AIRefactor isUserLoggedIn={isUserLoggedIn} />
        </>
    )
}

export default page;