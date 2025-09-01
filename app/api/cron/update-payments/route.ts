
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // make payments status to failed who are pending for more than 3 days
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        const result = await prisma.payment.updateMany({
            where: {
                status: 'PENDING',
                createdAt: {
                    lt: threeDaysAgo,
                },
            },
            data: {
                status: 'FAILED',
            },
        });

        return NextResponse.json({
            success: true,
            message: `Updated ${result.count} pending payments to failed status`,
            updatedCount: result.count,
        });
    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}