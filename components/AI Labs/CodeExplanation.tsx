"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, BookOpen, Loader, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const CodeExplanation = ({ isUserLoggedIn }: any) => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState("")
    const [explanation, setExplanation] = useState("")
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showExplanation, setShowExplanation] = useState(false)
    const [explanationLevel, setExplanationLevel] = useState('detailed')

    const programmingLanguages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'java', label: 'Java' },
        { value: 'csharp', label: 'C#' },
        { value: 'cpp', label: 'C++' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'swift', label: 'Swift' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'sql', label: 'SQL' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' }
    ];

    const explanationLevels = [
        { value: 'basic', label: 'Basic Overview' },
        { value: 'detailed', label: 'Detailed Explanation' },
        { value: 'advanced', label: 'Advanced Analysis' }
    ];

    const handleExplainCode = async () => {
        if (code.trim() === "") {
            alert("Code input should not be empty!")
            return
        };
        setLoading(true)
        setShowExplanation(false)
        try {
            const response = await axios.post("/api/lab/explain-code", {
                language,
                code,
                explanationLevel
            })
            if (response.status === 201) {
                setExplanation(response.data.response)
                setLoading(false)
                setShowExplanation(true)
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

    const handleCopyExplanation = () => {
        if (explanation.trim() === "") return;

        navigator.clipboard.writeText(explanation)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy explanation to clipboard');
            });
    }

    const handleExportExplanation = () => {
        if (explanation.trim() === "") return;

        const blob = new Blob([explanation], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `code_explanation_${new Date().getTime()}.md`;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    const formatExplanation = (text: string) => {
        return text
            .replace(/\*\*(.*?)\*\*/g, '<strong class="text-[#6C63FF]">$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/## (.*?)(\n|$)/g, '<h2 class="text-xl font-bold text-slate-800 mt-6 mb-3">$1</h2>')
            .replace(/# (.*?)(\n|$)/g, '<h1 class="text-2xl font-bold text-slate-900 mt-8 mb-4">$1</h1>')
            .replace(/`(.*?)`/g, '<code class="bg-slate-100 px-1 py-0.5 rounded text-sm font-mono">$1</code>')
            .replace(/\n/g, '<br/>');
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-14 font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
                        AI Code Explanation
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Understand complex code with AI-powered explanations. Get detailed insights into functionality, patterns, and best practices.
                    </p>
                </header>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="px-4 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200"
                                >
                                    {programmingLanguages.map(lang => (
                                        <option key={lang.value} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Explanation Depth
                                </label>
                                <select
                                    value={explanationLevel}
                                    onChange={(e) => setExplanationLevel(e.target.value)}
                                    className="px-4 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200"
                                >
                                    {explanationLevels.map(level => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {isUserLoggedIn ? (
                            <Button onClick={handleExplainCode} disabled={loading || !code}>
                                {loading ? (
                                    <Loader className='animate-spin' />
                                ) : (
                                    <span className='flex justify-center items-center gap-2'>
                                        <BookOpen className="w-5 h-5" />
                                        Explain Code
                                    </span>
                                )}
                            </Button>
                        ) : (
                            <Button disabled>
                                Login to Explain
                            </Button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden mb-8">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800">Code to Explain</h3>
                        <p className="text-sm text-slate-600 mt-1">Paste the code you want to understand</p>
                    </div>
                    <div className="h-[400px]">
                        <Editor
                            height="100%"
                            language={language}
                            value={code || "// Enter code to explain here.. \n"}
                            onChange={(value) => setCode(value || "")}
                            theme="vs-dark"
                            options={{
                                fontFamily: "Fira Code",
                                fontSize: 14,
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

                {loading && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-lg p-8 mb-8">
                        <div className="flex flex-col items-center justify-center py-12">
                            <Loader className="animate-spin w-12 h-12 text-[#6C63FF] mb-4" />
                            <p className="text-lg font-medium text-slate-700">Analyzing your code...</p>
                            <p className="text-sm text-slate-500 mt-2">This may take a few moments</p>
                        </div>
                    </div>
                )}

                {showExplanation && explanation && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden mb-8">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Code Explanation</h3>
                                <p className="text-sm text-slate-600 mt-1">AI-powered analysis of your code</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowExplanation(!showExplanation)}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors"
                                    title={showExplanation ? "Collapse explanation" : "Expand explanation"}
                                >
                                    {showExplanation ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleCopyExplanation}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleExportExplanation}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Export to file"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {showExplanation && (
                            <div className="p-6 prose prose-slate max-w-none">
                                <div
                                    className="text-slate-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: formatExplanation(explanation) }}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="text-center">
                    <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 border border-slate-200 shadow-lg">
                        <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-600">
                            Deep code understanding • Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeExplanation;