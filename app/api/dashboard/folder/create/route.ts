import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";

export async function POST(req: NextRequest) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return NextResponse.json({
            error: "Not Authorized"
        }, { status: 400 })
    }
    const userId = session?.user?.id;
    const isUserExisits = await prisma.user.findFirst({
        where: { id: userId.id }
    })
    if (!isUserExisits) {
        return NextResponse.json({
            error: "User with this ID not found"
        }, { status: 400 })
    }


    try {
        const { folderName } = await req.json();

        let date = new Date()
        let timeString = `${date.getHours()}:${date.getMinutes().toString().padStart(2, "0")}`
        let dateString = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`


        await prisma.recentActivity.create({
            data: {
                userId: session.user.id,
                title: "Folder Created!",
                description: `Folder name ${folderName} was created at ${timeString} ${date.getHours() > 12 ? " PM" : " AM"} on ${dateString}`,
            }
        })

        await prisma.folder.create({
            data: {
                name: folderName,
                userId,
                isPublic: true,
                category: "N/A"
            }
        })

        return NextResponse.json({
            message: "Folder Created Successfully"
        }, {
            status: 201
        })


    } catch (error) {
        console.log(error)
        return NextResponse.json({
            errror: "Something went wrong."
        }, { status: 400 })
    }
}