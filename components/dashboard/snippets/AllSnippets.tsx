'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Search, Code, Eye, Clock, Lock, Globe, MessageSquare, Plus } from 'lucide-react'

interface Snippet {
    id: string
    title: string
    description: string | null
    langugae: string
    tags: string[]
    views: number
    isPublic: boolean
    createdAt: Date
    updatedAt: Date
}

export default function AllSnippets({ snippets }: { snippets: Snippet[] }) {
    const router = useRouter()
    const [searchTerm, setSearchTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [sort, setSort] = useState('newest')

    const filteredSnippets = snippets
        .filter(snippet => {
            const matchesSearch = searchTerm === '' ||
                snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (snippet.description && snippet.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
                snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))

            const matchesFilter =
                filter === 'all' ||
                (filter === 'public' && snippet.isPublic) ||
                (filter === 'private' && !snippet.isPublic)

            return matchesSearch && matchesFilter
        })
        .sort((a, b) => {
            if (sort === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            return b.views - a.views
        })



    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Your Code Snippets</h1>
                    <p className="text-muted-foreground text-sm">
                        {snippets.length} snippets • {snippets.filter(s => s.isPublic).length} public
                    </p>
                </div>

                <Button className='bg-[#6C63FF] ' onClick={() => router.push('/dashboard/snippets/create')}>
                    <Plus className="h-4 w-4 mr-2" />
                    New Snippet
                </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search your snippets..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <Select value={filter} onValueChange={setFilter}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Filter by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Snippets</SelectItem>
                        <SelectItem value="public">Public Only</SelectItem>
                        <SelectItem value="private">Private Only</SelectItem>
                    </SelectContent>
                </Select>

                <Select value={sort} onValueChange={setSort}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="oldest">Oldest First</SelectItem>
                        <SelectItem value="views">Most Viewed</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {filteredSnippets.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSnippets.map((snippet) => (
                        <Card
                            key={snippet.id}
                            className="hover:shadow-lg transition-shadow cursor-pointer"
                            onClick={() => router.push(`/dashboard/snippets/view/${snippet.id}`)}
                        >
                            <CardHeader className="pb-3">
                                <div className="flex justify-between items-start">
                                    <CardTitle className="text-lg line-clamp-2 hover:text-[#6C63FF] ">
                                        {snippet.title}
                                    </CardTitle>
                                    {!snippet.isPublic && (
                                        <Lock className="h-5 w-5 text-muted-foreground" />
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {snippet.description && (
                                    <p className="text-muted-foreground text-sm line-clamp-2">
                                        {snippet.description}
                                    </p>
                                )}

                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary" className="flex items-center gap-1">
                                        <Code className="h-3 w-3" />
                                        {snippet.langugae}
                                    </Badge>
                                    {snippet.tags.slice(0, 3).map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                    {snippet.tags.length > 3 && (
                                        <Badge variant="outline">+{snippet.tags.length - 3}</Badge>
                                    )}
                                </div>

                                <div className="flex items-center justify-between text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <Eye className="h-4 w-4" />
                                        <span>{snippet.views} views</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Clock className="h-4 w-4" />
                                        <span>
                                            {new Date(snippet.createdAt).toLocaleDateString('en-US', {
                                                month: 'short',
                                                day: 'numeric',
                                                year: 'numeric'
                                            })}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-12 space-y-4">
                    <Code className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-xl font-medium">
                        {searchTerm ? 'No matching snippets' : 'No snippets yet'}
                    </h3>
                    <p className="text-muted-foreground text-center">
                        {searchTerm
                            ? 'Try adjusting your search or create a new snippet'
                            : 'Get started by creating your first code snippet'}
                    </p>
                    <Button className='bg-[#6C63FF] ' onClick={() => router.push('/dashboard/snippets/new')}>
                        <Plus className="h-4 w-4 mr-2" />
                        Create Snippet
                    </Button>
                </div>
            )}
        </div>
    )
}