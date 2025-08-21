import AllSnippets from '@/components/dashboard/snippets/AllSnippets'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'

const SnippetsPage = async () => {
    const session = await getServerSession(NEXT_AUTH)
    const userId = session?.user.id

    const snippets = await prisma.snippet.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            title: true,
            description: true,
            langugae: true,
            tags: true,
            views: true,
            isPublic: true,
            createdAt: true,
            updatedAt: true
        }
    })

    return <AllSnippets snippets={JSON.parse(JSON.stringify(snippets))} />
}

export default SnippetsPage