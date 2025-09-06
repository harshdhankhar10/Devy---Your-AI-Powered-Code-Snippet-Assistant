import React from 'react'
import AllFolders from '@/components/dashboard/folders/AllFolders'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'

const page = async () => {
    const session = await getServerSession(NEXT_AUTH);
    const userId = session?.user?.id;
    const folders = await prisma.folder.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        include: { folderSnippets: true }
    })
    return (
        <>
            <AllFolders folders={folders} />
        </>
    )
}

export default page