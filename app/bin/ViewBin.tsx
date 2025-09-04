"use client"

import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Prism } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff, Calendar, Clock, Lock, Copy, Shield, FileText, User, Globe, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Bin {
    id: string;
    title: string | null;
    code: string;
    language: string;
    passwordHash: string | null;
    burnAfterReading: boolean;
    createdAt: Date;
}

interface BinProps {
    bin: Bin | null;
    binPass: true | null;
}

const ViewBin = ({ bin, binPass }: BinProps) => {
    const [password, setPassword] = useState('');
    const [isModalOpenForPassword, setIsModalOpenForPassword] = useState(binPass || false);
    const [isLoading, setIsLoading] = useState(false);
    const [isBinVisible, setIsBinVisible] = useState(!binPass);
    const [isBinPass, setIsBinPass] = useState<true | null>(binPass);
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (binPass) {
            setIsModalOpenForPassword(true);
            setIsBinVisible(false);
        }
    }, [binPass]);

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(date);
    };

    const formatTime = (date: Date) => {
        return new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    const handleCheckPassword = async () => {
        if (!bin) return;
        setIsLoading(true);
        try {
            const response = await axios.post('/api/bin/verify-password', {
                binId: bin.id,
                password: password
            });
            if (response.data.success) {
                toast.success('Password verified successfully!');
                setIsModalOpenForPassword(false);
                setIsBinVisible(true);
                setIsBinPass(null);
            } else {
                toast.error('Incorrect password. Please try again.');
                setPassword('');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || 'An error occurred while verifying the password.');
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const handleCopyCode = () => {
        if (!bin) return;
        navigator.clipboard.writeText(bin.code);
        toast.success('Code copied to clipboard!');
    }

    if (!bin) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
                <div className="max-w-md w-full text-center">
                    <div className="flex justify-center mb-6">
                        <div className="p-3 bg-red-100 rounded-full">
                            <FileText className="h-10 w-10 text-red-600" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Bin Not Found</h1>
                    <p className="text-gray-600 mb-6">The bin you're looking for doesn't exist or may have been deleted.</p>
                    <Button onClick={() => router.push('/bin')} className="w-full">
                        Create New Bin
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <>
            {isModalOpenForPassword && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-md">

                        <h2 className="text-xl font-semibold text-gray-800 text-center mb-2">Password Required</h2>
                        <p className="text-gray-600 text-center mb-6">This bin is protected with a password.</p>

                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Enter Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter the bin password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"

                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <Button
                            onClick={handleCheckPassword}
                            disabled={isLoading || !password}
                            className="w-full"
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Verifying...
                                </>
                            ) : (
                                'Access Bin'
                            )}
                        </Button>
                    </div>
                </div>
            )}

            {isBinVisible && bin && (
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <div>
                                        <h1 className="text-2xl font-bold text-gray-800 mb-1">
                                            {bin.title || 'Untitled Bin'}
                                        </h1>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center">
                                                <Calendar className="h-4 w-4 mr-1.5" />
                                                <span>{formatDate(new Date(bin.createdAt))}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <Clock className="h-4 w-4 mr-1.5" />
                                                <span>{formatTime(new Date(bin.createdAt))}</span>
                                            </div>

                                            {bin.burnAfterReading && (
                                                <div className="flex items-center text-amber-600 font-medium">
                                                    <AlertCircle className="h-4 w-4 mr-1.5" />
                                                    <span>Burn after reading</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <Button
                                        onClick={handleCopyCode}
                                        variant="outline"
                                        className="flex items-center gap-2"
                                    >
                                        <Copy className="h-4 w-4" />
                                        Copy Code
                                    </Button>
                                </div>
                            </div>

                            <div className="px-6 py-3 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                                <div className="flex items-center">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                        {bin.language}
                                    </span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    {bin.passwordHash ? (
                                        <>
                                            <Lock className="h-4 w-4 mr-1" />
                                            <span>Protected</span>
                                        </>
                                    ) : (
                                        <>
                                            <Globe className="h-4 w-4 mr-1" />
                                            <span>Public</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div className="overflow-hidden">
                                <Prism
                                    language={bin.language.toLowerCase()}
                                    style={darcula}
                                    customStyle={{
                                        margin: 0,
                                        borderRadius: 0,
                                        padding: '1.5rem',
                                        fontSize: '14px',
                                        fontFamily: '"Fira Code", "Monaco", "Menlo", "Ubuntu Mono", monospace',
                                        lineHeight: '1.5'
                                    }}
                                    wrapLongLines={true}
                                >
                                    {bin.code}
                                </Prism>
                            </div>

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-500 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 mr-1.5" />
                                    <span>Created anonymously</span>
                                </div>
                                <div>
                                    Bin ID: {bin.id}
                                </div>
                            </div>
                        </div>
                        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
                            <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                                About Anonymous Bins
                            </h3>
                            <ul className="text-blue-700 text-sm space-y-1">
                                <li>• No account required to create or view bins</li>
                                <li>• Password protection keeps your code secure</li>
                                <li>• Burn after reading bins are deleted after first view</li>
                                <li>• All bins are automatically deleted after 24 hours</li>
                            </ul>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}


export default ViewBin;