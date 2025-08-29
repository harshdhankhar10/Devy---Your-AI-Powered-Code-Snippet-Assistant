import { Button } from '@/components/ui/button';
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
import Link from 'next/link';

const AILab = () => {
    const aiTools = [
        {
            id: 'refactor',
            title: 'AI Refactor',
            description: 'Improve code structure and performance',
            icon: RefreshCw,
            color: 'bg-blue-50 text-blue-600 border-blue-200',
            link: "/ai-refactor"
        },
        {
            id: 'comments',
            title: 'Add Comments',
            description: 'Generate detailed code documentation',
            icon: MessageSquare,
            color: 'bg-green-50 text-green-600 border-green-200',
            link: "/add-comments"
        },
        {
            id: 'translation',
            title: 'Code Translation',
            description: 'Convert between programming languages',
            icon: Languages,
            color: 'bg-purple-50 text-purple-600 border-purple-200',
            link: "/code-translate"
        },
        {
            id: 'optimization',
            title: 'Code Optimization',
            description: 'Enhance performance and efficiency',
            icon: Zap,
            color: 'bg-yellow-50 text-yellow-600 border-yellow-200',
            link: "/code-optimization"
        },

        {
            id: 'pseudocode',
            title: 'Convert to Pseudocode',
            description: 'Transform code into readable pseudocode',
            icon: FileText,
            color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
            link: "/convert-to-pseudocode"
        },

        {
            id: 'explain',
            title: 'Explain Code',
            description: 'Get detailed code explanations',
            icon: HelpCircle,
            color: 'bg-orange-50 text-orange-600 border-orange-200',
            link: "/explain-code"
        },

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
                        <Link href={`/ai-lab${tool.link}`} key={tool.id}>
                            <Card className={`cursor-pointer transition-all hover:shadow-sm border ${tool.color}`}>
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
                        </Link>
                    );
                })}
            </div>
            <div className="flex justify-center items-center mt-12 gap-2">
                <Button className='cursor-not-allowed'>
                    <span className='h-2 w-2 animate-pulse bg-white rounded-full'></span> And More Comming Soon..
                </Button>
            </div>
        </div>
    );
};

export default AILab;
