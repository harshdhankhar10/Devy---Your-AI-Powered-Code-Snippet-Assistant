import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Login | Devy",
    description: "Log in to your Devy account to manage, refactor, and enhance your code snippets using AI-powered tools.",
    keywords: [
        "Devy login",
        "Devy sign in",
        "code snippet manager login",
        "AI code assistant",
        "developer snippet tool"
    ],
    metadataBase: new URL("https://devy.dev"),
    openGraph: {
        title: "Login | Devy",
        description:
            "Access your Devy dashboard to manage your code snippets, run AI refactoring, and streamline your developer workflow.",
        url: "https://devy.dev/login",
        siteName: "Devy",
        type: "website",
        images: [
            {
                url: "https://devy.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "Devy logo and developer-friendly UI on a clean background."
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Login | Devy",
        description:
            "Sign in to Devy to access your personal code snippets, use AI enhancements, and stay productive with clean, reusable code.",
        images: ["https://devy.dev/og-image.png"]
    },
    authors: [{ name: "Harsh Dhankhar" }],
    creator: "Devy",
    themeColor: "#2563EB"
};


export default function LoginLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div>
            {children}
        </div>
    );
}