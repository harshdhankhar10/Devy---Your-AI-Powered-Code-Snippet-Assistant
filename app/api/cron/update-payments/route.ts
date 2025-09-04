
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

        // deleting anonymous bins older than 24 hours
        let cutoffDate = new Date();
        cutoffDate.setHours(cutoffDate.getHours() - 24);

        await prisma.anonymousBin.deleteMany({
            where: {
                createdAt: {
                    lt: cutoffDate,
                },
            },
        });

        return NextResponse.json({
            success: true,
            message: "cron job executed successfully",
        });
    } catch (error) {
        console.error('Cron job error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}