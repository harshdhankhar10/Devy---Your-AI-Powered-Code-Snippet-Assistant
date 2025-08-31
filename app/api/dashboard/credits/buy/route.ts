import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";


const key_id = process.env.RAZORPAY_KEY_ID as string;
const key_secret = process.env.RAZORPAY_SECRET as string;

if (!key_id || !key_secret) {
    throw new Error("Razorpay keys are missing");
}

const razorpay = new Razorpay({
    key_id,
    key_secret
})

export type OrderBody = {
    amount: number;
    currency: string;
    packageId: string;
}

const CREDIT_PACKAGES = {
    'starter-pack': {
        id: 'starter-pack',
        name: 'Starter Pack',
        price: 24900, // in paise (249 * 100)
        credits: 50,
    },
    'developer-pack': {
        id: 'developer-pack',
        name: 'Developer Pack',
        price: 49900, // in paise (499 * 100)
        credits: 120, // 100 + 20 bonus
    },
    'power-pack': {
        id: 'power-pack',
        name: 'Power Pack',
        price: 99900, // in paise (999 * 100)
        credits: 300, // 250 + 50 bonus
    }
};


export async function POST(req: NextRequest) {
    try {
        const session = await getServerSession(NEXT_AUTH);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { amount, packageId }: OrderBody = await req.json();
        if (!amount) {
            return NextResponse.json({ message: `Amount is required` }, { status: 400 })
        }

        if (!packageId || !CREDIT_PACKAGES[packageId as keyof typeof CREDIT_PACKAGES]) {
            return NextResponse.json({ error: 'Invalid package' }, { status: 400 });
        }

        const packageData = CREDIT_PACKAGES[packageId as keyof typeof CREDIT_PACKAGES];

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });



        const options = {
            amount: packageData.price,
            currency: "INR",
            receipt: `receipt_${Date.now()}`,
        }

        const order = await razorpay.orders.create(options);

        const payment = await prisma.payment.create({
            data: {
                userId: user!.id,
                amount: packageData.price / 100, // Store in rupees
                razorpayOrderId: order.id,
                creditsAdded: packageData.credits,
                packageId: packageId,
            },
        });



        return NextResponse.json({
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
            paymentId: payment.id,
            package: packageData,
        }, { status: 200 });



    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Server Error", error }, { status: 500 })
    }
}
