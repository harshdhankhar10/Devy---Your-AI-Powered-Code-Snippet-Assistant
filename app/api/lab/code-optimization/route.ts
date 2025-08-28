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
        const { code, language, optimizationType } = await req.json();
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

        const optimizationFocus = {
            performance: "Focus on execution speed, algorithm efficiency, and reducing time complexity. Optimize loops, recursive functions, and expensive operations.",
            memory: "Focus on reducing memory usage, eliminating memory leaks, and optimizing data structures. Suggest more memory-efficient alternatives.",
            readability: "Focus on code clarity, maintainability, and clean code principles while preserving functionality. Improve naming, structure, and documentation.",
            comprehensive: "Provide a balanced optimization addressing performance, memory usage, and readability aspects comprehensively."
        };

        const prompt = `
You are an expert code optimization assistant. Analyze and optimize the following code for ${optimizationType} optimization.

${optimizationFocus[optimizationType as keyof typeof optimizationFocus]}

Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide the optimized code followed by a brief analysis of the changes made and their benefits.

Format your response as:
OPTIMIZED CODE:
\`\`\`${language}
[optimized code here]
\`\`\`

ANALYSIS:
[brief analysis of optimizations here]`;

        let aiResponse = await getAILabResponse(prompt);

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        let optimizedCode = aiResponse;
        let analysis = "";

        const codeBlockRegex = /```[\s\S]*?\n([\s\S]*?)```/;
        const analysisRegex = /ANALYSIS:\s*([\s\S]*)$/i;

        const codeMatch = aiResponse.match(codeBlockRegex);
        if (codeMatch) {
            optimizedCode = codeMatch[1].trim();
        }

        const analysisMatch = aiResponse.match(analysisRegex);
        if (analysisMatch) {
            analysis = analysisMatch[1].trim();
        }

        if (optimizedCode === aiResponse) {
            optimizedCode = optimizedCode
                .replace(/```[\s\S]*?\n/, "")
                .replace(/```$/, "")
                .replace(/ANALYSIS:[\s\S]*$/i, "")
                .trim();
        }

        await prisma.recentActivity.create({
            data: {
                title: "Code Optimization",
                description: `Optimized ${language} code for ${optimizationType} on ${dateString} at ${timeString}`,
                userId: user?.id,
            }
        })

        await prisma.creditHistory.create({
            data: {
                userId: user?.id,
                actionType: "AI Code Optimization",
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
            message: "Code Optimized Successfully!",
            response: optimizedCode,
            analysis: analysis || "Optimization completed. Review the changes for performance improvements."
        }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something Went Wrong."
        }, { status: 500 })
    }
}