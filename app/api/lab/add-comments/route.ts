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
        const { code, language, commentStyle } = await req.json();
        let user = await prisma.user.findFirst({
            where: { id: userId }
        })
        if (!user) {
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        let totalCredits = user?.totalCredits;
        if (totalCredits === 0) {
            return NextResponse.json(
                { error: "No Credits Found. Buy Credits to Use AI Tools!" },
                { status: 400 }
            );
        }

        const prompt = `
You are a professional code documentation assistant.

Add appropriate comments to the following code based on these requirements:

Language: ${language}
Comment Style: ${commentStyle || 'standard'}

Code:
\`\`\`${language}
${code}
\`\`\`

Return ONLY the final code with comments added.
Do not include explanations or additional text. Only return the final code.
`;

        let aiResponse = await getAILabResponse(prompt);

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        function cleanCodeBlock(text: string): string {
            return text
                .replace(/```[\s\S]*?\n/, "")
                .replace(/```$/, "")
                .trim();
        }

        await prisma.recentActivity.create({
            data: {
                title: "Added Comments",
                description: `Code with comments generated on ${dateString} at ${timeString} ${date.getHours() >= 12 ? "PM" : "AM"}.`,
                userId: user?.id,
            }
        })

        await prisma.creditHistory.create({
            data: {
                userId: user?.id,
                actionType: "AI Comments Added!",
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
            message: "Comments Added Successfully!",
            response: cleanCodeBlock(aiResponse)
        }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something Went Wrong."
        }, { status: 500 })
    }
}