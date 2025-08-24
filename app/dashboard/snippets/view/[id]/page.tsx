import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import SnippetView from '@/app/dashboard/SnippetView'


export default async function SnippetPage({
    params,
}: any) {

    const session = await getServerSession(NEXT_AUTH)
    const userId = session?.user.id

    const snippet = await prisma.snippet.findUnique({
        where: {
            id: params.id,
            userId: userId,
        },
        include: {
            user: {
                select: {
                    name: true,
                    profilePicture: true,
                },
            },
        },
    })

    if (!snippet) {
        return (
            <div className="p-8 text-center">
                Snippet not found or you don't have access
            </div>
        )
    }

    await prisma.snippet.update({
        where: { id: params.id },
        data: { views: { increment: 1 } },
    })

    return <SnippetView snippet={JSON.parse(JSON.stringify(snippet))} />
}
