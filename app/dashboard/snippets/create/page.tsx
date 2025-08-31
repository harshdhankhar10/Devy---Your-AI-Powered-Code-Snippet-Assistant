
import React, { use } from 'react'
import NewSnippet from './CreateSnippet'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import CreditStatusCard from '@/components/dashboard/CreditStatusCard'

const page = async () => {
    const session = await getServerSession(NEXT_AUTH)
    const userId = session?.user?.id;
    let user = await prisma.user.findFirst({
        where: { id: userId }
    })
    return (
        <>
            {user?.totalCredits! > 0 ? (<NewSnippet />) : (<CreditStatusCard />)}
        </>
    )
}

export default page