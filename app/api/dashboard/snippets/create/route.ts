import { NextResponse, NextRequest } from "next/server";
import { NEXT_AUTH } from "@/utils/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json({ error: "Not Authorized " }, { status: 401 })
    }
    const userId = session?.user.id;
    try {
        const { title, description, language, code, tags, isPublic, allowComments } = await req.json();

        const user = await prisma.user.findFirst({
            where: { email: userId.email }
        })
        if (user?.totalCredits == 0) {
            return NextResponse.json({ error: "You have 0 Credits Left. Buy Now." }, { status: 400 })

        }
        if (!user?.isVerified) {
            return NextResponse.json({ errror: "Please verify account first!" }, { status: 400 })
        }

        await prisma.snippet.create({
            data: {
                title, description, userId, code, langugae: language,
                tags, isCommentsAllowed: allowComments, isPublic

            }
        })

        return NextResponse.json({
            message: "Snippet Saved Successfully"
        }, { status: 201 })

    } catch (error) {
        console.error("Error saving snippet: ", error);
        return NextResponse.json(
            { error: "Failed to save Snippet" },
            { status: 500 }
        );
    }
}