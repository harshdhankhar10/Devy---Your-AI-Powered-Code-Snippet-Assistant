import React from 'react'
import prisma from '@/lib/prisma'
import ViewBin from '@/app/bin/ViewBin'
import Navbar from '@/components/Navbar'

const page = async ({ params }: any) => {
    let bin = await prisma.anonymousBin.findUnique({
        where: { id: params.id }
    })

    let binPass = bin?.passwordHash ? true : null;
    return (
        <>
            <ViewBin bin={bin} binPass={binPass} />
        </>
    )
}

export default page