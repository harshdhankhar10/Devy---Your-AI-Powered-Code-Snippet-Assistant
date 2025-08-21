import { RefreshCw, FolderOpen, GitBranch, Zap, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <RefreshCw className="h-8 w-8 text-blue-600" />,
            title: "AI-Powered Refactoring",
            description: "Automatically improve your code quality with intelligent refactoring suggestions, performance optimizations, and best practice recommendations.",
            highlight: "Save 70% time on code reviews"
        },
        {
            icon: <FolderOpen className="h-8 w-8 text-green-600" />,
            title: "Smart Organization",
            description: "Keep your snippet library organized with custom tags, projects, and AI-powered categorization. Find any code snippet instantly with powerful search.",
            highlight: "10x faster code discovery"
        },
        {
            icon: <GitBranch className="h-8 w-8 text-purple-600" />,
            title: "Version Control & Sharing",
            description: "Track all changes to your snippets with built-in version control. Share your best code via secure links with team members and collaborators.",
            highlight: "Enterprise-grade security"
        },
        {
            icon: <Zap className="h-8 w-8 text-yellow-600" />,
            title: "Instant Code Generation",
            description: "Generate production-ready code snippets from natural language descriptions. Transform ideas into working code in seconds.",
            highlight: "3x faster development"
        },
        {
            icon: <Shield className="h-8 w-8 text-red-600" />,
            title: "Enterprise Security",
            description: "Bank-level encryption, SOC 2 compliance, and private cloud options. Your code stays secure and private with advanced access controls.",
            highlight: "SOC 2 Type II certified"
        },
        {
            icon: <Users className="h-8 w-8 text-indigo-600" />,
            title: "Team Collaboration",
            description: "Real-time collaboration, code reviews, and team libraries. Share knowledge and maintain coding standards across your organization.",
            highlight: "Trusted by 500+ teams"
        }
    ];

    return (
        <section className="bg-white px-6 py-24 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm  mb-6">
                        Core Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 ">
                        Everything you need to manage
                        <span className="block text-blue-600">your code snippets efficiently</span>
                    </h2>
                    <p className="text-xl text-gray-600  max-w-3xl mx-auto">
                        From AI-powered refactoring to enterprise-grade security, Devy provides all the tools modern development teams need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl border border-gray-100  hover:shadow-sm transition-all duration-300 bg-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-50 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            <div className="relative z-10">
                                <div className="flex justify-center mb-6">
                                    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors duration-300">
                                        {feature.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4  text-center">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600  text-center mb-4 leading-relaxed">
                                    {feature.description}
                                </p>

                                <div className="text-center">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs  font-semibold">
                                        {feature.highlight}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-gray-600  mb-6">
                        Ready to transform your development workflow?
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl  transition-colors duration-300 shadow-lg hover:shadow-xl">
                        Start Your Free Trial
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
