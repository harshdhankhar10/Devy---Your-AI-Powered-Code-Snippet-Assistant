import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hash } from "bcryptjs";


export async function POST(req: NextRequest) {
    try {
        const { email, password, name, username } = await req.json();
        if (!email || !password) {
            return NextResponse.json({ error: "Email or Password Missing" }, { status: 400 });
        }

        const existingUser = await prisma.user.findFirst({
            where: { email }
        })
        if (existingUser) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 409 });
        }

        const existingUsername = await prisma.user.findFirst({
            where: { username }
        })
        if (existingUsername) {
            return NextResponse.json({ error: "User with this username already exists" }, { status: 409 });
        }

        const hashedPassword = await hash(password, 10);

        await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
                username

            }
        })

        return NextResponse.json({ message: "Account Created Successfully" }, { status: 200 });




    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}