import Settings from '@/components/dashboard/Settings'
import React from 'react'
import { getServerSession } from 'next-auth'
import { NEXT_AUTH } from '@/utils/auth'

interface UserInfo {
    name: string;
    email: string;
    profilePicture?: string;
}

const page = async () => {
    const session = await getServerSession(NEXT_AUTH);
    const userInfo: UserInfo = session.user;

    return (
        <div className="p-6 bg-white rounded-lg shadow-lg max-w-3xl mx-auto">
            <Settings userInfo={userInfo} />
        </div>
    )
}

export default page
