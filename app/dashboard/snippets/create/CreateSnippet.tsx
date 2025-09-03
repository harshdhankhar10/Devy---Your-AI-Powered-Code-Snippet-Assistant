"use client"
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Save, X, Code2, Lock, Globe, MessageSquare, Sparkles, Crown, Loader } from 'lucide-react';
import Editor from '@monaco-editor/react';
import Link from 'next/link';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const NewSnippet = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [language, setLanguage] = useState('javascript');
    const [code, setCode] = useState('// Enter Your snippets here...\n');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [allowComments, setAllowComments] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter();


    const languages = [
        { value: 'javascript', label: 'JavaScript' },
        { value: 'typescript', label: 'TypeScript' },
        { value: 'python', label: 'Python' },
        { value: 'java', label: 'Java' },
        { value: 'cpp', label: 'C++' },
        { value: 'csharp', label: 'C#' },
        { value: 'go', label: 'Go' },
        { value: 'rust', label: 'Rust' },
        { value: 'php', label: 'PHP' },
        { value: 'ruby', label: 'Ruby' },
        { value: 'swift', label: 'Swift' },
        { value: 'kotlin', label: 'Kotlin' },
        { value: 'html', label: 'HTML' },
        { value: 'css', label: 'CSS' },
        { value: 'sql', label: 'SQL' },
        { value: 'bash', label: 'Bash' },
        { value: 'json', label: 'JSON' },
        { value: 'yaml', label: 'YAML' },
        { value: 'markdown', label: 'Markdown' },
        { value: 'xml', label: 'XML' }
    ];

    const addTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim()) && tags.length < 10) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTag();
        }
    };

    const isFormValid = title.trim() && language && code.trim();

    const handleSubmitForm = async () => {
        setIsLoading(true)
        try {
            const response = await axios.post("/api/dashboard/snippets/create", {
                title, description, language, code, tags
            })
            if (response.status == 201) {
                alert("Snippet Saved Successfully!");
                router.refresh()
                setTimeout(() => {
                    router.push("/dashboard/snippets")
                    return;
                }, 2000)
            }
        } catch (error: any) {
            alert(error.response.data.error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Create New Snippet</h1>
                    <p className="text-muted-foreground text-sm mt-1">
                        Build, save and share your code with professional syntax highlighting
                    </p>
                </div>
                <Button className='bg-[#6C63FF] hover:bg-[#544ddf] ' onClick={handleSubmitForm} size="lg" disabled={!isFormValid || isLoading}>
                    {isLoading ? <span className='flex justify-center items-center gap-2'><Loader className='animate-spin' /> Saving...</span> : <span className='flex justify-center items-center'> <Save className="h-4 w-4 mr-2" />
                        Save Snippet</span>}
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-3 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center space-x-2">
                                <Code2 className="h-5 w-5" />
                                <span>Snippet Details</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title">Title *</Label>
                                    <Input
                                        id="title"
                                        placeholder="e.g., React Custom Hook for API Calls"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="language">Language *</Label>
                                    <Select value={language} onValueChange={setLanguage}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select language" />
                                        </SelectTrigger>
                                        <SelectContent className="max-h-[300px]">
                                            {languages.map((lang) => (
                                                <SelectItem key={lang.value} value={lang.value}>
                                                    {lang.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description">Description</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Brief description of what this snippet does..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="resize-none"
                                    rows={3}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Tags</Label>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        placeholder="Add tags (press Enter)"
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        disabled={tags.length >= 10}
                                    />
                                    <Button
                                        type="button"
                                        onClick={addTag}
                                        variant="outline"
                                        size="sm"
                                        disabled={tags.length >= 10}
                                    >
                                        Add
                                    </Button>
                                </div>
                                {tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2 mt-3">
                                        {tags.map((tag) => (
                                            <Badge key={tag} variant="secondary">
                                                {tag}
                                                <button
                                                    onClick={() => removeTag(tag)}
                                                    className="ml-2 text-muted-foreground hover:text-foreground"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle>Code Editor</CardTitle>
                                <div className="flex items-center space-x-3">
                                    <Label className="text-sm">Theme: Dark</Label>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="rounded-md overflow-hidden border">
                                <Editor
                                    height="500px"
                                    defaultLanguage={language}
                                    language={language}
                                    theme="vs-dark"
                                    value={code}
                                    onChange={(value) => setCode(value || '')}
                                    options={{
                                        minimap: { enabled: true },
                                        scrollBeyondLastLine: false,
                                        fontSize: 14,
                                        wordWrap: 'on',
                                        automaticLayout: true,
                                        padding: { top: 15, bottom: 15 },
                                    }}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Lock className="h-5 w-5" />
                                <span>Privacy Settings</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Globe className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-sm">Public Snippet</Label>
                                    </div>
                                    <Switch
                                        checked={isPublic}
                                        disabled
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                                        <Label className="text-sm">Allow Comments</Label>
                                    </div>
                                    <Switch
                                        checked={allowComments}
                                        onCheckedChange={setAllowComments}
                                    />
                                </div>
                            </div>

                            <Separator />

                            <div className="space-y-3">
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <Crown className="h-4 w-4" />
                                    <span>Private snippets are Pro only</span>
                                </div>

                                <Button variant="outline" size="sm" className="w-full">
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Upgrade to Pro
                                </Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Quick Stats</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4 text-center">
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold">{code.split('\n').length}</div>
                                    <div className="text-xs text-muted-foreground">Lines</div>
                                </div>
                                <div className="space-y-1">
                                    <div className="text-2xl font-bold">{code.length}</div>
                                    <div className="text-xs text-muted-foreground">Characters</div>
                                </div>
                            </div>
                            <Separator />
                            <div className="text-center space-y-1">
                                <div className="text-lg font-bold">{code.split(/\s+/).filter(word => word.length > 0).length}</div>
                                <div className="text-xs text-muted-foreground">Words</div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center space-x-2">
                                <Sparkles className="h-5 w-5" />
                                <span>AI Tools</span>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2 text-sm text-muted-foreground">
                                <p>• Auto-generate comments</p>
                                <p>• Refactor & optimize</p>
                                <p>• Language translation</p>
                                <p>• Bug detection</p>
                                <p>• Code completion</p>
                                <p>• Error highlighting</p>
                            </div>
                            <Link href="/dashboard/lab">
                                <Button variant="outline" size="sm" className="w-full mt-4" disabled={!code.trim()}>
                                    <Sparkles className="h-4 w-4 mr-2" />
                                    Explore AI Lab
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default NewSnippet;