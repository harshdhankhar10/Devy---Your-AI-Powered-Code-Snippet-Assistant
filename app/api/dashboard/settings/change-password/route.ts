import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH)
        if (!session) {
            return NextResponse.json({ error: "Unauthorized!" }, { status: 400 })
        }
        let user = session?.user

        const { newPassword, oldPassword } = await req.json();

        if (newPassword.trim() === "" || oldPassword.trim() === "") {
            return NextResponse.json({ error: "All fields are required!" }, { status: 400 })
        }

        const existingUser = await prisma.user.findUnique({
            where: {
                email: user?.email
            }
        })

        if (!existingUser) {
            return NextResponse.json({ error: "User not found!" }, { status: 404 })
        }

        const isPasswordValid = await bcrypt.compare(oldPassword, existingUser.password);

        if (!isPasswordValid) {
            return NextResponse.json({ error: "Old password is incorrect!" }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: {
                email: user?.email
            },
            data: {
                password: hashedPassword
            }
        })

        return NextResponse.json({ message: "Password changed successfully!" }, { status: 200 })

    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
    }
}