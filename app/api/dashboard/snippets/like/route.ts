import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const user = session.user;

        const { snippetId } = await req.json();
        if (!snippetId || typeof snippetId !== "string") {
            return NextResponse.json({ error: "Invalid snippet ID" }, { status: 400 });
        }

        const snippet = await prisma.snippet.findUnique({
            where: { id: snippetId },
        });

        if (!snippet) {
            return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
        }

        const existingLike = await prisma.like.findFirst({
            where: { userId: user.id, snippetId },
        });

        // if like already exists, we remove it (unlike)
        if (existingLike) {
            await prisma.like.delete({
                where: { id: existingLike.id },
            });
            return NextResponse.json({ message: "Snippet unliked" }, { status: 200 });
        } else {
            await prisma.like.create({
                data: {
                    userId: user.id,
                    snippetId,
                },
            });
            return NextResponse.json({ message: "Snippet liked" }, { status: 200 });
        }


    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
