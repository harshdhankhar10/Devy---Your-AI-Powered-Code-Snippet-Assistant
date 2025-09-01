
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
    try {
        const authHeader = req.headers.get('authorization');
        if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const date = new Date();

        const result = await prisma.payment.updateMany({
            where: {
                status: 'PENDING',
                createdAt: {
                    lt: date,
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