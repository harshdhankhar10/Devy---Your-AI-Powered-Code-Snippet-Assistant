import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    RefreshCw,
    MessageSquare,
    Languages,
    Zap,
    Shield,
    FileText,
    TestTube,
    HelpCircle,
    Bug,
    Sparkles
} from 'lucide-react';

const AILab = () => {
    const aiTools = [
        {
            id: 'refactor',
            title: 'AI Refactor',
            description: 'Improve code structure and performance',
            icon: RefreshCw,
            color: 'bg-blue-50 text-blue-600 border-blue-200'
        },
        {
            id: 'comments',
            title: 'Add Comments',
            description: 'Generate detailed code documentation',
            icon: MessageSquare,
            color: 'bg-green-50 text-green-600 border-green-200'
        },
        {
            id: 'translation',
            title: 'Code Translation',
            description: 'Convert between programming languages',
            icon: Languages,
            color: 'bg-purple-50 text-purple-600 border-purple-200'
        },
        {
            id: 'optimization',
            title: 'Code Optimization',
            description: 'Enhance performance and efficiency',
            icon: Zap,
            color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
        },
        {
            id: 'security',
            title: 'Security Review',
            description: 'Identify and fix security vulnerabilities',
            icon: Shield,
            color: 'bg-red-50 text-red-600 border-red-200'
        },
        {
            id: 'pseudocode',
            title: 'Convert to Pseudocode',
            description: 'Transform code into readable pseudocode',
            icon: FileText,
            color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
        },
        {
            id: 'tests',
            title: 'Generate Tests',
            description: 'Create comprehensive test cases',
            icon: TestTube,
            color: 'bg-teal-50 text-teal-600 border-teal-200'
        },
        {
            id: 'explain',
            title: 'Explain Code',
            description: 'Get detailed code explanations',
            icon: HelpCircle,
            color: 'bg-orange-50 text-orange-600 border-orange-200'
        },
        {
            id: 'bugfix',
            title: 'Bug Fix Suggestions',
            description: 'Identify and suggest fixes for bugs',
            icon: Bug,
            color: 'bg-pink-50 text-pink-600 border-pink-200'
        }
    ];

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className=" text-2xl font-bold text-slate-900 flex items-center gap-2">
                    <Sparkles className="h-6 w-6 text-blue-600" />
                    AI Lab Tools
                </h1>
                <p className=" text-slate-600 mt-2">
                    Transform your code with AI-powered enhancements
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {aiTools.map((tool) => {
                    const Icon = tool.icon;
                    return (
                        <Card key={tool.id} className={`cursor-pointer transition-all hover:shadow-sm border ${tool.color}`}>
                            <CardContent className="p-6">
                                <div className="flex items-start gap-3">
                                    <div className="flex-shrink-0">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className=" font-semibold text-base mb-2">
                                            {tool.title}
                                        </h3>
                                        <p className=" text-sm text-slate-600 leading-relaxed">
                                            {tool.description}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default AILab;
