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
        const { code, language, detailLevel } = await req.json();
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

        const detailInstructions = {
            minimal: `Convert to minimal pseudocode focusing only on the core algorithm. 
            Use the most concise notation possible. Omit variable declarations, type information, 
            and minor implementation details. Focus on the essential logic flow.`,

            balanced: `Convert to clear, readable pseudocode that balances detail and conciseness.
            Include key variable names, control structures, and algorithm steps. 
            Use standard pseudocode conventions: 
            - Use ← for assignment
            - Use CAPITALIZED keywords (IF, THEN, ELSE, FOR, WHILE, FUNCTION, RETURN)
            - Use indentation for scope
            - Include parameter types and return types for functions`,

            detailed: `Convert to detailed, step-by-step pseudocode that could be implemented in any language.
            Include all variables, data structures, error handling, and edge cases.
            Use verbose descriptions and comments where helpful.
            Follow academic pseudocode standards with precise notation.`
        };

        const prompt = `
You are an expert algorithm analyst and pseudocode specialist. Convert the following code into clear, language-agnostic pseudocode.

${detailInstructions[detailLevel as keyof typeof detailInstructions]}

Follow these pseudocode conventions:
1. Use descriptive, meaningful names
2. Use standard algorithmic constructs (IF-THEN-ELSE, FOR, WHILE, FUNCTION)
3. Focus on the logic, not language-specific syntax
4. Use indentation to show scope and hierarchy
5. Include comments for complex operations
6. Use ← for assignment operations
7. Specify input/output parameters for procedures

Original Language: ${language}

Code:
\`\`\`${language}
${code}
\`\`\`

Provide ONLY the pseudocode output without any additional explanations, headers, or commentary.
Use proper formatting with indentation and clear structure.`;

        let aiResponse = await getAILabResponse(prompt);

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`

        const cleanPseudocode = aiResponse
            .replace(/```[\s\S]*?\n/, "")
            .replace(/```$/, "")
            .replace(/pseudocode|Pseudocode|PSEUDOCODE:?/gi, "")
            .replace(/Here(?:'s| is) the (?:pseudocode|converted code):?/i, "")
            .trim();

        await prisma.recentActivity.create({
            data: {
                title: "Pseudocode Conversion",
                description: `Converted ${language} code to pseudocode (${detailLevel} detail) on ${dateString} at ${timeString}`,
                userId: user?.id,
            }
        })

        await prisma.creditHistory.create({
            data: {
                userId: user?.id,
                actionType: "AI Pseudocode Conversion",
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
            message: "Pseudocode Generated Successfully!",
            response: cleanPseudocode
        }, { status: 201 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something Went Wrong."
        }, { status: 500 })
    }
}