"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, Languages, Loader, Download, ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const CodeTranslation = ({ isUserLoggedIn }: any) => {
    const [sourceLanguage, setSourceLanguage] = useState('javascript');
    const [targetLanguage, setTargetLanguage] = useState('python');
    const [code, setCode] = useState("")
    const [translatedCode, setTranslatedCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)

    const programmingLanguages = [
        { value: 'javascript', label: 'JavaScript', extension: 'js' },
        { value: 'typescript', label: 'TypeScript', extension: 'ts' },
        { value: 'python', label: 'Python', extension: 'py' },
        { value: 'java', label: 'Java', extension: 'java' },
        { value: 'csharp', label: 'C#', extension: 'cs' },
        { value: 'cpp', label: 'C++', extension: 'cpp' },
        { value: 'c', label: 'C', extension: 'c' },
        { value: 'go', label: 'Go', extension: 'go' },
        { value: 'rust', label: 'Rust', extension: 'rs' },
        { value: 'swift', label: 'Swift', extension: 'swift' },
        { value: 'kotlin', label: 'Kotlin', extension: 'kt' },
        { value: 'php', label: 'PHP', extension: 'php' },
        { value: 'ruby', label: 'Ruby', extension: 'rb' },
        { value: 'scala', label: 'Scala', extension: 'scala' },
        { value: 'dart', label: 'Dart', extension: 'dart' },
        { value: 'r', label: 'R', extension: 'r' },
        { value: 'perl', label: 'Perl', extension: 'pl' }
    ];

    const handleTranslateCode = async () => {
        if (code.trim() === "") {
            alert("Code input should not be empty!")
            return
        };
        setLoading(true)
        try {
            const response = await axios.post("/api/lab/code-translate", {
                sourceLanguage,
                targetLanguage,
                code
            })
            if (response.status === 201) {
                setTranslatedCode(response.data.response)
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
        if (translatedCode.trim() === "") return;

        navigator.clipboard.writeText(translatedCode)
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
        if (translatedCode.trim() === "") return;

        const targetLang = programmingLanguages.find(lang => lang.value === targetLanguage);
        const extension = targetLang?.extension || 'txt';
        const filename = `devy_translated_code.${extension}`;

        const blob = new Blob([translatedCode], { type: 'text/plain' });
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

    const swapLanguages = () => {
        setSourceLanguage(targetLanguage);
        setTargetLanguage(sourceLanguage);
        setCode(translatedCode);
        setTranslatedCode(code);
    }

    const languageExamples: Record<string, string> = {
        javascript: `// Fibonacci function in JavaScript
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`,
        python: `# Fibonacci function in Python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))`,
        java: `// Fibonacci function in Java
public class Fibonacci {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        System.out.println(fibonacci(10));
    }
}`,
        cpp: `// Fibonacci function in C++
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n-1) + fibonacci(n-2);
}

int main() {
    cout << fibonacci(10) << endl;
    return 0;
}`
    };

    const insertExample = () => {
        const example = languageExamples[sourceLanguage] || languageExamples.javascript;
        setCode(example);
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-14 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        AI Code Translation
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Convert code between programming languages instantly. Maintain functionality while switching between different language syntaxes.
                    </p>
                </header>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Source Language
                                </label>
                                <select
                                    value={sourceLanguage}
                                    onChange={(e) => setSourceLanguage(e.target.value)}
                                    className="px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 min-w-[150px]"
                                >
                                    {programmingLanguages.map(lang => (
                                        <option key={`src-${lang.value}`} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                onClick={swapLanguages}
                                className="mt-6 p-3 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
                                title="Swap languages"
                            >
                                <ArrowRightLeft className="w-5 h-5 text-slate-600" />
                            </button>

                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Target Language
                                </label>
                                <select
                                    value={targetLanguage}
                                    onChange={(e) => setTargetLanguage(e.target.value)}
                                    className="px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 min-w-[150px]"
                                >
                                    {programmingLanguages.map(lang => (
                                        <option key={`tgt-${lang.value}`} value={lang.value}>
                                            {lang.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={insertExample}
                                className="flex items-center gap-2"
                            >
                                <Languages className="w-4 h-4" />
                                Insert Example
                            </Button>

                            {isUserLoggedIn ? (
                                <Button onClick={handleTranslateCode} disabled={loading || !code}>
                                    {loading ? (
                                        <Loader className='animate-spin' />
                                    ) : (
                                        <span className='flex justify-center items-center gap-2'>
                                            <Languages className="w-5 h-5" />
                                            Translate Code
                                        </span>
                                    )}
                                </Button>
                            ) : (
                                <Button disabled>
                                    Login to Translate
                                </Button>
                            )}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 ">
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-lg overflow-hidden">
                        <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-800">
                                    Source Code ({programmingLanguages.find(l => l.value === sourceLanguage)?.label})
                                </h3>
                                <p className="text-sm text-slate-600 mt-1">Code to translate</p>
                            </div>
                        </div>
                        <div className="h-[600px]">
                            <Editor
                                height="100%"
                                language={sourceLanguage}
                                value={code || `// Enter ${programmingLanguages.find(l => l.value === sourceLanguage)?.label} code here.. \n`}
                                onChange={(value) => setCode(value || "")}
                                theme="vs-dark"
                                options={{
                                    fontFamily: "Fira Code",
                                    fontSize: 16,
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
                                <h3 className="text-lg font-bold text-slate-800">
                                    Translated Code ({programmingLanguages.find(l => l.value === targetLanguage)?.label})
                                </h3>
                                <p className="text-sm text-slate-600 mt-1">AI-translated version</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyCode}
                                    disabled={translatedCode.trim() === ""}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleExportCode}
                                    disabled={translatedCode.trim() === ""}
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
                                language={targetLanguage}
                                value={translatedCode}
                                theme="vs-dark"
                                options={{
                                    readOnly: true,
                                    fontFamily: "Fira Code",
                                    fontSize: 16,
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
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-600">
                            Supports 17 programming languages • Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeTranslation;