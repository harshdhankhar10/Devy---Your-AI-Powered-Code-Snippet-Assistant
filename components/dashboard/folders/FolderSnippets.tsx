'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Code, Eye, Clock, Plus, X, Check } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AllSnippets {
    id: string;
    title: string;
    description: string;
    langugae: string;
    views: number;
    createdAt: Date;
    tags: string[];
}

interface FolderSnippetsProps {
    allSnippets: AllSnippets[];
    folderId: string;
    snippetsInFolder: AllSnippets[];
    folderName: string;
}

const FolderSnippets = ({ allSnippets, folderId, snippetsInFolder, folderName }: FolderSnippetsProps) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [snippets, setSnippets] = useState(allSnippets);
    const [currentFolderSnippets, setCurrentFolderSnippets] = useState(snippetsInFolder);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [selectedSnippets, setSelectedSnippets] = useState<string[]>([]);
    const router = useRouter();

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    };

    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const handleAddSnippets = (id: string) => {
        if (selectedSnippets.includes(id)) {
            setSelectedSnippets(selectedSnippets.filter(snippetId => snippetId !== id));
        } else {
            setSelectedSnippets([...selectedSnippets, id]);
        }
    };

    const handleSubmit = async () => {
        if (selectedSnippets.length === 0) {
            toast.error("No snippets selected");
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/dashboard/snippets/add-to-folder', {
                snippetIds: selectedSnippets,
                folderId: folderId,
                folderName: folderName
            });

            if (response.status !== 200) {
                throw new Error(response.data.error || 'Failed to add snippets to folder');
            }

            toast.success(`Added ${response.data.count} snippet(s) to the folder`);

            const addedSnippets = snippets.filter(snippet => selectedSnippets.includes(snippet.id));
            setCurrentFolderSnippets([...currentFolderSnippets, ...addedSnippets]);
            setSnippets(snippets.filter(snippet => !selectedSnippets.includes(snippet.id)));
            setSelectedSnippets([]);
            setIsModalOpen(false);
            router.refresh();
        } catch (error: any) {
            console.error('Error adding snippets to folder:', error);
            toast.error(error.response?.data?.error || "Failed to add snippets to folder");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold">Folder Snippets</h1>
                        <p className="text-muted-foreground text-sm">{currentFolderSnippets.length} snippets</p>
                    </div>

                    <Button
                        className="bg-[#6C63FF] hover:bg-[#5651d9]"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Existing Snippets
                    </Button>
                </div>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="Search your snippets..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {currentFolderSnippets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentFolderSnippets.map((snippet) => (
                            <Card
                                key={snippet.id}
                                className="hover:shadow-lg transition-shadow cursor-pointer"
                            >
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg line-clamp-2 hover:text-[#6C63FF]">
                                        {snippet.title}
                                    </CardTitle>
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
                                            <span>{formatDate(snippet.createdAt)}</span>
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
                                : 'Get started by adding snippets to this folder'}
                        </p>
                        <Button
                            className="bg-[#6C63FF] hover:bg-[#5651d9]"
                            onClick={() => setIsModalOpen(true)}
                        >
                            <Plus className="h-4 w-4 mr-2" />
                            Add Snippets
                        </Button>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
                    <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
                        <div className="flex justify-between items-center p-6 border-b">
                            <h2 className="text-lg font-semibold">Add Snippets to Folder</h2>
                            <X
                                onClick={() => {
                                    setIsModalOpen(false);
                                    setSelectedSnippets([]);
                                }}
                                className="cursor-pointer hover:text-gray-600"
                                size={20}
                            />
                        </div>

                        <div className="p-6 border-b">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder="Search snippets..."
                                    className="pl-10"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="p-6 overflow-y-auto flex-grow">
                            <h3 className="text-sm font-medium mb-4">Available Snippets</h3>
                            <div className="space-y-2 max-h-60 overflow-y-auto">
                                {filteredSnippets.length > 0 ? (
                                    filteredSnippets.map((snippet) => (
                                        <div
                                            key={snippet.id}
                                            className={`p-3 border rounded-lg flex items-center justify-between cursor-pointer ${selectedSnippets.includes(snippet.id)
                                                ? 'bg-[#6C63FF] bg-opacity-10 border-[#6C63FF]'
                                                : 'hover:bg-gray-100'
                                                }`}
                                            onClick={() => handleAddSnippets(snippet.id)}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`p-1 rounded-full ${selectedSnippets.includes(snippet.id)
                                                    ? 'bg-[#6C63FF] text-white'
                                                    : 'border border-gray-300'
                                                    }`}>
                                                    {selectedSnippets.includes(snippet.id) ? (
                                                        <Check size={14} />
                                                    ) : (
                                                        <Plus size={14} />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{snippet.title}</p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {snippet.langugae} • {formatDate(snippet.createdAt)}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge variant="secondary">{snippet.views} views</Badge>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">
                                        No snippets found
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-6 border-t">
                            <p className="text-sm text-muted-foreground">
                                {selectedSnippets.length} snippet(s) selected
                            </p>
                            <Button
                                className="bg-[#6C63FF] hover:bg-[#5651d9]"
                                onClick={handleSubmit}
                                disabled={loading || selectedSnippets.length === 0}
                            >
                                {loading ? 'Adding...' : `Add ${selectedSnippets.length} Snippet(s)`}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FolderSnippets;