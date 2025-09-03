import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        const user = session?.user;

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { snippetIds, folderId, folderName } = await req.json();

        if (!snippetIds || !folderId) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const folder = await prisma.folder.findFirst({
            where: {
                id: folderId,
                userId: user.id
            }
        });

        if (!folder) {
            return NextResponse.json({ error: 'Folder not found' }, { status: 404 });
        }

        const existingConnections = await prisma.folderSnippet.findMany({
            where: {
                folderId: folderId,
                snippetId: { in: snippetIds }
            }
        });

        const existingSnippetIds = existingConnections.map(conn => conn.snippetId);
        const newSnippetIds = snippetIds.filter((id: string) => !existingSnippetIds.includes(id));

        if (newSnippetIds.length === 0) {
            return NextResponse.json({ error: 'All snippets are already in this folder' }, { status: 400 });
        }

        const snippets = await prisma.snippet.findMany({
            where: {
                id: { in: newSnippetIds },
                userId: user.id
            }
        });

        if (snippets.length === 0) {
            return NextResponse.json({ error: 'No valid snippets found' }, { status: 404 });
        }

        await prisma.folderSnippet.createMany({
            data: snippets.map(snippet => ({
                folderId: folderId,
                snippetId: snippet.id
            }))
        });

        await prisma.recentActivity.createMany({
            data: snippets.map(snippet => ({
                userId: user.id,
                title: "Added Snippet to Folder",
                description: `Added snippet "${snippet.title}" to folder "${folderName}"`
            }))
        });

        return NextResponse.json({
            message: 'Snippets added to folder',
            count: snippets.length
        }, { status: 200 });

    } catch (error: any) {
        console.error('Error adding snippets to folder:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}