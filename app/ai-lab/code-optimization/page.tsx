import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'
import CodeOptimization from '@/components/AI Labs/CodeOptimization'

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

            <CodeOptimization isUserLoggedIn={isUserLoggedIn} />
        </>
    )
}

export default page;