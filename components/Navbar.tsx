"use client";
import { useState, useEffect } from 'react';
import { Code, Menu, X } from "lucide-react";
import { getSession } from 'next-auth/react';
import { Session } from 'next-auth';
import Link from 'next/link';

const Navbar = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };
        fetchSession();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: "Features", href: "#features" },
        { name: "Solutions", href: "#solutions" },
        { name: "Pricing", href: "#pricing" },
        { name: "Resources", href: "#resources" },
        { name: "Anonymous Bin", href: "/bin" }
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-1' : 'bg-white py-2'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Code className="h-6 w-6 text-[#6C63FF]" />
                        <span className="ml-2 text-xl font-semibold text-gray-900">Devy</span>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="text-gray-700 hover:text-[#6C63FF] px-1 py-2 text-sm font-medium transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                        {session ? (
                            <Link
                                href="/dashboard"
                                className="bg-[#6C63FF] hover:bg-[#5a52d6] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-gray-700 hover:text-[#6C63FF] px-1 py-2 text-sm font-medium transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="bg-[#6C63FF] hover:bg-[#5a52d6] text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200"
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 hover:text-gray-900 focus:outline-none p-2"
                        >
                            {isOpen ? (
                                <X className="h-6 w-6" />
                            ) : (
                                <Menu className="h-6 w-6" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#6C63FF] hover:bg-gray-50"
                                onClick={() => setIsOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                        {session ? (
                            <Link
                                href="/dashboard"
                                className="block px-3 py-2 rounded-md text-base font-medium bg-[#6C63FF] text-white hover:bg-[#5a52d6]"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#6C63FF] hover:bg-gray-50"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    className="block px-3 py-2 rounded-md text-base font-medium bg-[#6C63FF] text-white hover:bg-[#5a52d6]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;