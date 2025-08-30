"use client"
import { useState } from 'react';
import { Copy, Check, Play, Code, Zap, Brain, Shield, Sparkles, BookOpen, Languages, Bug, Lock } from "lucide-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Link from 'next/link';


type TabKey = "refactor" | "explain" | "translate";


const DevyHero = () => {
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState<TabKey>('refactor');

    const codeExamples = {
        refactor: `// Original code
function calculate(items) {
  let t = 0;
  for (let i = 0; i < items.length; i++) {
    t += items[i].price * items[i].quantity;
  }
  return t;
}

// Refactored with Devy
function calculateTotal(items) {
  return items.reduce((total, item) => 
    total + (item.price * item.quantity), 0);
}`,

        explain: `// Complex code snippet
const result = data
  .filter(x => x.active)
  .map(x => ({ 
    ...x, 
    fullName: x.firstName + ' ' + x.lastName 
  }))
  .sort((a, b) => a.createdAt - b.createdAt);

// Devy explanation:
// This code filters active users, creates fullName 
// by combining first and last names, then sorts 
// by creation date in ascending order.`,

        translate: `// Python code
def factorial(n):
    if n == 0:
        return 1
    else:
        return n * factorial(n-1)

// Translated to JavaScript by Devy
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}`
    };

    const features = [
        {
            icon: <Zap className="h-5 w-5" />,
            title: "Refactor & Modernize",
            description: "Transform legacy code into modern, clean and maintainable code"
        },
        {
            icon: <BookOpen className="h-5 w-5" />,
            title: "Explain Code",
            description: "Get plain English explanations of complex code snippets"
        },
        {
            icon: <Languages className="h-5 w-5" />,
            title: "Translate Between Languages",
            description: "Convert code between programming languages with ease"
        },
        {
            icon: <Sparkles className="h-5 w-5" />,
            title: "Optimize Performance",
            description: "Improve code efficiency and reduce memory usage"
        },
        {
            icon: <Bug className="h-5 w-5" />,
            title: "Bug Fixing",
            description: "Identify and fix bugs in your code automatically"
        },
        {
            icon: <Lock className="h-5 w-5" />,
            title: "Security Review",
            description: "Detect security vulnerabilities and get fixes"
        }
    ];

    const handleCopy = () => {
        navigator.clipboard.writeText(codeExamples[activeTab]);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };



    return (
        <div className="min-h-screen bg-white py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className=" rounded-2xl p-6 shadow-sm">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            AI-Powered Snippet Assistant
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Refactor, explain, translate, and optimize your code with Devy's intelligent AI assistance.
                        </p>

                        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                            <div className="flex justify-between items-center bg-gray-100 px-4 py-2">
                                <div className="flex space-x-2">
                                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                                </div>

                                <div className="flex space-x-4 font-medium">
                                    <button
                                        className={`px-3 py-1  rounded-lg text-sm ${activeTab === 'refactor' ? 'bg-[#6C63FF] text-white' : 'text-gray-600 hover:text-[#6C63FF]'}`}
                                        onClick={() => setActiveTab('refactor')}
                                    >
                                        Refactor
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'explain' ? 'bg-[#6C63FF] text-white' : 'text-gray-600 hover:text-[#6C63FF]'}`}
                                        onClick={() => setActiveTab('explain')}
                                    >
                                        Explain
                                    </button>
                                    <button
                                        className={`px-3 py-1 rounded-lg text-sm ${activeTab === 'translate' ? 'bg-[#6C63FF] text-white' : 'text-gray-600 hover:text-[#6C63FF]'}`}
                                        onClick={() => setActiveTab('translate')}
                                    >
                                        Translate
                                    </button>
                                </div>
                            </div>


                            <div className="font-mono text-sm text-gray-100 bg-[#0b1020]  overflow-x-auto shadow-xl">
                                <SyntaxHighlighter
                                    language="javascript"
                                    style={vscDarkPlus}

                                    customStyle={{
                                        padding: '12px 8px',
                                        margin: 0,
                                        background: "transparent",
                                        lineHeight: '1.6',
                                        borderRadius: "0.75rem",
                                        fontSize: "1em"
                                    }}
                                    wrapLines={true}
                                    showLineNumbers={true}
                                    lineNumberStyle={{
                                        color: '#9ca3af',
                                        paddingRight: '1.5em'
                                    }}
                                >
                                    {codeExamples[activeTab]}
                                </SyntaxHighlighter>
                            </div>

                            <div className="flex justify-between items-center bg-gray-50 px-4 py-3">
                                <span className="text-xs text-gray-500">JavaScript</span>
                                <button
                                    onClick={handleCopy}
                                    className="flex items-center text-xs text-gray-500 hover:text-[#6C63FF]"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-4 w-4 mr-1 text-green-500" />
                                            Copied!
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-4 w-4 mr-1" />
                                            Copy Code
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex space-x-4">
                            <Link href="/signup">
                                <button className="flex items-center bg-[#6C63FF] text-white px-6 py-3 rounded-lg hover:bg-[#5851dd] transition-colors">
                                    <Sparkles className="h-5 w-5 mr-2" />
                                    Try Devy AI
                                </button>
                            </Link>
                            <Link href="/login">
                                <button className="flex items-center border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-[#6C63FF] transition-colors">
                                    <Play className="h-5 w-5 mr-2" />
                                    Watch Demo
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center">
                        <h2 className="text-2xl font-bold text-gray-900 mb-8">Why Developers Love Devy</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:border-[#6C63FF] transition-colors">
                                    <div className="bg-[#6C63FF] bg-opacity-10 p-2 rounded-lg w-fit text-[#6C63FF] mb-3">
                                        {feature.icon}
                                    </div>
                                    <h3 className="font-bold text-[#6C63FF] mb-2">{feature.title}</h3>
                                    <p className="text-md text-gray-600">{feature.description}</p>
                                </div>
                            ))}
                        </div>


                    </div>
                </div>
            </div>
        </div >
    );
};

export default DevyHero;