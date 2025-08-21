"use client"
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Copy, Check } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

const HeroSection = () => {
    const [copied, setCopied] = useState(false);

    const codeString = `function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}
`;

    const handleCopy = () => {
        navigator.clipboard.writeText(codeString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="bg-gradient-to-br from-gray-900 to-gray-800 px-6 py-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl"></div>

            <div className="max-w-7xl mt-12 mx-auto text-center relative z-10">
                <div className="mb-16">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-500">
                            Write Better, Smarter Code
                        </span>
                        <span className="block text-gray-200">With Devy</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed">
                        Store, refactor, and reuse your favorite code with one powerful assistant — built for developers.

                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg group shadow-lg hover:shadow-xl transition-all duration-300">
                            Start Coding Smarter
                            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                        </Button>
                        <Button variant="outline" className=" hover:text-white px-8 py-6 text-lg border border-gray-700 hover:bg-gray-800/50 transition-all duration-300 group">
                            <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                            Watch Demo
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
                    {[
                        { value: "50K+", label: "Developers" },
                        { value: "2M+", label: "Snippets" },
                        { value: "500+", label: "Companies" },
                        { value: "99.9%", label: "Uptime" }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                            <div className="text-sm text-gray-400">{stat.label}</div>
                        </div>
                    ))}
                </div>

                <div className="max-w-5xl mx-auto">
                    <div className="bg-gray-900 rounded-2xl p-6 text-left shadow-2xl border border-gray-800 relative overflow-hidden">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-gray-400 text-sm">debounce.js </span>

                                <button
                                    onClick={handleCopy}
                                    className="text-gray-400 hover:text-white transition-colors duration-200 flex items-center"
                                >
                                    {copied ? (
                                        <Check className="h-4 w-4 text-green-500" />
                                    ) : (
                                        <Copy className="h-4 w-4" />
                                    )}
                                    <span className="ml-1 text-xs">
                                        {copied ? "Copied!" : "Copy"}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <SyntaxHighlighter
                            language="javascript"
                            style={atomDark}
                            customStyle={{
                                background: 'transparent',
                                padding: 0,
                                margin: 0,
                                fontSize: '0.9rem',
                                lineHeight: '1.5'
                            }}
                            wrapLines={true}
                            showLineNumbers={true}
                            lineNumberStyle={{
                                color: '#6b7280',
                                paddingRight: '1.5em'
                            }}
                        >
                            {codeString}
                        </SyntaxHighlighter>

                        <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-400 text-sm">Performance Utility
                                </span>
                                <div className="flex items-center space-x-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-gray-400 text-xs">Vanilla JavaScript</span>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {['Frontend Friendly', 'Production Ready', 'Tested', 'Reusable'].map((tag, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-800 text-gray-300 px-3 py-1 rounded-full text-xs border border-gray-700"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-600/10 to-transparent rounded-full blur-2xl"></div>
                    </div>
                </div>

                <div className="mt-16 text-gray-400 text-sm max-w-2xl mx-auto">
                    Trusted by engineering teams at <span className="text-white">Stripe</span>, <span className="text-white">Shopify</span>, and <span className="text-white">Netflix</span> to accelerate development workflows and maintain code quality at scale.
                </div>
            </div>
        </section>
    );
};

export default HeroSection;