import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'


const RecentActivity = async () => {
    let session = await getServerSession(NEXT_AUTH);
    let user = await prisma.user.findFirst({
        where: { id: session.user.id }
    })

    let recentActivity = await prisma.recentActivity.findMany({
        where: { userId: user?.id },
        orderBy: { createdAt: 'desc' }
    })

    return (
        <>
            <div>
                <h1 className="text-3xl font-bold text-slate-900">Recent Activity</h1>
                <p className="text-slate-600 mt-2">
                    Track all your recent actions and changes in the platform
                </p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-slate-600">Date & Time</TableHead>
                        <TableHead className="text-slate-600">Activity</TableHead>
                        <TableHead className="text-slate-600">Description</TableHead>
                        <TableHead className="text-right text-slate-600">Type</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {recentActivity.map((item, index) => {
                        return (
                            <TableRow key={item.id} className="hover:bg-slate-50">
                                <TableCell className="text-slate-600">
                                    <div className="space-y-1">
                                        <p className="text-sm font-medium">
                                            {new Date(item.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </p>
                                        <p className="text-xs text-slate-500">{ }</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-3">
                                        <div>
                                            <p className="font-medium text-slate-900">{item.title}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className="text-sm text-slate-600">{item.description}</p>
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.title}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </>
    )
}

export default RecentActivity