"use client"

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Brain, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

const NotFound = () => {
    const location = usePathname();

    return (
        <>
            <Navbar />
            <div className="min-h-screen pt-4 bg-background relative overflow-hidden">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-accent-blue/10 animate-pulse"></div>
                    <div className="absolute top-40 right-32 w-24 h-24 rounded-full bg-accent-indigo/10 animate-pulse delay-1000"></div>
                    <div className="absolute bottom-32 left-1/3 w-40 h-40 rounded-full bg-accent-emerald/10 animate-pulse delay-2000"></div>
                    <div className="absolute bottom-20 right-20 w-28 h-28 rounded-full bg-accent-amber/10 animate-pulse delay-500"></div>
                </div>

                <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
                    <div className="text-center max-w-2xl mx-auto">


                        <div className="mb-6">
                            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-accent-blue via-accent-indigo to-accent-blue bg-clip-text text-transparent font-manrope">
                                404
                            </h1>
                        </div>

                        <div className="mb-8 space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold text-primary font-manrope">
                                Oops! This path doesn't exist
                            </h2>
                            <p className="text-lg text-muted-foreground max-w-md mx-auto leading-relaxed">
                                It seems you've wandered into uncharted territory. Let's get you back to your mental wellness journey.
                            </p>
                            <div className="text-sm text-muted-foreground font-mono bg-muted/20 px-4 py-2 rounded-lg inline-block">
                                Attempted route: <span className="text-accent-blue">{location}</span>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button asChild size="lg" className="bg-accent-amber hover:bg-accent-amber/90 text-white px-8">
                                <Link href="/">
                                    <Home className="w-5 h-5 mr-2" />
                                    Return Home
                                </Link>
                            </Button>

                            <Button asChild variant="outline" size="lg" className="border-accent-blue text-accent-blue hover:bg-accent-blue hover:text-white px-8">
                                <button onClick={() => window.history.back()}>
                                    <ArrowLeft className="w-5 h-5 mr-2" />
                                    Go Back
                                </button>
                            </Button>
                        </div>
                        <div className="mt-12 pt-8 border-t border-border/50">
                            <p className="text-sm text-muted-foreground mb-4">
                                Looking for something specific? Try these:
                            </p>
                            <div className="flex flex-wrap justify-center gap-6 text-sm">
                                <Link href="/" className="text-accent-blue hover:text-accent-indigo transition-colors flex items-center gap-1">
                                    <Search className="w-4 h-4" />
                                    Explore Features
                                </Link>
                                <Link href="/" className="text-accent-blue hover:text-accent-indigo transition-colors flex items-center gap-1">
                                    <Brain className="w-4 h-4" />
                                    AI Chat Demo
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-blue/50 to-transparent"></div>
            </div>
        </>
    );
};

export default NotFound;
