"use client"

import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Check, Zap, Loader, Download, BarChart3, Clock, Cpu } from 'lucide-react';
import { Button } from '../ui/button';
import axios from 'axios';

const CodeOptimization = ({ isUserLoggedIn }: any) => {
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState("")
    const [optimizedCode, setOptimizedCode] = useState("")
    const [loading, setLoading] = useState(false)
    const [copied, setCopied] = useState(false)
    const [optimizationType, setOptimizationType] = useState('performance')

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
        { value: 'ruby', label: 'Ruby' }
    ];

    const optimizationTypes = [
        { value: 'performance', label: 'Performance', icon: <Cpu className="w-4 h-4" />, description: 'Focus on execution speed and efficiency' },
        { value: 'memory', label: 'Memory', icon: <BarChart3 className="w-4 h-4" />, description: 'Reduce memory usage and footprint' },
        { value: 'readability', label: 'Readability', icon: <Clock className="w-4 h-4" />, description: 'Improve code clarity and maintainability' },
        { value: 'comprehensive', label: 'Comprehensive', icon: <Zap className="w-4 h-4" />, description: 'Balance all optimization aspects' }
    ];

    const handleOptimizeCode = async () => {
        if (code.trim() === "") {
            alert("Code input should not be empty!")
            return
        };
        setLoading(true)
        try {
            const response = await axios.post("/api/lab/code-optimization", {
                language,
                code,
                optimizationType
            })
            if (response.status === 201) {
                setOptimizedCode(response.data.response)
                setLoading(false)
                if (response.data.analysis) {
                    // Show optimization insights if available
                    alert(`${response.data.message}\n\nOptimization Insights:\n${response.data.analysis}`);
                } else {
                    alert(response.data.message)
                }
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
        if (optimizedCode.trim() === "") return;

        navigator.clipboard.writeText(optimizedCode)
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
        if (optimizedCode.trim() === "") return;

        const fileExtensionMap: Record<string, string> = {
            javascript: 'js',
            typescript: 'ts',
            python: 'py',
            java: 'java',
            csharp: 'cs',
            cpp: 'cpp',
            go: 'go',
            rust: 'rs',
            swift: 'swift',
            kotlin: 'kt',
            php: 'php',
            ruby: 'rb'
        };

        const extension = fileExtensionMap[language] || 'txt';
        const filename = `devy_optimized_code.${extension}`;

        const blob = new Blob([optimizedCode], { type: 'text/plain' });
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

    // Example code snippets that could benefit from optimization
    const optimizationExamples: Record<string, string> = {
        javascript: `// Inefficient Fibonacci calculation
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Inefficient array filtering
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evenNumbers = [];
for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] % 2 === 0) {
        evenNumbers.push(numbers[i]);
    }
}

console.log(fibonacci(10), evenNumbers);`,
        python: `# Inefficient code examples
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Inefficient list processing
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
even_numbers = []
for num in numbers:
    if num % 2 == 0:
        even_numbers.append(num)

print(fibonacci(10), even_numbers)`,
        java: `// Inefficient Java code
public class InefficientCode {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n-1) + fibonacci(n-2);
    }
    
    public static void main(String[] args) {
        int[] numbers = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
        ArrayList<Integer> evenNumbers = new ArrayList<>();
        for (int i = 0; i < numbers.length; i++) {
            if (numbers[i] % 2 == 0) {
                evenNumbers.add(numbers[i]);
            }
        }
        System.out.println(fibonacci(10) + " " + evenNumbers);
    }
}`
    };

    const insertExample = () => {
        const example = optimizationExamples[language] || optimizationExamples.javascript;
        setCode(example);
    };

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen pt-14 font-sans">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <header className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-4">
                        AI Code Optimization
                    </h1>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                        Enhance your code's performance, reduce memory usage, and improve efficiency with AI-powered optimization.
                    </p>
                </header>

                <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 mb-8">
                    <div className="flex flex-wrap items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="flex flex-col gap-2">
                                <label className="text-sm font-semibold text-slate-700 uppercase tracking-wide">
                                    Language
                                </label>
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#6C63FF] focus:border-transparent transition-all duration-200 min-w-[150px]"
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
                                    Optimization Focus
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {optimizationTypes.map((type) => (
                                        <button
                                            key={type.value}
                                            onClick={() => setOptimizationType(type.value)}
                                            className={`flex flex-col items-center p-3 rounded-lg transition-all duration-200 ${optimizationType === type.value
                                                ? 'bg-[#6C63FF] text-white shadow-md'
                                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                                }`}
                                            title={type.description}
                                        >
                                            <span className="mb-1">{type.icon}</span>
                                            <span className="text-xs font-medium">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <Button
                                variant="outline"
                                onClick={insertExample}
                                className="flex items-center gap-2"
                            >
                                <Zap className="w-4 h-4" />
                                Insert Example
                            </Button>

                            {isUserLoggedIn ? (
                                <Button onClick={handleOptimizeCode} disabled={loading || !code}>
                                    {loading ? (
                                        <Loader className='animate-spin' />
                                    ) : (
                                        <span className='flex justify-center items-center gap-2'>
                                            <Zap className="w-5 h-5" />
                                            Optimize Code
                                        </span>
                                    )}
                                </Button>
                            ) : (
                                <Button disabled>
                                    Login to Optimize
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
                                <p className="text-sm text-slate-600 mt-1">Code to optimize</p>
                            </div>
                        </div>
                        <div className="h-[600px]">
                            <Editor
                                height="100%"
                                language={language}
                                value={code || `// Enter code to optimize here.. \n`}
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
                                <h3 className="text-lg font-bold text-slate-800">Optimized Code</h3>
                                <p className="text-sm text-slate-600 mt-1">AI-optimized version</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleCopyCode}
                                    disabled={optimizedCode.trim() === ""}
                                    className="p-2 text-slate-500 hover:text-[#6C63FF] hover:bg-slate-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                </button>
                                <button
                                    onClick={handleExportCode}
                                    disabled={optimizedCode.trim() === ""}
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
                                value={optimizedCode}
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
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                        <span className="text-sm font-medium text-slate-600">
                            Optimize for performance, memory, or readability • Powered by AI
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CodeOptimization;