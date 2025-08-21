"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Eye, EyeOff, Lock, Mail, User, Shield, Heart, Sparkles, Loader, RefreshCcw, HomeIcon } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [captchaInput, setCaptchaInput] = useState('');
    const [captchaText, setCaptchaText] = useState('');
    const router = useRouter();

    const generateCaptcha = () => {
        const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCaptchaText(result);
        setCaptchaInput('');
    };

    useEffect(() => {
        generateCaptcha();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!email || !password || !name || !username) {
            setError('Please fill in all required fields');
            return;
        }

        if (!agreeToTerms) {
            setError('You must agree to the terms and conditions');
            return;
        }

        if (captchaInput !== captchaText) {
            setError('Please enter the correct captcha');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("/api/auth/register", {
                email,
                password,
                name,
                username
            });

            if (response.status === 200) {
                setMessage(response.data.message || 'Account created successfully!');
                setTimeout(() => {
                    router.push("/login");
                }, 2000);
            }
        } catch (error: any) {
            console.error(error);
            setError(error.response?.data?.error || "An error occurred during registration");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 overflow-hidden relative">


            <div className="w-full max-w-5xl bg-white/90 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                    <div className="w-full lg:w-2/5 bg-gradient-to-br from-purple-600 to-indigo-700 p-10 text-white flex flex-col justify-center">
                        <div className="absolute top-4 left-4">
                            <Link
                                href="/"
                                className="flex items-center justify-center h-10 w-10 border border-white/30 rounded-full shadow-md text-gray-800 backdrop-blur-sm bg-white/10 hover:bg-white/20 transition-all duration-300"
                            >
                                <HomeIcon className='text-white' />
                            </Link>
                        </div>
                        <div className="mb-8">
                            <h1 className="text-4xl font-bold mb-2">Devy</h1>
                            <p className="text-xl font-light opacity-90">Write Better, Smarter Code With Devy</p>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-white/10 rounded-full">
                                    <Shield className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">AI-Powered Refactoring</h3>
                                    <p className="text-sm opacity-80">Automatically improve your code quality</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-white/10 rounded-full">
                                    <Heart className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Instant Code Generation</h3>
                                    <p className="text-sm opacity-80">Generate production-ready code snippets</p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="p-2 bg-white/10 rounded-full">
                                    <Sparkles className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">Version Control & Sharing</h3>
                                    <p className="text-sm opacity-80">Track all changes to your snippets</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-10 text-sm opacity-80">
                            <p>Ready to transform your development workflow?</p>
                        </div>
                    </div>

                    <div className="w-full lg:w-3/5 p-10">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-900">Create Your Account</h2>
                            <p className="text-gray-600 mt-2">
                                Devy provides all the tools modern development teams need.
                            </p>
                        </div>

                        {error && (
                            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">
                                {error}
                            </div>
                        )}

                        {message && (
                            <div className="mb-6 p-4 bg-green-50 text-green-600 rounded-xl border border-green-200">
                                {message}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-800">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="name"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your name"
                                            required
                                            className='pl-10'
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-800">
                                        Username
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <Input
                                            id="username"
                                            type="text"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="username"
                                            className='pl-10'
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-800">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                        className="pl-10"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-800">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Create a password"
                                        className="pl-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors p-1"
                                    >
                                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label htmlFor="captcha" className="block text-sm font-medium text-gray-800">
                                    Verify you're human
                                </label>
                                <div className="flex gap-4">

                                    <div className="flex-1">

                                        <Input
                                            type="text"
                                            id="captcha"
                                            value={captchaInput}
                                            onChange={(e) => setCaptchaInput(e.target.value)}
                                            placeholder="Enter the code"
                                            required
                                        />
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-32 h-12 bg-gradient-to-r from-purple-100 to-indigo-100 border border-gray-300 rounded-xl flex items-center justify-center font-mono text-xl font-bold text-gray-800 tracking-wider select-none">
                                            {captchaText}
                                        </div>
                                        <button
                                            type="button"
                                            onClick={generateCaptcha}
                                            className="p-2 text-gray-600 hover:text-purple-600 transition-colors"
                                        >
                                            <RefreshCcw className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-start space-x-3">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={agreeToTerms}
                                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                                    className="mt-1 h-4 w-4 text-purple-600 bg-white border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
                                />
                                <label htmlFor="terms" className="text-sm text-gray-600 leading-snug">
                                    I agree to the{' '}
                                    <Link href="/terms" className="text-purple-600 hover:text-purple-500 transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link href="/privacy" className="text-purple-600 hover:text-purple-500 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-[#6C63FF] hover:bg-[#5a52d6] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 h-12 disabled:opacity-70 disabled:cursor-not-allowed"
                                disabled={loading || !agreeToTerms}
                            >
                                {loading ? (
                                    <Loader className="h-5 w-5 animate-spin" />
                                ) : (
                                    "Create Account"
                                )}
                            </button>
                        </form>

                        <div className="mt-6 text-center text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link href="/login" className="text-purple-600 font-medium hover:text-purple-500 transition-colors">
                                Sign in
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;