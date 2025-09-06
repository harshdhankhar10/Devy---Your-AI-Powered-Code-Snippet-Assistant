"use client";
import { useState, useEffect } from 'react';
import {
    Folder,
    FileCode,
    Activity,
    Clock,
    Sparkles,
    Plus,
    ArrowUpRight,
    Search
} from 'lucide-react';
import Link from 'next/link';

interface RecentActivity {
    id: string;
    title: string;
    createdAt: Date;
}

interface DashboardHomeProps {
    snippets: number;
    folders: number;
    recentActivities: RecentActivity[];

}

const DashboardHome = ({ snippets, folders, recentActivities }: DashboardHomeProps) => {
    const [recentActivity, setRecentActivity] = useState<RecentActivity[]>(recentActivities);
    const [isLoading, setIsLoading] = useState(true);



    const aiTools = [
        { id: 1, name: 'Code Refactoring', description: 'Let AI optimize and modernize your code', color: 'blue', link: "/ai-lab/ai-refactor" },
        { id: 2, name: 'Code Explanation', description: 'Get plain English explanations of complex code', color: 'purple', link: "/ai-lab/explain-code" },
        { id: 3, name: 'Code Translation', description: 'Convert code between programming languages', color: 'green', link: "/ai-lab/code-translate" },
        { id: 4, name: 'Code Optimization', description: 'Enhance performance and efficiency', color: 'orange', link: "/ai-lab/code-optimization" },
        { id: 5, name: 'Convert to Pseudocode', description: 'Transform code into readable pseudocode', color: 'red', link: "/ai-lab/convert-to-pseudocode" },
        { id: 6, name: 'Add Comments', description: 'Automatically generate comments for your code', color: 'teal', link: "/ai-lab/add-comments" },
    ];




    return (
        <div className="min-h-screen ">
            <div className="max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Snippets Card */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileCode className="h-6 w-6 text-blue-600" />
                            </div>

                            <span className="text-3xl font-bold text-gray-900">{snippets}</span>
                        </div>
                        <h3 className="font-medium text-gray-700">Total Snippets</h3>
                        <p className="text-sm text-gray-500">Your code snippets</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Folder className="h-6 w-6 text-green-600" />
                            </div>

                            <span className="text-3xl font-bold text-gray-900">{folders}</span>

                        </div>
                        <h3 className="font-medium text-gray-700">Folders</h3>
                        <p className="text-sm text-gray-500">Organized collections</p>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-3 bg-[#d3d3d6] rounded-lg">
                                <Sparkles className="h-6 w-6 text-[#25235e]" />
                            </div>

                            <span className="text-3xl font-bold text-gray-900">6</span>

                        </div>
                        <h3 className="font-medium text-gray-700">AI Tools</h3>
                        <p className="text-sm text-gray-500">Total AI Tools</p>
                    </div>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
                            <Clock className="h-5 w-5 text-gray-400" />
                        </div>

                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {recentActivity.length === 0 ? (
                                <p className="text-sm text-gray-500">No recent activity</p>
                            ) : (
                                recentActivity.map((activity) => (
                                    <div key={activity.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <h3 className="font-medium text-gray-900">{activity.title}</h3>
                                        <p className="text-sm text-gray-600">Edited on {new Date(activity.createdAt).toLocaleDateString()}</p>
                                    </div>
                                ))
                            )}

                        </div>
                    </div>

                    {/* AI Lab Section */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-semibold text-gray-900">AI Lab</h2>
                            <Sparkles className="h-5 w-5 text-[#6C63FF]" />
                        </div>

                        <div className="space-y-4 max-h-80 overflow-y-auto">
                            {aiTools.map((tool) => (
                                <Link
                                    key={tool.id}
                                    href={tool.link}
                                    className={`block p-4 rounded-lg border border-gray-200 hover:border-[#6C63FF] transition-colors`}
                                >
                                    <h3 className="font-medium text-gray-900">{tool.name}</h3>
                                    <p className="text-sm text-gray-600">{tool.description}</p>
                                </Link>
                            ))}

                        </div>
                    </div>
                </div>

                <div className="mt-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h2 className="text-lg font-semibold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <Link href="/dashboard/snippets/create" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#6C63FF] transition-colors">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-2">
                                <Plus className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">New Snippet</span>
                        </Link>

                        <Link href="dashboard/folders" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#6C63FF] transition-colors">
                            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 mb-2">
                                <Folder className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">New Folder</span>
                        </Link>

                        <Link href="/dashboard/snippets" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#6C63FF] transition-colors">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 mb-2">
                                <Search className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">Search</span>
                        </Link>

                        <Link href="/dashboard/lab" className="flex flex-col items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-[#6C63FF] transition-colors">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600 mb-2">
                                <Sparkles className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-medium text-gray-700">AI Tools</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;