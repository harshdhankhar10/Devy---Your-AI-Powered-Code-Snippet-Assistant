import React from 'react'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

const CreditsHistory = async () => {
    let session = await getServerSession(NEXT_AUTH);
    let user = await prisma.user.findFirst({
        where: { id: session.user.id }
    })

    let creditsHistory = await prisma.creditHistory.findMany({
        where: { userId: user?.id },
        orderBy: {
            createdAt: 'desc'
        }
    })



    return (
        <>
            <div className='flex justify-between items-center '>
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Credits History</h1>
                    <p className="text-slate-600 mt-2">
                        Track your tools usage and credit consumption.
                    </p>
                </div>
                <Link href="/dashboard/buy-credits">
                    <Button>
                        <PlusCircleIcon />  Buy Credits
                    </Button>
                </Link>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-slate-600">Date</TableHead>
                        <TableHead className="text-slate-600">Title & Description</TableHead>
                        <TableHead className="text-right text-slate-600">Credits Used</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {creditsHistory.map((item, index) => (
                        <TableRow key={index} className="hover:bg-slate-50">
                            <TableCell className="text-slate-600">
                                {new Date(item.createdAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium text-slate-900">{item.actionType || "Snippet Created!"}</p>

                                </div>
                            </TableCell>
                            <TableCell className="text-right">
                                <span className="bg-red-200 rounded-full px-4 py-0.5 text-red-700 text-md ">
                                    -{item.creditUsed}
                                </span>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

        </>
    )
}

export default CreditsHistory