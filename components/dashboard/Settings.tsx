'use client'

import React, { useState } from 'react'
import { Switch } from "@/components/ui/switch"
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { XCircleIcon, Loader } from "lucide-react"
import { toast } from 'react-toastify';
import axios from 'axios';
import { signOut } from 'next-auth/react';


interface UserInfo {
    name: string;
    email: string;
    profilePicture?: string;
}

interface SettingsProps {
    userInfo: UserInfo;
}

const Settings = ({ userInfo }: SettingsProps) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleChangePassword = async () => {
        if (oldPassword.trim() === "" || newPassword.trim() === "") {
            toast.error("Please fill in all fields")
            return;
        }
        try {
            setIsLoading(true)
            const response = await axios.post("/api/dashboard/settings/change-password", {
                oldPassword, newPassword
            })
            if (response.status === 200) {
                toast.success(response.data.message)
                setIsModalOpen(false)
                await signOut()
            } else {
                toast.error(response.data.error)
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error)
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <>
            <div className="space-y-8">
                <div className="flex items-center space-x-4 p-4 border-b border-gray-200">
                    <img
                        src={userInfo.profilePicture}
                        alt="Profile Image"
                        className="w-16 h-16 rounded-full border p-1 border-[#6C63FF] object-cover"
                    />
                    <div>
                        <h2 className="text-2xl font-semibold">{userInfo.name}</h2>
                        <p className="text-gray-600 text-sm">{userInfo.email}</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="border-t pt-4">
                        <h3 className="text-xl font-semibold">Account Settings</h3>
                        <ul className="space-y-4 mt-4">
                            <li className="flex justify-between items-center">
                                <span>Change Password</span>
                                <button onClick={() => setIsModalOpen(true)} className="text-[#6C63FF] hover:underline">Edit</button>
                            </li>

                        </ul>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-xl font-semibold">Notifications</h3>
                        <ul className="space-y-4 mt-4">
                            <li className="flex justify-between items-center">
                                <span>Email Notifications</span>
                                <Switch disabled checked />
                            </li>
                            <li className="flex justify-between items-center">
                                <span>Push Notifications</span>
                                <Switch disabled checked />
                            </li>
                        </ul>
                    </div>

                    <div className="border-t pt-4">
                        <h3 className="text-xl font-semibold">Language & Region</h3>
                        <ul className="space-y-4 mt-4">
                            <li className="flex justify-between items-center">
                                <span>Language</span>
                                <span className="text-[#6C63FF] hover:underline">English</span>
                            </li>

                        </ul>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="absolute inset-0 bg-black h-full bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white rounded-lg p-8 w-96 shadow-lg space-y-6">
                        <div className='flex justify-between items-center text-center '>
                            <h3 className="text-xl font-semibold text-center text-gray-800">Update Password</h3>
                            <button onClick={() => setIsModalOpen(false)}>
                                <XCircleIcon className='text-gray-600' />
                            </button>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="oldPassword" className="text-sm font-medium text-gray-600">Old Password</label>
                            <Input
                                id="oldPassword"
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                placeholder="Enter your old password"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="newPassword" className="text-sm font-medium text-gray-600">New Password</label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                placeholder="Enter your new password"
                            />
                        </div>

                        <div className="flex justify-between items-center">
                            <Button
                                className="w-full bg-[#6C63FF] text-white py-2 rounded-md hover:bg-[#5a54e1] focus:ring-2 focus:ring-[#6C63FF]"
                                onClick={handleChangePassword}
                                disabled={isLoading}
                            >
                                {isLoading ? <Loader className='animate-spin mx-auto' /> : "Update Password"}
                            </Button>
                        </div>

                    </div>
                </div>
            )}

        </>
    )
}

export default Settings
