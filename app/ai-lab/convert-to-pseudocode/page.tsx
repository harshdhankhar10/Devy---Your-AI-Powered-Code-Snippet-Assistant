import GeneratePseudocode from '@/components/AI Labs/GeneratePseudocode'
import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'


const page = async () => {
    const session = await getServerSession(NEXT_AUTH);
    let isUserLoggedIn = false;


    if (session) {
        isUserLoggedIn = true;
    } else {
        isUserLoggedIn = false
    }

    return (
        <>
            <GeneratePseudocode isUserLoggedIn={isUserLoggedIn} />
        </>
    )
}

export default page