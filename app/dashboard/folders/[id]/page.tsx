import FolderSnippets from '@/components/dashboard/folders/FolderSnippets'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'

interface PageProps {
    params: {
        id: string
    }
}

const FolderSnippetsPage = async ({ params }: PageProps) => {
    const session = await getServerSession(NEXT_AUTH);
    const user = session?.user;

    if (!user) {
        return <div>Unauthorized. Please log in.</div>;
    }

    const folder = await prisma.folder.findFirst({
        where: {
            id: params.id,
            userId: user.id
        }
    });

    if (!folder) {
        return <div>Folder not found or you don't have access to it.</div>;
    }

    const folderSnippets = await prisma.folderSnippet.findMany({
        where: {
            folderId: params.id
        },
        include: {
            snippet: true
        },
        orderBy: {
            snippet: {
                createdAt: 'desc'
            }
        }
    });

    const snippetsInFolder = folderSnippets.map(fs => fs.snippet);

    const allSnippetConnections = await prisma.folderSnippet.findMany({
        where: {
            snippet: {
                userId: user.id
            }
        },
        select: {
            snippetId: true
        }
    });

    const usedSnippetIds = allSnippetConnections.map(conn => conn.snippetId);

    const allSnippets = await prisma.snippet.findMany({
        where: {
            userId: user.id,
            id: {
                notIn: usedSnippetIds
            }
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    return (
        <FolderSnippets
            allSnippets={allSnippets}
            folderId={params.id}
            snippetsInFolder={snippetsInFolder}
            folderName={folder.name}
        />
    )
}

export default FolderSnippetsPage;