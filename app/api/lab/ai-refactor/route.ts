import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { NEXT_AUTH } from "@/utils/auth";
import { getServerSession } from "next-auth";
import getAILabResponse from "@/utils/getAILabReponse";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json({ error: "Not Authorized " }, { status: 401 })
    }
    const userId = session.user.id;
    try {
        const { code, refactorType, language } = await req.json();
        let user = await prisma.user.findFirst({
            where: { id: userId }
        })
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }


        let totalCredits = user?.totalCredits;
        if (totalCredits === 0) {
            return NextResponse.json(
                { error: "No Credits Found. Buy Credits to User AI Tools!" },
                { status: 400 }
            );
        }

        const prompt = `
You are a professional code refactoring assistant.

Refactor the following code strictly based on the given requirements:

Language: ${language}
Refactor Type: ${refactorType}

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY the refactored code .
Do not include explanations or comments.Only Straightformwad final refactored code
`;


        let aiResponse = await getAILabResponse(prompt);

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`

        function cleanCodeBlock(text: string): string {
            return text
                .replace(/```[\s\S]*?\n/, "")
                .replace(/```$/, "")
                .trim();
        }

        await prisma.recentActivity.create({
            data: {
                title: "AI Code Refactor",
                description: `Refactored Code created on ${dateString} at ${timeString} ${date.getHours() >= 12 ? "PM" : "AM"}.`,
                userId: user?.id,

            }
        })

        await prisma.creditHistory.create({
            data: {
                userId: user?.id,
                actionType: "AI Code Refactored!",
                creditUsed: 1,

            }
        })

        await prisma.user.update({
            where: { id: user?.id },
            data: {
                totalCredits: totalCredits! - 1
            }
        })



        return NextResponse.json({
            message: "Code Refactored Successfully!", response: cleanCodeBlock(aiResponse)
        }, { status: 201 })


    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something Went Wrong."
        }, { status: 400 })
    }
}