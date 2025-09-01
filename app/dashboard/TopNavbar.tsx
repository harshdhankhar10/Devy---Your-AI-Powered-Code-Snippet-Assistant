
import { CreditCard } from 'lucide-react';
import React from 'react';
import { getServerSession } from 'next-auth';
import { NEXT_AUTH } from '@/utils/auth';
import prisma from '@/lib/prisma';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"



const TopNavbar = async () => {
    const session = await getServerSession(NEXT_AUTH);
    let userInfo = session?.user;
    const user = await prisma.user.findFirst({
        where: { email: userInfo.email }
    })
    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6">
            <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-800">Welcome back, {userInfo?.name}!</h2>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative hidden md:block">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <svg
                            className="w-5 h-5 text-gray-400"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </span>
                    <input
                        type="text"
                        placeholder="Search snippets..."
                        className="w-64 py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:bg-white focus:border-[#6C63FF]"
                    />
                </div>

                <Link href="/dashboard/credits-history">
                    <Button >
                        <CreditCard />
                        {user?.totalCredits} Credits
                    </Button>
                </Link>

                <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 hover:text-gray-700 focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </button>

                <div className="relative">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="flex items-center space-x-2 focus:outline-none">
                                <img
                                    className="w-10 h-10 rounded-full border-2 p-1 border-[#6C63FF] "
                                    src={userInfo?.profilePicture}
                                    alt="User Avatar"
                                />

                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 mr-8 mt-2" align="start">

                            <DropdownMenuGroup>
                                <DropdownMenuItem>
                                    Profile
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Billing
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Settings
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    Recent Activity
                                </DropdownMenuItem>
                            </DropdownMenuGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;