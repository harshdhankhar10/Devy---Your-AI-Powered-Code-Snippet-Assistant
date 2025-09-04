import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from 'bcryptjs';


export async function POST(request: NextRequest) {
    try {
        const { binId, password } = await request.json();

        if (!binId || !password) {
            return NextResponse.json({ success: false, message: 'Bin ID and password are required.' }, { status: 400 });
        }
        const bin = await prisma.anonymousBin.findUnique({
            where: { id: binId }
        });

        if (!bin || !bin.passwordHash) {
            return NextResponse.json({ success: false, message: 'Bin not found or does not have a password.' }, { status: 404 });
        }

        const isPasswordValid = await bcrypt.compare(password, bin.passwordHash);
        if (!isPasswordValid) {
            return NextResponse.json({ success: false, message: 'Invalid password.' }, { status: 401 });
        }

        if (bin.burnAfterReading) {
            await prisma.anonymousBin.delete({
                where: { id: binId }
            });
        }

        return NextResponse.json({ success: true, message: 'Password verified successfully.' });
    } catch (error) {
        console.error('Error verifying password:', error);
        return NextResponse.json({ success: false, message: 'An error occurred while verifying the password.' }, { status: 500 });
    }
}