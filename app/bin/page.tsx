'use client';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Copy, Save, Lock, Globe, Flame, Link, Code, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { toast } from 'react-toastify';
import axios from 'axios';

const AnonymousBin = () => {
    const [code, setCode] = useState('// Write your code here\nfunction hello() {\n  console.log("Hello, world!");\n}');
    const [language, setLanguage] = useState('javascript');
    const [title, setTitle] = useState('');
    const [password, setPassword] = useState('');
    const [customUrl, setCustomUrl] = useState('');
    const [burnAfterReading, setBurnAfterReading] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sharableLink, setSharableLink] = useState('');

    const languages = [
        'Plain Text', 'javascript', 'typescript', 'python', 'java', 'c', 'cpp', 'csharp',
        'go', 'rust', 'php', 'ruby', 'swift', 'kotlin', 'html', 'css', 'sql'
    ];

    const handleCreateBin = async () => {
        if (!code.trim()) {
            toast.error('Please enter some code');
            return;
        }

        setIsCreating(true);
        try {
            const response = await axios.post("/api/bin/create", {
                title, code, password, burnAfterReading, language
            })


            if (response.status === 201) {
                toast.success(response.data.message)
                setIsModalOpen(true);
                setSharableLink(response.data.data.id);

            } else {
                toast.error(response.data.error || 'Failed to create bin');
            }
        } catch (error: any) {
            toast.error(error.response?.data?.error || 'Failed to create bin');
        } finally {
            setIsCreating(false);
        }
    };

    const handleCopyShareableLink = () => {
        try {
            navigator.clipboard.writeText(`${window.location.origin}/b/${sharableLink}`);
            toast.success('Link copied to clipboard');
        } catch (error) {
            toast.error('Failed to copy link');
        }
    }



    return (
        <>
            <div className="min-h-screen font-semibold bg-gray-50 text-gray-900 p-6">
                <div className="max-w-7xl mx-auto mt-20">

                    <div className="grid grid-cols-1 lg:grid-cols-3  gap-6">
                        <div className="lg:col-span-1 space-y-4">
                            <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                                <h2 className="text-lg font-semibold mb-3 text-gray-800">Bin Details</h2>

                                <div className="space-y-3">
                                    <div>
                                        <Label htmlFor="title" className="block mb-1 text-sm text-gray-700">Title (optional)</Label>
                                        <Input
                                            id="title"
                                            placeholder="My code snippet"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="bg-white border-gray-300 text-sm"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="language" className="block mb-1 text-sm text-gray-700">Language</Label>
                                        <select
                                            id="language"
                                            value={language}
                                            onChange={(e) => setLanguage(e.target.value)}
                                            className="w-full p-2 bg-white border border-gray-300 rounded text-sm"
                                        >
                                            {languages.map((lang) => (
                                                <option key={lang} value={lang}>
                                                    {lang.charAt(0).toUpperCase() + lang.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div>
                                        <Label htmlFor="password" className=" mb-1 text-sm text-gray-700 flex items-center">
                                            <Lock className="h-4 w-4 mr-1 text-gray-600" />
                                            Password (optional)
                                        </Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            placeholder="Secure your bin"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-white border-gray-300 text-sm"
                                        />
                                    </div>


                                    <div className="flex items-center space-x-2">
                                        <Switch
                                            id="burn-after-reading"
                                            checked={burnAfterReading}
                                            onCheckedChange={setBurnAfterReading}
                                        />
                                        <Label htmlFor="burn-after-reading" className="flex items-center text-sm text-gray-700">
                                            Burn after reading
                                        </Label>
                                    </div>
                                </div>

                                <div className="mt-5">
                                    <Button
                                        onClick={handleCreateBin}
                                        disabled={isCreating} className='w-full'>
                                        <Save className="h-4 w-4 mr-1" />
                                        {isCreating ? 'Creating...' : 'Create Bin'}
                                    </Button>


                                </div>
                            </div>

                            <div className="bg-white rounded-lg border  border-gray-200 p-4 shadow-sm">
                                <h3 className="font-semibold mb-4 text-gray-800 flex items-center text-sm">
                                    <Globe className="h-4 w-4 mr-1 text-gray-600" />
                                    About Anonymous Bins
                                </h3>
                                <ul className="text-xs text-gray-600 space-y-1 pb-8">
                                    <li>• No account required to create or view</li>
                                    <li>• Optional password protection</li>
                                    <li>• Burn after reading for one-time access</li>
                                    <li>• Auto-deleted after 24 hours permanently from our database</li>
                                </ul>
                            </div>
                        </div>

                        <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                            <Editor
                                height="80vh"
                                defaultLanguage="javascript"
                                language={language}
                                value={code}
                                onChange={(value) => setCode(value || '')}
                                theme="vs-dark"
                                options={{
                                    fontSize: 18,
                                    fontFamily: 'Fira Code, Monaco, Menlo, Consolas, monospace',
                                    minimap: { enabled: false },
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                    padding: { top: 16, bottom: 16 },
                                    lineNumbers: 'on',
                                    glyphMargin: false,
                                    folding: true,
                                    lineDecorationsWidth: 10,
                                    wordWrap: 'on',
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">

                        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bin Created Successfully!</h2>
                        <p className="mb-2 text-gray-700">Your anonymous bin has been created.</p>
                        <div className="mb-4">
                            <Label className="block mb-1 text-sm text-gray-700">Shareable Link</Label>
                            <div className="flex items-center">
                                <Input
                                    readOnly
                                    value={`${window.location.origin}/b/${sharableLink}`}
                                />
                            </div>
                        </div>
                        {!password && (
                            <div className="mb-4">
                                <Label className="block mb-1 text-sm text-gray-700">Password</Label>
                                <div className="flex items-center">
                                    <Input
                                        readOnly
                                        type="text"
                                        value={password || 'No password set'}
                                    />
                                </div>
                            </div>
                        )}

                        {burnAfterReading && (
                            <p className="text-sm border-l-4 border-red-500 pl-3 text-red-700 mb-4">
                                Note: This bin is set to "Burn after reading". It will be deleted after it is accessed once.
                            </p>
                        )}
                        <div className="flex justify-end space-x-2">
                            <Button
                                variant="default"
                                onClick={() => handleCopyShareableLink()}
                            >
                                Copy Link
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AnonymousBin;