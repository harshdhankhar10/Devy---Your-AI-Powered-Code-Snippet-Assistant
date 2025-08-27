import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";



const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Devy | AI Code Snippet Manager for Developers",
    description:
        "Devy is an AI-powered snippet manager that helps developers store, organize, and enhance their reusable code. Refactor, comment, and transform your trusted code instantly with AI.",

    keywords: [
        "code snippet manager",
        "AI code assistant",
        "developer productivity tool",
        "refactor code with AI",
        "code management app",
        "share code snippets",
        "developer tools",
        "VS Code snippet extension",
        "AI-powered refactoring",
        "AI code explainer",
        "typescript refactor",
        "snippet manager online",
        "Dev tool India",
        "AI tools for programmers"
    ],

    metadataBase: new URL("https://devy.dev"),

    openGraph: {
        title: "Devy | AI Code Snippet Manager for Developers",
        description:
            "Organize, reuse, and enhance your code snippets with Devy. Refactor, comment, and transform your trusted code using AI — faster, cleaner, smarter.",
        url: "https://devy.dev",
        siteName: "Devy",
        type: "website",
        images: [
            {
                url: "https://devy.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "Devy logo and tagline over a sleek developer UI background"
            }
        ]
    },

    twitter: {
        card: "summary_large_image",
        title: "Devy | AI-Powered Code Snippet Assistant",
        description:
            "Devy lets developers store, share, and improve their code snippets with AI. Refactor or explain any code instantly. Perfect for students, freelancers, and teams.",
        images: ["https://devy.dev/og-image.png"]
    },

    authors: [{ name: "Harsh Dhankhar" }],
    creator: "Devy",

    themeColor: "#2563EB"
};

export default function AIRefactorLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
}
