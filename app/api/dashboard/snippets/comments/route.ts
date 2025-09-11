import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { snippetId, content } = await req.json();
        if (!snippetId || !content) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        await prisma.comment.create({
            data: {
                content,
                snippetId,
                userId: session.user.id,
            }
        });
        return NextResponse.json({ message: "Comment added successfully" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}