import DashboardHomepage from '@/components/dashboard/DashboardHomepage'
import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'

const page = async () => {
    const session = await getServerSession(NEXT_AUTH)

    const userInfo = session?.user;

    const snippets = await prisma.snippet.count({
        where: {
            userId: userInfo?.id
        }
    })

    const folders = await prisma.folder.count({
        where: {
            userId: userInfo?.id
        }
    })

    const recentActivities = await prisma.recentActivity.findMany({
        where: {
            userId: userInfo?.id
        }
    })


    return (
        <>
            <DashboardHomepage
                snippets={snippets}
                folders={folders}
                recentActivities={recentActivities}
            />
        </>
    )
}

export default page