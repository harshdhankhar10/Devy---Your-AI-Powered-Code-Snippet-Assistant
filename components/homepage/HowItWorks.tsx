import { Edit, Zap, Save, ArrowRight } from "lucide-react";

const HowItWorks = () => {
    const steps = [
        {
            icon: <Edit className="h-6 w-6" />,
            title: "Create & Import",
            description: "Add your code snippets by pasting directly, importing from GitHub, or writing in our editor.",
            details: [
                "Syntax highlighting for 50+ languages",
                "GitHub integration",
                "VS Code extension"
            ]
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "AI Enhancement",
            description: "Our AI analyzes and improves your code with intelligent refactoring and optimizations.",
            details: [
                "Automatic documentation",
                "Performance optimization",
                "Code smell detection"
            ]
        },
        {
            icon: <Save className="h-6 w-6" />,
            title: "Organize & Share",
            description: "Store optimized snippets and share with your team through secure collaboration.",
            details: [
                "Smart tagging",
                "Team libraries",
                "Version control"
            ]
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm  mb-6">
                        How it Works
                    </div>
                    <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
                        Simple, powerful code management
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        A streamlined process from creation to collaboration.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute left-16 top-0 h-full w-0.5 bg-gray-200"></div>

                    <div className="space-y-12 md:space-y-16">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row gap-8">
                                {/* Step number */}
                                <div className="flex items-start md:w-32">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-medium">
                                        {index + 1}
                                    </div>
                                </div>

                                <div className="flex-1 bg-gray-50 rounded-xl p-8 border border-gray-200">
                                    <div className="flex items-center mb-4">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 mr-4 text-blue-600">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {step.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 mb-4">
                                        {step.description}
                                    </p>

                                    <ul className="space-y-2">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start text-gray-600">
                                                <span className="text-blue-500 mr-2">•</span>
                                                {detail}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <div className="bg-gray-50 rounded-xl p-8 max-w-2xl mx-auto border border-gray-200">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to get started?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Join developers who trust our platform for their code management.
                        </p>
                        <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors">
                            Start Free Trial
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;