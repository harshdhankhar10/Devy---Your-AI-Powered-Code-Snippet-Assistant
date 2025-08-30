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
        <section className="py-24 bg-gradient-to-b from-white to-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <div className="inline-flex px-4 py-2 bg-[#6C63FF] bg-opacity-10 text-[#6C63FF] rounded-full text-sm font-medium mb-6">
                        How it Works
                    </div>
                    <h2 className="mt-4 text-4xl font-bold text-gray-900">
                        Simple, powerful code management
                    </h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                        A streamlined process from creation to collaboration.
                    </p>
                </div>

                <div className="relative">
                    <div className="hidden md:block absolute left-16 top-0 h-full w-0.5 bg-gradient-to-b from-[#6C63FF]/20 to-transparent"></div>

                    <div className="space-y-12 md:space-y-16">
                        {steps.map((step, index) => (
                            <div key={index} className="relative flex flex-col md:flex-row gap-8 group">
                                {/* Step number */}
                                <div className="flex items-start md:w-32">
                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[#6C63FF] bg-opacity-10 text-[#6C63FF] font-semibold text-lg group-hover:scale-110 transition-transform duration-300">
                                        {index + 1}
                                    </div>
                                </div>

                                <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#6C63FF]/20 transition-all duration-300">
                                    <div className="flex items-center mb-5">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#6C63FF] bg-opacity-10 text-[#6C63FF] mr-4 group-hover:scale-105 transition-transform duration-300">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 group-hover:text-[#6C63FF] transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-600 mb-6 leading-relaxed">
                                        {step.description}
                                    </p>

                                    <ul className="space-y-3">
                                        {step.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start text-gray-600">
                                                <span className="w-5 h-5 flex items-center justify-center bg-[#6C63FF] bg-opacity-10 text-[#6C63FF] rounded-full text-xs mr-3 mt-0.5">✓</span>
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
                    <div className="bg-gradient-to-r from-[#6C63FF]/5 to-[#8A63FF]/5 rounded-2xl p-10 max-w-2xl mx-auto border border-[#6C63FF]/10">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            Ready to get started?
                        </h3>
                        <p className="text-gray-600 mb-7">
                            Join developers who trust our platform for their code management.
                        </p>
                        <button className="px-8 py-3.5 bg-gradient-to-r from-[#6C63FF] to-[#8A63FF] text-white font-medium rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5">
                            Start Free Trial
                            <ArrowRight className="h-4 w-4 ml-2 inline" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;