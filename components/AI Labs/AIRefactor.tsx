"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Save, Check, WandSparkles, Loader, Download } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const AIRefactor = ({ isUserLoggedIn }: any) => {
    const [refactorType, setRefactorType] = useState('readability');
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState("")
    const [refactoredCode, setRefactoredCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'python', label: 'Python' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'java', label: 'Java' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' }
    ];

    const handleRefactorCode = async () => {
        if (code.trim() === "") return;
        setLoading(true)
        try {
            const response = await axios.post("/api/lab/ai-refactor", {
                language, code, refactorType
            })
            if (response.status === 201) {
                setRefactoredCode(response.data.response)
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
        if (refactoredCode.trim() === "") return;

        navigator.clipboard.writeText(refactoredCode)
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
        if (refactoredCode.trim() === "") return;

        const fileExtensionMap: Record<string, string> = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            java: 'java',
            go: 'go',
            rust: 'rs'
        };

        const extension = fileExtensionMap[language] || 'txt';
        const filename = `refactored-code.${extension}`;

        const blob = new Blob([refactoredCode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();

        // Clean up
        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-14 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="text-center mb-12">

                    <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        AI Code Refactor
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Transform your code with intelligent refactoring powered by AI. Enhance readability, performance, and modern syntax patterns.
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
                                    Refactor Type
                                </label>
                                <div className="flex items-center bg-slate-100 rounded-xl p-1">
                                    {['performance', 'readability', 'modern syntax'].map((type) => (
                                        <button
                                            key={type}
                                            onClick={() => setRefactorType(type)}
                                            className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 capitalize min-w-[120px] ${refactorType === type
                                                ? 'bg-white text-[#6C63FF] shadow-md'
                                                : 'text-slate-600 hover:text-slate-800'
                                                }`}
                                        >
                                            {type}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {isUserLoggedIn ? (<Button onClick={handleRefactorCode} disabled={loading}>
                            {loading ? (<Loader className='animate-spin' />) : (<span className='flex justify-center items-center gap-2'>
                                <WandSparkles className="w-5 h-5" />
                                Refactor Code
                            </span>)}
                        </Button>) : (<Button disabled>
                            Login to Refactor
                        </Button>)}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                            <h3 className="text-lg font-bold text-slate-800">Original Code</h3>
                            <p className="text-sm text-slate-600 mt-1">Paste or edit your code here</p>
                        </div>
                        <div className="h-[600px]">
                            <Editor
                                height="100%"
                                language={language}
                                value={code}
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
                                <h3 className="text-lg font-bold text-slate-800">Refactored Code</h3>
                                <p className="text-sm text-slate-600 mt-1">AI-enhanced version</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyCode}
                                    disabled={refactoredCode.trim() === ""}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleExportCode}
                                    disabled={refactoredCode.trim() === ""}
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
                                value={refactoredCode}
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
                            Ready to refactor • Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AIRefactor;