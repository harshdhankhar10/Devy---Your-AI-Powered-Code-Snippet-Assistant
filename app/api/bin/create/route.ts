import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";



export async function POST(req: NextRequest) {
    try {
        const { title, language, code, password, burnAfterReading } = await req.json();
        let hashedPassword = null;
        if (password) {
            hashedPassword = await hash(password, 10);
        }


        let createdBin = await prisma.anonymousBin.create({
            data: {
                title, passwordHash: hashedPassword, code, language, burnAfterReading
            }
        })



        return NextResponse.json({ message: "Anonymous bin created successfully.", data: { id: createdBin.id } }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "An error occurred while creating the anonymous bin." }, { status: 500 });
    }
}