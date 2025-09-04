import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Devy Bins: Free & Secure Pastebin to Share Code Online",
    description: "Quickly share code, logs, or text with Devy Bins. A free, secure, and anonymous pastebin with syntax highlighting and auto-expiring links. No sign-up required.",
    keywords: [
        "pastebin",
        "code sharing",
        "anonymous pastebin",
        "secure pastebin",
        "text sharing",
        "share code online",
        "expiring pastebin",
        "log share",
        "Devy Bins"
    ],
    metadataBase: new URL("https://devy.dev"),
    openGraph: {
        title: "Devy Bins: Secure & Anonymous Code Sharing",
        description:
            "Share code snippets, log files, or any text securely and anonymously. Links expire automatically. Powered by Devy.",
        url: "https://devy.dev/bins",
        siteName: "Devy",
        type: "website",
        images: [
            {
                url: "https://devy.dev/og-image.png",
                width: 1200,
                height: 630,
                alt: "Devy logo with an illustration of code sharing."
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Devy Bins: Free & Secure Pastebin",
        description:
            "The easiest way to share code securely. Create an anonymous, expiring paste with syntax highlighting. No sign-up required.",
        images: ["https://devy.dev/og-image.png"]
    },
    authors: [{ name: "Harsh Dhankhar" }],
    creator: "Devy",
    themeColor: "#6C63FF"
};

export default function BinLayout({
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