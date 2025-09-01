"use client"

import React from 'react';
import { ArrowLeftRightIcon, LogOut, SquareActivity, WandSparkles } from "lucide-react"
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const Sidebar = () => {
    return (
        <>
            <div className="hidden md:flex w-64 bg-[#F7F7F9] text-gray-700 flex-col justify-between">
                <div>
                    <div className="flex items-center p-6 h-20 border-b border-gray-200">
                        <div className="flex items-center justify-center w-10 h-10 bg-[#6C63FF] rounded-full text-white font-bold text-xl">
                            D
                        </div>
                        <span className="ml-3 text-xl font-bold text-gray-800">Devy</span>
                    </div>

                    <nav className="mt-6 px-4">
                        <div className="space-y-2">
                            <Link
                                href="/dashboard"
                                className="flex items-center px-3 py-2.5 text-sm font-medium bg-[#E9E7FF] text-[#6C63FF] rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                    ></path>
                                </svg>
                                <span className="ml-3">Dashboard</span>
                            </Link>
                            <Link
                                href="/dashboard/snippets"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    ></path>
                                </svg>
                                <span className="ml-3">My Snippets</span>
                            </Link>
                            <Link
                                href="/dashboard/snippets/create"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    ></path>
                                </svg>
                                <span className="ml-3">New Snippet</span>
                            </Link>

                            <Link
                                href="/dashboard/lab"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                <WandSparkles className='h-5 w-5' />

                                <span className="ml-3">AI Lab</span>
                                <span className="ml-2 px-2 py-1  text-xs font-medium text-white bg-[#6C63FF] rounded-lg shadow-lg">
                                    New
                                </span>
                            </Link>
                            <Link
                                href="/dashboard/utilities"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                    ></path>
                                </svg>
                                <span className="ml-3">Utilities </span>

                            </Link>
                            <Link
                                href="/dashboard/folders"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                                    ></path>
                                </svg>
                                <span className="ml-3">Projects/Folders</span>
                            </Link>
                            <a
                                href="#"
                                className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                    ></path>
                                </svg>
                                <span className="ml-3">Shared Snippets</span>
                            </a>
                        </div>
                    </nav>
                </div>

                <div className="px-4 pb-6 pt-2 absolute bottom-0 w-64 border-t border-gray-200">
                    <div className="space-y-2">
                        <a
                            href="#"
                            className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                            </svg>
                            <span className="ml-3">Settings</span>
                        </a>
                        <Link
                            href="/dashboard/recent-activity"
                            className="flex items-center px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg"
                        >
                            <SquareActivity className='h-5 w-5' />
                            <span className="ml-3">Recent Activity</span>
                        </Link>
                        <Button onClick={() => (signOut())} className='w-full flex  justify-start' >
                            <LogOut className='h-5 w-5' />
                            <span className="ml-3">Sign Out</span>
                        </Button>
                    </div>
                </div>
            </div>
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
                <div className="flex justify-around items-center h-16">
                    <a
                        href="#"
                        className="flex flex-col items-center justify-center p-2 text-[#6C63FF]"
                    >
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
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span className="text-xs mt-1">Home</span>
                    </a>

                    <a
                        href="#"
                        className="flex flex-col items-center justify-center p-2 text-gray-600"
                    >
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
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                        </svg>
                        <span className="text-xs mt-1">Snippets</span>
                    </a>

                    <a
                        href="#"
                        className="flex flex-col items-center justify-center p-2 -mt-6"
                    >
                        <div className="bg-[#6C63FF] p-3 rounded-full text-white shadow-lg">
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
                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <span className="text-xs mt-1 text-[#6C63FF]">New</span>
                    </a>

                    <a
                        href="#"
                        className="flex flex-col items-center justify-center p-2 text-gray-600"
                    >
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
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        <span className="text-xs mt-1">AI Lab</span>
                    </a>

                    <a
                        href="#"
                        className="flex flex-col items-center justify-center p-2 text-gray-600"
                    >
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
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                        <span className="text-xs mt-1">More</span>
                    </a>
                </div>
            </div>
        </>
    );
};

export default Sidebar;