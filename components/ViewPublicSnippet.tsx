'use client'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Copy, Share2, Heart, MessageSquare, Globe, Clock, Eye, Code } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { toast } from 'sonner'

interface Snippet {
    id: string
    title: string
    description: string | null
    code: string
    langugae: string
    tags: string[]
    views: number
    createdAt: Date
    updatedAt: Date
    user: {
        name: string | null
        image: string | null
    }
}

interface Comment {
    id: string
    content: string
    createdAt: Date
    user: {
        name: string
        image: string | null
    }
}

const languageMap: Record<string, string> = {
    javascript: 'JavaScript',
    typescript: 'TypeScript',
    python: 'Python',
    java: 'Java',
    cpp: 'C++',
    csharp: 'C#',
    html: 'HTML',
    css: 'CSS',
    sql: 'SQL',
    bash: 'Bash',
    php: 'PHP',
    ruby: 'Ruby'
}

const staticComments: Comment[] = [
    {
        id: '1',
        content: 'This is really clean implementation! Thanks for sharing.',
        createdAt: new Date('2023-05-15'),
        user: {
            name: 'DevUser123',
            image: null
        }
    },
    {
        id: '2',
        content: 'Could you explain the part about the state management?',
        createdAt: new Date('2023-05-16'),
        user: {
            name: 'CodeExplorer',
            image: null
        }
    }
]

export default function ViewPublicSnippet({ snippet, isLoading = false }: { snippet: Snippet | null, isLoading?: boolean }) {
    const [isCopied, setIsCopied] = useState(false)
    const [isLiked, setIsLiked] = useState(false)

    const copyToClipboard = () => {
        if (!snippet) return
        navigator.clipboard.writeText(snippet.code)
        setIsCopied(true)
        toast.success('Code copied to clipboard!')
        setTimeout(() => setIsCopied(false), 2000)
    }

    const shareSnippet = () => {
        navigator.clipboard.writeText(window.location.href)
        toast.success('Link copied to clipboard!')
    }

    const toggleLike = () => {
        setIsLiked(!isLiked)
        toast.success(!isLiked ? 'Liked this snippet!' : 'Removed like')
    }

    const formatDate = (date: Date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }

    if (isLoading || !snippet) {
        return (
            <div className="min-h-screen pt-20 bg-gray-50 text-gray-800">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex justify-between items-start mb-4">
                                <Skeleton className="h-8 w-3/4" />
                                <div className="flex space-x-2">
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                    <Skeleton className="h-10 w-10 rounded-md" />
                                </div>
                            </div>

                            <Skeleton className="h-4 w-full mb-2" />
                            <Skeleton className="h-4 w-5/6 mb-6" />

                            <div className="flex items-center gap-3 mb-6">
                                <Skeleton className="h-10 w-10 rounded-full" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-32" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4 text-sm">
                                    <Skeleton className="h-4 w-20" />
                                    <Skeleton className="h-4 w-24" />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-20 rounded-full" />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Skeleton className="h-6 w-12 rounded-full" />
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                    <Skeleton className="h-6 w-14 rounded-full" />
                                </div>
                            </div>

                            <Skeleton className="w-full h-10 mt-6 rounded-md" />
                        </div>

                        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <div className="flex items-center gap-2 mb-4">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-5 w-24" />
                            </div>
                            <div className="space-y-4">
                                {[1, 2].map((i) => (
                                    <div key={i} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <div className="space-y-2">
                                                <Skeleton className="h-3 w-24" />
                                                <Skeleton className="h-2 w-16" />
                                            </div>
                                        </div>
                                        <Skeleton className="h-4 w-full ml-11" />
                                    </div>
                                ))}
                            </div>
                            <Skeleton className="w-full h-10 mt-4 rounded-md" />
                        </div>
                    </div>

                    <div className="lg:col-span-8">
                        <div className="rounded-xl shadow-sm overflow-hidden h-full border border-gray-200">
                            <div className="p-3 bg-gray-800 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="w-3 h-3 rounded-full bg-gray-600" />
                                    <Skeleton className="w-3 h-3 rounded-full bg-gray-600" />
                                    <Skeleton className="w-3 h-3 rounded-full bg-gray-600" />
                                </div>
                                <div className="flex items-center gap-3">
                                    <Skeleton className="h-4 w-12 bg-gray-600" />
                                    <Skeleton className="h-4 w-16 bg-gray-600" />
                                </div>
                            </div>

                            <div className="bg-gray-800 p-4 h-[calc(100%-44px)]">
                                {[...Array(15)].map((_, i) => (
                                    <Skeleton key={i} className="h-4 w-full mb-2 bg-gray-700" />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen pt-20 bg-gray-50 text-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 p-6">
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex justify-between items-start mb-4">
                            <h1 className="text-2xl font-bold text-gray-900">{snippet.title}</h1>
                            <div className="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={copyToClipboard}
                                    className="hover:bg-gray-50 text-gray-600"
                                >
                                    <Copy className="h-5 w-5" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={shareSnippet}
                                    className="hover:bg-gray-50 text-gray-600"
                                >
                                    <Share2 className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>

                        {snippet.description && (
                            <p className="text-gray-600 mb-6">{snippet.description}</p>
                        )}

                        <div className="flex items-center gap-3 mb-6">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={snippet.user.image || undefined} />
                                <AvatarFallback className="bg-gray-100 text-gray-700">
                                    {snippet.user.name?.charAt(0).toUpperCase() || 'U'}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="font-medium text-gray-900">{snippet.user.name || 'Anonymous'}</p>
                                <p className="text-sm text-gray-500">
                                    Created {formatDate(snippet.createdAt)}
                                </p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-sm">
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Eye className="h-4 w-4" />
                                    <span>{snippet.views} views</span>
                                </div>
                                <div className="flex items-center gap-1 text-gray-500">
                                    <Clock className="h-4 w-4" />
                                    <span>Updated {formatDate(snippet.updatedAt)}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Badge variant="secondary" className="flex items-center gap-1 bg-blue-50 text-blue-700">
                                    <Globe className="h-3 w-3" />
                                    Public
                                </Badge>
                                <Badge variant="outline" className="flex items-center gap-1 border-gray-200 text-gray-700">
                                    <Code className="h-3 w-3" />
                                    {languageMap[snippet.langugae] || snippet.langugae}
                                </Badge>
                            </div>

                            {snippet.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {snippet.tags.map((tag) => (
                                        <Badge key={tag} variant="outline" className="border-gray-200 text-gray-700">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                        </div>

                        <Button
                            variant={isLiked ? "default" : "outline"}
                            className={`w-full mt-6 gap-2 ${isLiked ? 'bg-pink-500 hover:bg-pink-600' : 'border-gray-200 hover:bg-gray-50'}`}
                            onClick={toggleLike}
                        >
                            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                            {isLiked ? 'Liked' : 'Like this snippet'}
                        </Button>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <MessageSquare className="h-5 w-5 text-gray-700" />
                            <h2 className="font-semibold text-gray-900">Comments</h2>
                        </div>
                        <div className="space-y-4">
                            {staticComments.map((comment) => (
                                <div key={comment.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-3 mb-2">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={comment.user.image || undefined} />
                                            <AvatarFallback className="bg-gray-100 text-xs">
                                                {comment.user.name.charAt(0).toUpperCase()}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium text-sm text-gray-900">{comment.user.name}</p>
                                            <p className="text-xs text-gray-500">{formatDate(comment.createdAt)}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-700 text-sm pl-11">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4">
                            <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">
                                Sign in to comment
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-8">
                    <div className="rounded-xl shadow-sm overflow-hidden h-full border border-gray-200">
                        <div className="p-3 bg-gray-800 flex justify-between items-center">
                            <div className="flex items-center gap-2 text-sm">
                                <div className="w-3 h-3 rounded-full bg-[#e55a52]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#f2bc3e]"></div>
                                <div className="w-3 h-3 rounded-full bg-[#64cb44]"></div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={copyToClipboard}
                                    className="text-xs text-gray-400 hover:text-gray-200 flex items-center gap-1"
                                >
                                    <Copy className="h-3 w-3" />
                                    Copy
                                </button>
                                <div className="text-xs text-gray-400">
                                    {languageMap[snippet.langugae] || snippet.langugae}
                                </div>
                            </div>
                        </div>

                        <SyntaxHighlighter
                            language={snippet.langugae}
                            style={vscDarkPlus}
                            customStyle={{
                                margin: 0,
                                padding: '1.5rem',
                                backgroundColor: '#1e1e1e',
                                fontSize: '0.95rem',
                                borderRadius: 0,
                                height: 'calc(100% - 44px)',
                                overflow: 'auto',
                                fontFamily: '"IBM Plex Mono", "Fira Code", "Source Code Pro", monospace'
                            }}
                            showLineNumbers
                            wrapLines
                            lineNumberStyle={{
                                color: '#858585',
                                minWidth: '2.5em'
                            }}
                            lineProps={{
                                style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' }
                            }}
                        >
                            {snippet.code}
                        </SyntaxHighlighter>
                    </div>
                </div>
            </div>
        </div>
    )
}