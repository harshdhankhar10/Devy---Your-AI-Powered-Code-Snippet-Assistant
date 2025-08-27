import { NextResponse, NextRequest } from "next/server";
import { NEXT_AUTH } from "@/utils/auth";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json({ error: "Not Authorized " }, { status: 401 })
    }
    const userId = session?.user.id;
    try {
        const { title, description, language, code, tags, isPublic, allowComments } = await req.json();

        let user = await prisma.user.findFirst({
            where: { email: userId.email }
        })
        console.log(user)
        if (user?.totalCredits == 0) {
            return NextResponse.json({ error: "You have 0 Credits Left. Buy Now." }, { status: 400 })

        }
        if (!user?.isVerified) {
            return NextResponse.json({ error: "Please verify account first!" }, { status: 400 })
        }
        let totalCredits = user.totalCredits;
        if (totalCredits === 0) {
            return NextResponse.json(
                { error: "No Credits Found. Buy Credits to Save Snippet!" },
                { status: 400 }
            );
        }

        await prisma.snippet.create({
            data: {
                title, description, userId, code, langugae: language,
                tags, isCommentsAllowed: allowComments, isPublic

            }
        })

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`


        await prisma.recentActivity.create({
            data: {
                userId: user.id,
                title: "Snippet Created!",
                description: `A new snippet was created at ${timeString} ${date.getHours() > 12 ? "PM" : "AM"}  on ${dateString}`,
            }
        })
        await prisma.creditHistory.create({
            data: {
                userId: user.id,
                actionType: "Snippet Created!",
                creditUsed: 1
            }
        })

        await prisma.user.update({
            where: { id: userId },
            data: {
                totalCredits: totalCredits - 1
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