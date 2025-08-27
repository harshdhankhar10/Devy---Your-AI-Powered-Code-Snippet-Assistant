'use client'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Code2, Eye, Clock, Lock, Globe, MessageSquare, Edit, Copy, Share2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import Editor from '@monaco-editor/react'

interface Snippet {
    id: string
    title: string
    description: string | null
    code: string
    langugae: string
    tags: string[]
    views: number
    isPublic: boolean
    isCommentsAllowed: boolean
    createdAt: Date
    updatedAt: Date
    user: {
        name: string | null
        image: string | null
    }
}

export default function SnippetView({ snippet }: { snippet: Snippet }) {
    const router = useRouter()

    const copyToClipboard = () => {
        navigator.clipboard.writeText(snippet.code)
        alert('Code copied to clipboard')
    }

    const shareSnippet = () => {
        if (snippet.isPublic) {
            navigator.clipboard.writeText(`${window.location.origin}/snippet/${snippet.id}`)
            alert('Share link copied to clipboard')
        } else {
            alert('Private snippets cannot be shared')
        }
    }

    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <Button onClick={() => router.back()}>
                        ← Back to snippets
                    </Button>
                </div>
                <div className="flex gap-2">
                    <Button disabled variant="outline" onClick={() => router.push(`/dashboard/snippets/${snippet.id}/edit`)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                    </Button>
                </div>
            </div>

            <div className="space-y-2">
                <div className="flex items-center gap-3">
                    <h1 className="text-3xl font-bold">{snippet.title}</h1>
                    {!snippet.isPublic && <Lock className="h-5 w-5 text-muted-foreground" />}
                </div>

                {snippet.description && (
                    <p className="text-muted-foreground">{snippet.description}</p>
                )}

                <div className="flex flex-wrap items-center gap-2 pt-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <Code2 className="h-4 w-4" />
                        {snippet.langugae}
                    </Badge>

                    {snippet.tags.map((tag) => (
                        <Badge key={tag} variant="outline">
                            {tag}
                        </Badge>
                    ))}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground ml-auto">
                        <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{snippet.views} views</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>
                                {new Date(snippet.updatedAt).toLocaleDateString('en-US', {
                                    month: 'short',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="rounded-lg overflow-hidden border">
                <div className="bg-muted px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">{snippet.langugae}</Badge>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Globe className="h-4 w-4" />
                            <span>{snippet.isPublic ? 'Public' : 'Private'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MessageSquare className="h-4 w-4" />
                            <span>{snippet.isCommentsAllowed ? 'Comments allowed' : 'Comments disabled'}</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" onClick={copyToClipboard}>
                            <Copy className="h-4 w-4 mr-2" />
                            Copy
                        </Button>
                        <Button variant="ghost" size="sm" onClick={shareSnippet}>
                            <Share2 className="h-4 w-4 mr-2" />
                            Share
                        </Button>
                    </div>
                </div>

                <Editor
                    height="60vh"
                    language={snippet.langugae}
                    theme="vs-dark"
                    value={snippet.code}
                    options={{

                        readOnly: true,
                        minimap: { enabled: true },
                        scrollBeyondLastLine: false,
                        fontSize: 14,
                        wordWrap: 'on',
                        automaticLayout: true,
                    }}
                />
            </div>
        </div>
    )
}