"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, FileText, Loader, Download, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const GeneratePseudocode = ({ isUserLoggedIn }: any) => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState("")
    const [pseudocode, setPseudocode] = useState("")
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showPseudocode, setShowPseudocode] = useState(false)
    const [detailLevel, setDetailLevel] = useState('balanced')

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
        { value: 'sql', label: 'SQL' }
    ];

    const detailLevels = [
        { value: 'minimal', label: 'Minimal (Algorithm Only)' },
        { value: 'balanced', label: 'Balanced (Recommended)' },
        { value: 'detailed', label: 'Detailed (Step-by-Step)' }
    ];

    const handleConvertToPseudocode = async () => {
        if (code.trim() === "") {
            alert("Code input should not be empty!")
            return
        };
        setLoading(true)
        setShowPseudocode(false)
        try {
            const response = await axios.post("/api/lab/pseudocode-converter", {
                language,
                code,
                detailLevel
            })
            if (response.status === 201) {
                setPseudocode(response.data.response)
                setLoading(false)
                setShowPseudocode(true)
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

    const handleCopyPseudocode = () => {
        if (pseudocode.trim() === "") return;

        navigator.clipboard.writeText(pseudocode)
            .then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            })
            .catch(err => {
                console.error('Failed to copy: ', err);
                alert('Failed to copy pseudocode to clipboard');
            });
    }

    const handleExportPseudocode = () => {
        if (pseudocode.trim() === "") return;

        const blob = new Blob([pseudocode], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');

        link.href = url;
        link.download = `pseudocode_${new Date().getTime()}.txt`;
        document.body.appendChild(link);
        link.click();

        setTimeout(() => {
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }, 100);
    }

    const formatPseudocode = (text: string) => {
        return text
            .replace(/FUNCTION\s+(.*?)(?=\n|$)/gi, '<div class="bg-blue-50 border-l-4 border-blue-500 pl-4 py-2 my-2 font-mono text-blue-800"><strong>FUNCTION $1</strong></div>')
            .replace(/PROCEDURE\s+(.*?)(?=\n|$)/gi, '<div class="bg-purple-50 border-l-4 border-purple-500 pl-4 py-2 my-2 font-mono text-purple-800"><strong>PROCEDURE $1</strong></div>')
            .replace(/IF.*?THEN/gi, '<span class="text-green-600 font-semibold">$&</span>')
            .replace(/ELSE|ENDIF|END FOR|END WHILE|END FUNCTION/gi, '<span class="text-red-600 font-semibold">$&</span>')
            .replace(/FOR.*?DO|WHILE.*?DO/gi, '<span class="text-orange-600 font-semibold">$&</span>')
            .replace(/\n/g, '<br/>')
            .replace(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;')
            .replace(/\t/g, '&nbsp;&nbsp;&nbsp;&nbsp;');
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-14 font-sans">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-4">
                        AI Pseudocode Converter
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Transform complex code into clear, language-agnostic pseudocode. Perfect for documentation, learning, and algorithm design.
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
                                    Detail Level
                                </label>
                                <select
                                    value={detailLevel}
                                    onChange={(e) => setDetailLevel(e.target.value)}
                                    className="px-4 py-2 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200"
                                >
                                    {detailLevels.map(level => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {isUserLoggedIn ? (
                            <Button onClick={handleConvertToPseudocode} disabled={loading || !code}>
                                {loading ? (
                                    <Loader className='animate-spin' />
                                ) : (
                                    <span className='flex justify-center items-center gap-2'>
                                        <FileText className="w-5 h-5" />
                                        Convert to Pseudocode
                                    </span>
                                )}
                            </Button>
                        ) : (
                            <Button disabled>
                                Login to Convert
                            </Button>
                        )}
                    </div>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden mb-8">
                    <div className="px-6 py-4 bg-slate-50 border-b border-slate-200">
                        <h3 className="text-lg font-bold text-slate-800">Source Code</h3>
                        <p className="text-sm text-slate-600 mt-1">Paste the code you want to convert to pseudocode</p>
                    </div>
                    <div className="h-[400px]">
                        <Editor
                            height="100%"
                            language={language}
                            value={code || "// Enter code to convert to pseudocode here.. \n"}
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
                            <p className="text-lg font-medium text-slate-700">Converting to pseudocode...</p>
                            <p className="text-sm text-slate-500 mt-2">Analyzing algorithms and structures</p>
                        </div>
                    </div>
                )}

                {showPseudocode && pseudocode && (
                    <div className="bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden mb-8">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">Generated Pseudocode</h3>
                                <p className="text-sm text-slate-600 mt-1">Language-agnostic algorithm representation</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setShowPseudocode(!showPseudocode)}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors"
                                    title={showPseudocode ? "Collapse pseudocode" : "Expand pseudocode"}
                                >
                                    {showPseudocode ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleCopyPseudocode}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleExportPseudocode}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors"
                                    title="Export to file"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {showPseudocode && (
                            <div className="p-6">
                                <div
                                    className="font-mono text-slate-800 leading-relaxed whitespace-pre-wrap bg-slate-50 p-4 rounded-lg border border-slate-200"
                                    dangerouslySetInnerHTML={{ __html: formatPseudocode(pseudocode) }}
                                />
                            </div>
                        )}
                    </div>
                )}

                <div className="text-center">
                    <div className="inline-flex items-center gap-4 bg-white rounded-2xl px-8 py-4 border border-slate-200 shadow-lg">
                        <div className="w-2 h-2 bg-[#6C63FF] rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-600">
                            Algorithm clarity • Language-agnostic • Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneratePseudocode;