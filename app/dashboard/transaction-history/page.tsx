import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'
import prisma from '@/lib/prisma'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Calendar, Package, IndianRupee, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'SUCCESS':
            return <CheckCircle className="h-4 w-4 text-green-500" />
        case 'FAILED':
            return <XCircle className="h-4 w-4 text-red-500" />
        case 'PENDING':
            return <Clock className="h-4 w-4 text-yellow-500" />
        default:
            return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
}

const getPackageName = (packageId: string) => {
    const packages: { [key: string]: string } = {
        'starter-pack': 'Starter Pack',
        'developer-pack': 'Developer Pack',
        'power-pack': 'Power Pack'
    }
    return packages[packageId] || packageId
}

const Page = async () => {
    const session = await getServerSession(NEXT_AUTH)
    const userId = session?.user.id

    if (!userId) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="w-full max-w-md">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>Please sign in to view your payment history</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        )
    }

    const paymentInfo = await prisma.payment.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' }
    })

    const totalSpent = paymentInfo
        .filter(payment => payment.status === 'SUCCESS')
        .reduce((sum, payment) => sum + payment.amount, 0)

    const successfulPayments = paymentInfo.filter(payment => payment.status === 'SUCCESS').length
    const failedPayments = paymentInfo.filter(payment => payment.status === 'FAILED').length
    const pendingPayments = paymentInfo.filter(payment => payment.status === 'PENDING').length

    return (
        <div className="space-y-6">
            <div className="flex flex-col space-y-2">
                <h1 className="text-3xl font-bold text-gray-900">Payment History</h1>
                <p className="text-gray-600">
                    Track all your transactions and payment activities
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalSpent}</div>
                        <p className="text-xs text-muted-foreground">
                            across {successfulPayments} successful payments
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Successful</CardTitle>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{successfulPayments}</div>
                        <p className="text-xs text-muted-foreground">
                            completed transactions
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending/Failed</CardTitle>
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{pendingPayments + failedPayments}</div>
                        <p className="text-xs text-muted-foreground">
                            {pendingPayments} pending, {failedPayments} failed
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>
                        All your payment activities in chronological order
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Package</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Credits</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Order ID</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {paymentInfo.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                        <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                        <p>No transactions found</p>
                                        <p className="text-sm">Your payment history will appear here</p>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paymentInfo.map((item) => (
                                    <TableRow key={item.id} className="hover:bg-gray-50/50">
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {formatDate(item.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <Package className="h-4 w-4 text-muted-foreground" />
                                                <span className="text-sm font-medium">
                                                    {getPackageName(item.packageId || 'N/A')}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                <IndianRupee className="h-4 w-4 text-muted-foreground" />
                                                <span className="font-medium">{item.amount}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="font-mono">
                                                {item.creditsAdded || 0} credits
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center space-x-2">
                                                {getStatusIcon(item.status)}
                                                <Badge variant="outline" className="font-mono">
                                                    {item.status}
                                                </Badge>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <p className="text-xs font-mono text-muted-foreground">
                                                {item.razorpayOrderId ? item.razorpayOrderId.slice(-8) : 'N/A'}
                                            </p>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}

export default Page