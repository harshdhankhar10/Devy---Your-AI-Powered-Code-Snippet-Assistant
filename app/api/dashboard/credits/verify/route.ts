import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import prisma from "@/lib/prisma";
import crypto from "crypto";


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, paymentId } = await req.json();

        if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !paymentId) {
            return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
        }

        const key_secret = process.env.RAZORPAY_SECRET as string;
        const body = razorpay_order_id + "|" + razorpay_payment_id;

        const expectedSignature = crypto
            .createHmac("sha256", key_secret)
            .update(body)
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
        }

        // Get payment record
        const payment = await prisma.payment.findUnique({
            where: { id: paymentId },
            include: { user: true },
        });

        if (!payment) {
            return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }

        if (payment.user.email !== session.user.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        if (payment.status === 'SUCCESS') {
            return NextResponse.json({
                message: 'Payment already verified',
                credits: payment.creditsAdded
            });
        }

        await prisma.$transaction(async (tx) => {

            const updatedPayment = await tx.payment.update({
                where: { id: paymentId },
                data: {
                    status: 'SUCCESS',
                    razorpayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                },
            });

            await tx.user.update({
                where: { id: payment.userId },
                data: {
                    totalCredits: {
                        increment: updatedPayment.creditsAdded || 0,
                    },
                },
            });
        });

        const updatedUser = await prisma.user.findUnique({
            where: { id: payment.userId },
            select: { totalCredits: true }
        });

        return NextResponse.json({
            message: 'Payment verified successfully',
            credits: updatedUser?.totalCredits
        });

    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
