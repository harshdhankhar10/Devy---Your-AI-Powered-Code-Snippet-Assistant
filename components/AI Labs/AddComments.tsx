"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Save, Check, MessageSquare, Loader, Download } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const AddComments = ({ isUserLoggedIn }: any) => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState("")
    const [commentedCode, setCommentedCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [commentStyle, setCommentStyle] = useState('standard')

    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'java', label: 'Java' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'cpp', label: 'C++' },
        { value: 'csharp', label: 'C#' }
    ];

    const commentStyles = [
        { value: 'standard', label: 'Standard Comments' },
        { value: 'detailed', label: 'Detailed Documentation' },
        { value: 'minimal', label: 'Minimal Comments' },
        { value: 'inline', label: 'Inline Comments Only' }
    ];

    const handleAddComments = async () => {
        if (code.trim() === "") {
            alert("Code input should not be empty!")
            return
        };
        setLoading(true)
        try {
            const response = await axios.post("/api/lab/add-comments", {
                language, code, commentStyle
            })
            if (response.status === 201) {
                setCommentedCode(response.data.response)
                setLoading(false)
                alert(response.data.message)
            } else {
                alert(response.data.error)
            }

        } catch (error: any) {
            alert(error.response.data.error)
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleCopyCode = () => {
        if (commentedCode.trim() === "") return;

        navigator.clipboard.writeText(commentedCode)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy code to clipboard');
            });
    }

    const handleExportCode = () => {
        if (commentedCode.trim() === "") return;

        const fileExtensionMap: Record<string, string> = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            java: 'java',
            go: 'go',
            rust: 'rs',
            cpp: 'cpp',
            csharp: 'cs'
        };

        const extension = fileExtensionMap[language] || 'txt';
        const filename = `devy_commented_code.${extension}`;

        const blob = new Blob([commentedCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    // Best practices examples for different languages
    const bestPractices = {
        javascript: `// Use JSDoc for function documentation
/**
 * Calculates the sum of two numbers
 * @param {number} a - The first number
 * @param {number} b - The second number
 * @returns {number} The sum of a and b
 */
function sum(a, b) {
    return a + b;
}

// Use inline comments to explain complex logic
const result = values.filter(x => x > 0) // Filter out negative values
                     .map(x => x * 2);   // Double each value`,

        python: `def calculate_area(radius):
    """
    Calculate the area of a circle.
    
    Args:
        radius (float): The radius of the circle.
        
    Returns:
        float: The area of the circle.
    """
    pi = 3.14159  # Approximation of pi
    return pi * radius ** 2  # Area formula: πr²`,

        java: `/**
 * Represents a point in 2D space
 */
public class Point {
    private double x; // x coordinate
    private double y; // y coordinate
    
    /**
     * Creates a new Point instance
     * @param x the x coordinate
     * @param y the y coordinate
     */
    public Point(double x, double y) {
        this.x = x;
        this.y = y;
    }
}`
    };

    const insertBestPractice = () => {
        const practice = bestPractices[language as keyof typeof bestPractices] || bestPractices.javascript;
        setCode(prev => prev + "\n\n" + practice);
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-14 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        AI Code Commenting
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Automatically add meaningful comments to your code. Improve readability and maintainability with AI-powered documentation.
                    </p>
                </header>

                <div className="bg-white rounded-md border border-slate-200 shadow-sm p-8 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 min-w-[200px]"
                                >
                                    {languages.map(lang => (
                                        <option key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Comment Style
                                </label>
                                <select
                                    value={commentStyle}
                                    onChange={(e) => setCommentStyle(e.target.value)}
                                    className="px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 min-w-[200px]"
                                >
                                    {commentStyles.map(style => (
                                        <option key={style.value} value={style.value}>
                                            {style.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={insertBestPractice}
                                className="flex items-center gap-2"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Insert Best Practice
                            </Button>

                            {isUserLoggedIn ? (
                                <Button onClick={handleAddComments} disabled={loading || !code}>
                                    {loading ? (
                                        <Loader className='animate-spin' />
                                    ) : (
                                        <span className='flex justify-center items-center gap-2'>
                                            <MessageSquare className="w-5 h-5" />
                                            Add Comments
                                        </span>
                                    )}
                                </Button>
                            ) : (
                                <Button disabled>
                                    Login to Add Comments
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Original Code</h3>
                                <p className="text-sm text-slate-600 mt-1">Paste or edit your code here</p>
                            </div>
                        </div>
                        <div className="h-[600px]">
                            <Editor
                                height="100%"
                                language={language}
                                value={code || "// Enter Code here.. \n"}
                                onChange={(value) => setCode(value || "")}
                                theme="vs-dark"
                                options={{
                                    fontFamily: "Fira Code",
                                    fontSize: 18,
                                    fontLigatures: true,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    padding: { top: 20, bottom: 20 },
                                    renderLineHighlight: 'gutter',
                                    lineNumbers: 'on',
                                    glyphMargin: false,
                                    folding: true,
                                    lineDecorationsWidth: 0,
                                    lineNumbersMinChars: 3,
                                    automaticLayout: true
                                }}
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Commented Code</h3>
                                <p className="text-sm text-slate-600 mt-1">AI-enhanced version with comments</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyCode}
                                    disabled={commentedCode.trim() === ""}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleExportCode}
                                    disabled={commentedCode.trim() === ""}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Export to file"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <div className="h-[600px]">
                            <Editor
                                height="100%"
                                language={language}
                                value={commentedCode}
                                theme="vs-dark"
                                options={{
                                    readOnly: true,
                                    fontFamily: "Fira Code",
                                    fontSize: 18,
                                    fontLigatures: true,
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    padding: { top: 20, bottom: 20 },
                                    renderLineHighlight: 'gutter',
                                    lineNumbers: 'on',
                                    glyphMargin: false,
                                    folding: true,
                                    lineDecorationsWidth: 0,
                                    lineNumbersMinChars: 3,
                                    automaticLayout: true
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 border border-slate-200 shadow-lg">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-600">
                            Ready to add comments • Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddComments;