import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { sendMail } from "@/utils/mail";

let otp = Math.floor(100000 + Math.random() * 900000).toString();
let otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

let otpData = {
    otp,
    expiry: otpExpiry.toISOString(),
}

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();
        if (!email) {
            return NextResponse.json({ error: "Email is required" }, { status: 400 });
        }

        const isEmailExists = await prisma.user.findUnique({
            where: { email }
        })

        if (!isEmailExists) {
            return NextResponse.json({ error: "Email Not Exists. Use another Email." }, { status: 400 });
        }

        if (isEmailExists.isVerified) {
            return NextResponse.json({ message: "Account Already Verified." }, { status: 201 })
        }

        const subject = "OTP for Account Verification  - Devy";
        const to = email;
        const htmlContent = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; background-color: #F3F4F6; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 16px; box-shadow: 0 8px 32px rgba(0, 0, 0, 0.05); padding: 40px;">
            
            <h2 style="color: #111827; text-align: center; font-size: 24px; letter-spacing: 0.5px;">
                Welcome to <span style="color: #6C63FF;">Devy</span>!
            </h2>
            
            <p style="font-size: 16px; color: #374151; text-align: center; line-height: 1.6; margin-bottom: 30px;">
                You're just one step away from supercharging your productivity.<br>
                Use the code below to verify your account and start managing your code snippets intelligently.
            </p>
            
            <div style="background-color: #F3F4F6; border: 1px solid #E5E7EB; border-radius: 12px; text-align: center; padding: 24px 0; margin: 32px 0;">
                <p style="font-size: 16px; font-weight: 600; color: #4B5563; margin: 0; letter-spacing: 0.5px;">Your Verification Code</p>
                <p style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #6C63FF; margin: 12px 0;">${otp}</p>
            </div>
            
            <p style="font-size: 14px; color: #6B7280; text-align: center;">
                This code will expire in 10 minutes. For your security, please do not share it with anyone.
            </p>
            
            <div style="margin-top: 36px; text-align: center;">
                <a href="https://devy.dev" target="_blank" style="background-color: #6C63FF; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 10px; font-weight: 600; font-size: 16px; display: inline-block; box-shadow: 0 4px 12px rgba(108, 99, 255, 0.2);">
                    Go to Your Dashboard
                </a>
            </div>
            
            <hr style="margin: 40px 0; border: none; border-top: 1px solid #E5E7EB;" />
            
            <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
                If you did not request this email, you can safely ignore it.
            </p>
            <p style="font-size: 12px; color: #9CA3AF; text-align: center;">
                &copy; ${new Date().getFullYear()} Devy. All rights reserved.
            </p>
            
        </div>
    </div>
        `

        await sendMail({ to, subject, htmlContent })
        return NextResponse.json({ message: "We have sent you an OTP to verify your account" }, { status: 201 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Error sending email"
        }, { status: 404 })
    }
}

export async function PATCH(req: NextRequest) {
    try {
        const { email, otp } = await req.json();
        if (!email || !otp) {
            return NextResponse.json({
                error: "OTP Required"
            }, { status: 404 })
        }
        const currentTime = new Date();

        if (email === email && otpData.otp === otp) {
            const expiryTime = new Date(otpData.expiry);
            if (currentTime < expiryTime) {
                await prisma.user.update({
                    where: { email },
                    data: { isVerified: true },
                });
                return NextResponse.json({ message: "Your account has been verified successfully" }, { status: 201 });
            } else {
                return NextResponse.json({ error: "The OTP You entered has expired" }, { status: 400 });
            }
        } else {
            return NextResponse.json({ error: "Your OTP is incorrect" }, { status: 400 });
        }

    } catch (error) {
        console.error("Error verifying OTP:", error);
        return NextResponse.json({ error: "Error verifying OTP" }, { status: 500 });
    }
}