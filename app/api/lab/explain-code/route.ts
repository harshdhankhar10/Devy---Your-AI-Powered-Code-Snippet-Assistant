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
        const { code, language, explanationLevel } = await req.json();
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

        const explanationDepth = {
            basic: "Provide a high-level overview of what the code does. Focus on the main purpose and functionality.",
            detailed: "Provide a comprehensive explanation covering functionality, key components, data flow, and important patterns. Include examples if helpful.",
            advanced: "Provide an in-depth technical analysis including algorithm complexity, potential edge cases, optimization opportunities, security considerations, and best practices."
        };

        const prompt = `
You are an expert code explanation assistant. Analyze and explain the following code with ${explanationLevel} detail.

${explanationDepth[explanationLevel as keyof typeof explanationDepth]}

Consider these aspects:
1. **Overall Purpose**: What does this code accomplish?
2. **Key Components**: Break down major functions, classes, or modules
3. **Data Flow**: How does data move through the system?
4. **Algorithm & Logic**: Explain the core algorithms or business logic
5. **Patterns & Practices**: Identify design patterns and coding practices used
6. **Potential Issues**: Note any bugs, inefficiencies, or anti-patterns
7. **Dependencies**: Mention any external dependencies or requirements

Format your explanation using markdown with clear headings and bullet points. Use **bold** for important concepts and \`code\` for code references.

Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide a thorough, well-structured explanation that would help both beginners and experienced developers understand this code.`;

        let aiResponse = await getAILabResponse(prompt);

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        await prisma.recentActivity.create({
            data: {
                title: "Code Explanation",
                description: `Generated ${explanationLevel} explanation for ${language} code on ${dateString} at ${timeString}`,
                userId: user?.id,
            }
        })

        await prisma.creditHistory.create({
            data: {
                userId: user?.id,
                actionType: "AI Code Explanation",
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
            message: "Code Explanation Generated Successfully!",
            response: aiResponse
        }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something Went Wrong."
        }, { status: 500 })
    }
}