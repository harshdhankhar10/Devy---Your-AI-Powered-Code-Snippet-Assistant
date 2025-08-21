"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Plus, X, Loader } from 'lucide-react'
import { Input } from '@/components/ui/input'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'

const AllFolders = ({ folders }: any) => {
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [loading, setLoading] = useState(false)
    let [folderName, setFolderName] = useState("")
    const router = useRouter();


    const formatDate = (date: Date) => {
        const d = new Date(date)
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`
    }


    const handleCreateFolder = async () => {
        setLoading(true)
        if (folderName.trim() === "") return;
        try {
            const response = await axios.post("/api/dashboard/folder/create", {
                folderName
            })
            if (response.status == 201) {
                toast.success(response.data.message)
                setIsModelOpen(false)
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    return (
        <>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Folders</h1>
                </div>
                <Button onClick={() => setIsModelOpen(true)} variant="default">
                    <Plus className="h-4 w-4 mr-2" />
                    Create New Folder
                </Button>
            </div>
            <p className="text-slate-600 mt-2">Organize your code snippets into folders</p>

            <section className="pt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {folders.map((folder: any) => (
                    <div
                        key={folder.id}
                        className="bg-white rounded-lg shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col items-center p-6"
                    >
                        <div className="w-20 h-20 mb-4 rounded-full overflow-hidden border border-gray-200 flex items-center justify-center bg-gray-50">
                            <img
                                src={folder.folderLogo}
                                alt={`${folder.name} logo`}
                                className="w-full h-full object-cover"
                            />

                        </div>

                        <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center truncate w-full" title={folder.name}>
                            {folder.name}
                        </h3>

                        <time
                            dateTime={folder.createdAt}
                            className="text-xs text-gray-400 mb-4"
                            title={new Date(folder.createdAt).toLocaleString()}
                        >
                            Created: {formatDate(folder.createdAt)}
                        </time>
                        <p className="text-sm text-gray-600 font-medium">
                            {folder?.snippets?.length || 0} Snippet{(folder?.snippets?.length || 0) !== 1 ? 's' : ''}
                        </p>
                    </div>
                ))}
            </section>













            {isModelOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg w-80 p-6 relative">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Create Folder</h2>
                            <X onClick={() => setIsModelOpen(false)}
                                className="cursor-pointer hover:text-gray-600"
                                size={20}
                            />
                        </div>

                        <Input
                            type="text"
                            placeholder="Enter title"
                            value={folderName}
                            onChange={(e) => setFolderName(e.target.value)}
                        />

                        <Button className='w-full mt-4' disabled={loading || !folderName} onClick={handleCreateFolder} variant="default">
                            {loading ? (<span>
                                <Loader className='animate-spin' />
                            </span>) : (<span className='flex justify-center items-center gap-4'>
                                <Plus className="h-4 w-4 mr-2" />
                                Create New Folder
                            </span>)}
                        </Button>
                    </div>
                </div>
            )}

        </>
    )
}

export default AllFolders