import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Users } from "lucide-react";

const CTASection = () => {
    return (
        <div className="bg-gradient-to-br from-blue-700 to-blue-900 px-6 py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/5 opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-800/10 rounded-full blur-3xl"></div>

            <div className="max-w-5xl mx-auto text-center relative z-10">
                <div className="mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Build your professional <br />
                        <span className="text-blue-200">code library today</span>
                    </h2>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        Join thousands of developers who trust our platform to organize, optimize, and share their code.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                    <Button className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 text-lg shadow-lg hover:shadow-xl transition-all">
                        Start Free Trial
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                    <Button variant="outline" className=" border-white/30 hover:bg-white/10 px-8 py-4 text-lg">
                        Schedule Demo
                    </Button>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
                    {[
                        {
                            icon: <Shield className="h-6 w-6" />,
                            title: "Enterprise Security",
                            description: "SOC 2 certified & encrypted"
                        },
                        {
                            icon: <Zap className="h-6 w-6" />,
                            title: "High Performance",
                            description: "99.9% uptime guarantee"
                        },
                        {
                            icon: <Users className="h-6 w-6" />,
                            title: "Trusted by Teams",
                            description: "50K+ developers worldwide"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur-sm">
                            <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center mb-4 mx-auto">
                                {feature.icon}
                            </div>
                            <h3 className="text-white font-medium mb-2">{feature.title}</h3>
                            <p className="text-blue-100 text-sm">{feature.description}</p>
                        </div>
                    ))}
                </div>

                <div className="inline-block bg-white/5 px-6 py-4 rounded-lg border border-white/10 backdrop-blur-sm">
                    <p className="text-blue-100 text-sm">
                        <span className="font-medium text-white">30-day money-back guarantee.</span> Cancel anytime.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CTASection;