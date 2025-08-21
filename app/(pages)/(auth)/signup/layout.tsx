import type { Metadata } from "next";


export const metadata: Metadata = {
    title: "Sign Up | Devy",
    description:
        "Create your Devy account to start organizing, refactoring, and sharing your code snippets with the power of AI.",
    keywords: [
        "Devy Sign Up",
        "create Devy account",
        "AI snippet manager",
        "developer tools signup",
        "code assistant AI",
        "refactor code online",
        "code snippet platform"
    ],
    metadataBase: new URL("https://devy.dev"),
    openGraph: {
        title: "Sign Up | Devy",
        description:
            "Sign up for Devy to manage your code snippets, improve them with AI, and streamline your development workflow.",
        url: "https://devy.dev/signup",
        siteName: "Devy",
        type: "website",
        images: [
            {
                url: "https://devy.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "Devy logo with a modern developer UI background"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Sign Up | Devy",
        description:
            "Join Devy to save, enhance, and reuse your best code snippets with built-in AI support. Code smarter, not harder.",
        images: ["https://devy.dev/og-image.png"]
    },
    authors: [{ name: "Harsh Dhankhar" }],
    creator: "Devy",
    themeColor: "#2563EB"
};

export default function SignUpLayout({
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