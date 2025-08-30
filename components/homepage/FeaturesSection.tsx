import { RefreshCw, FolderOpen, GitBranch, Zap, Shield, Users } from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: <RefreshCw className="h-6 w-6" />,
            title: "AI-Powered Refactoring",
            description: "Automatically improve your code quality with intelligent refactoring suggestions, performance optimizations, and best practice recommendations.",
            highlight: "Save 70% time on code reviews"
        },
        {
            icon: <FolderOpen className="h-6 w-6" />,
            title: "Smart Organization",
            description: "Keep your snippet library organized with custom tags, projects, and AI-powered categorization. Find any code snippet instantly with powerful search.",
            highlight: "10x faster code discovery"
        },
        {
            icon: <GitBranch className="h-6 w-6" />,
            title: "Version Control & Sharing",
            description: "Track all changes to your snippets with built-in version control. Share your best code via secure links with team members and collaborators.",
            highlight: "Enterprise-grade security"
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Instant Code Generation",
            description: "Generate production-ready code snippets from natural language descriptions. Transform ideas into working code in seconds.",
            highlight: "3x faster development"
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Enterprise Security",
            description: "Bank-level encryption, SOC 2 compliance, and private cloud options. Your code stays secure and private with advanced access controls.",
            highlight: "SOC 2 Type II certified"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Team Collaboration",
            description: "Real-time collaboration, code reviews, and team libraries. Share knowledge and maintain coding standards across your organization.",
            highlight: "Trusted by 500+ teams"
        }
    ];

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white px-6 py-24 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex px-4 py-2 bg-[#6C63FF] bg-opacity-10 text-[#6C63FF] rounded-full text-sm font-medium mb-6">
                        Core Features
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                        Everything you need to manage
                        <span className="block bg-gradient-to-r from-gray-800 to-[#6C63FF] bg-clip-text text-transparent">your code snippets efficiently</span>
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                        From AI-powered refactoring to enterprise-grade security, Devy provides all the tools modern development teams need.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="group p-8 rounded-2xl border border-gray-100 hover:border-[#6C63FF]/20 hover:shadow-lg transition-all duration-300 bg-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#6C63FF]/5 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="relative z-10">
                                <div className="flex justify-center mb-6">
                                    <div className="p-3 bg-[#6C63FF] bg-opacity-10 rounded-xl text-[#6C63FF] group-hover:scale-110 transition-transform duration-300">
                                        {feature.icon}
                                    </div>
                                </div>

                                <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center group-hover:text-[#6C63FF] transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                <p className="text-gray-600 text-center mb-5 leading-relaxed">
                                    {feature.description}
                                </p>

                                <div className="text-center">
                                    <span className="inline-block px-3 py-1.5 bg-[#6C63FF] bg-opacity-10 text-[#6C63FF] rounded-full text-sm font-medium">
                                        {feature.highlight}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-16">
                    <p className="text-gray-600 mb-7 text-lg">
                        Ready to transform your development workflow?
                    </p>
                    <button className="bg-gradient-to-r from-[#6C63FF] to-[#8A63FF] hover:from-[#5851dd] hover:to-[#7561dd] text-white px-8 py-4 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl transform ">
                        Start Your Free Trial
                    </button>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;