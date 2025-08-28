import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { NEXT_AUTH } from "@/utils/auth";
import { getServerSession } from "next-auth";
import getAILabResponse from "@/utils/getAILabReponse";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json({ error: "Not Authorized" }, { status: 401 })
    }
    const userId = session.user.id;
    try {
        const { code, sourceLanguage, targetLanguage } = await req.json();
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
You are an expert code translation assistant. Translate the following code from ${sourceLanguage} to ${targetLanguage}.

Maintain the exact same functionality, behavior, and logic. Use idiomatic patterns and best practices for the target language.

Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}

Code:
\`\`\`${sourceLanguage}
${code}
\`\`\`

Return ONLY the translated code without any explanations, comments about the translation, or additional text.
Ensure the code is complete and functional.`;

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
                title: "Code Translation",
                description: `Translated code from ${sourceLanguage} to ${targetLanguage} on ${dateString} at ${timeString}`,
                userId: user?.id,
            }
        })

        await prisma.creditHistory.create({
            data: {
                userId: user?.id,
                actionType: "AI Code Translation",
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
            message: "Code Translated Successfully!",
            response: cleanCodeBlock(aiResponse)
        }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something Went Wrong."
        }, { status: 500 })
    }
}