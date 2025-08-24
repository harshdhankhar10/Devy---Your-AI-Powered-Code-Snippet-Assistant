"use client"

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, HomeIcon, Loader, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import axios from 'axios';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp"


const VerifyAccount = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('')
    const [otp, setOtp] = useState("")
    const [isModelOpen, setIsModelOpen] = useState(false)
    const router = useRouter();



    const handleSendCode = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!email) {
            setError("Please fill in all fields");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.post("/api/auth/verify-account", { email })
            if (response.status === 201) {
                setMessage(response.data.message)
                setTimeout(() => (
                    setIsModelOpen(true)
                ), 2000)
            }
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async () => {
        setLoading(true)
        try {
            const response = await axios.patch("/api/auth/verify-account", { email, otp })
            if (response.status === 201) {
                setMessage(response.data.message)
                setTimeout(() => {
                    setIsModelOpen(false)
                    router.push("/login")
                }, 2000)
            }
        } catch (error: any) {
            console.log(error);
            setError(error.response.data.error);
        } finally {
            setLoading(false)
        }
    }

    const handleSignInWithGoogle = async () => {
        try {
            setLoading(true);
            const response = await signIn("google", {
                redirect: false,
                callbackUrl: "/"
            });

            if (response?.error) {
                if (response.error.includes("GoogleAccountNotRegistered")) {
                    setError("This Google account isn't registered with us.");
                }
            }
        } catch (error) {
            console.log(error);
            setError("Failed to sign in with Google");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 overflow-hidden relative">


                <div className="w-full max-w-md p-8 rounded-xl shadow-xl bg-white/90 backdrop-blur-md border border-white/50 transition-all duration-500 ease-in-out">
                    <div className="text-center">
                        <div className="absolute top-4 left-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center h-10 w-10 border border-white/30 rounded-full shadow-md text-gray-800 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300"
                            >
                                <HomeIcon className='text-[#6C63FF]' />
                            </Link>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-wide">Verify Account</h1>
                        {error ? (
                            <p className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">{error}</p>
                        ) : (
                            <p className="mt-2 text-sm text-gray-600">
                                Verify your Account to Access Dashboard
                            </p>
                        )}
                        {message && (
                            <div className="my-4 p-4 bg-green-50 text-green-600 rounded-xl border border-green-200">
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="mt-8 space-y-4">
                        <Button
                            onClick={handleSignInWithGoogle}
                            className="w-full flex items-center justify-center h-12 border border-gray-300 rounded-xl shadow-sm text-gray-800 bg-white hover:bg-gray-50 transition-all duration-300 hover:shadow-md"
                            disabled={loading}
                        >
                            <svg className="w-6 h-6" viewBox="0 0 48 48">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.591,44,30.134,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                            </svg>
                            <span className="ml-4 text-sm font-medium text-gray-700">
                                Verify with Google
                            </span>
                        </Button>
                    </div>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 flex-shrink text-sm text-gray-500">
                            Or verify using email
                        </span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <form onSubmit={handleSendCode} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-800 mb-2">
                                Email address
                            </label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email to verify"
                            />
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-[#6C63FF] hover:bg-[#5f57f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 h-12 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                "Verify"
                            )}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Not a member?{" "}
                            <Link
                                href="/signup"
                                className="font-medium text-[#6C63FF]  transition-colors"
                            >
                                Sign up now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {isModelOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in-0 duration-300"
                >
                    <div
                        className="relative w-full max-w-md p-8 bg-white rounded-2xl shadow-2xl animate-in fade-in-90 slide-in-from-bottom-10 duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={() => setIsModelOpen(false)}
                            className="absolute top-4 right-4 flex items-center justify-center w-8 h-8 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors"
                            aria-label="Close modal"
                        >
                            <X size={20} />
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-slate-900">Verify Your Account</h2>
                            <p className="mt-2 text-sm text-slate-600">
                                Enter the 6-digit code we sent to your email address.
                            </p>
                        </div>
                        {error ? (
                            <p className="my-2 text-sm text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">{error}</p>
                        ) : (
                            <p className="mt-2 text-sm text-gray-600">

                            </p>
                        )}
                        {message && (
                            <div className="flex justify-center items-center my-4 p-4 bg-green-50 text-green-600 rounded-xl border border-green-200">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSendCode} className="space-y-6">
                            <div className="flex justify-center">
                                <InputOTP
                                    maxLength={6}
                                    value={otp}
                                    onChange={(value) => setOtp(value)}
                                >
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                onClick={handleVerifyCode}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-[#6C63FF] hover:bg-[#5f57f1] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6C63FF] transition-all duration-300 h-12 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <Loader className="w-5 h-5 animate-spin" />
                                ) : (
                                    "Verify and Continue"
                                )}
                            </Button>
                        </form>
                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-500">
                                Didn't receive the code?{' '}
                                <button onClick={handleSendCode} className="font-medium text-[#6C63FF] hover:underline">
                                    Resend
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VerifyAccount;