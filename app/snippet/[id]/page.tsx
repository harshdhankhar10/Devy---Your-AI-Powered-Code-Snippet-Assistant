import prisma from '@/lib/prisma'
import ViewPublicSnippet from '@/components/ViewPublicSnippet'
import Navbar from '@/components/Navbar'
import type { Metadata } from "next";

export async function generateMetadata({
    params
}: {
    params: { id: string }
}): Promise<Metadata> {
    const snippet = await prisma.snippet.findUnique({
        where: {
            id: params.id,
            isPublic: true
        }
    })

    if (!snippet) {
        return {
            title: "Snippet Not Found | Devy",
            description: "This snippet doesn't exist or isn't publicly available"
        }
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://devy.dev"
    const snippetUrl = `${baseUrl}/snippets/${params.id}`
    const snippetLanguage = snippet.langugae.charAt(0).toUpperCase() + snippet.langugae.slice(1)

    return {
        title: `${snippet.title} | ${snippetLanguage} Snippet | Devy`,
        description: snippet.description || `Explore this ${snippet.langugae} code snippet on Devy - ${snippet.title}`,

        keywords: [
            `${snippet.langugae} code snippet`,
            ...snippet.tags,
            "code snippet manager",
            "AI code assistant",
            "developer productivity tool",
            "share code snippets"
        ],

        metadataBase: new URL(baseUrl),

        openGraph: {
            title: `${snippet.title} | Devy`,
            description: snippet.description || `Explore this ${snippet.langugae} code snippet on Devy`,
            url: snippetUrl,
            siteName: "Devy",
            type: "article",
            publishedTime: snippet.createdAt.toISOString(),
            modifiedTime: snippet.updatedAt.toISOString(),
            tags: snippet.tags,
            authors: snippet.userId ? [`users/${snippet.userId}`] : undefined,
            images: [
                {
                    url: `${baseUrl}/api/og-snippet?title=${encodeURIComponent(snippet.title)}&language=${snippet.langugae}`,
                    width: 1200,
                    height: 630,
                    alt: `${snippet.title} ${snippet.langugae} code snippet`
                }
            ]
        },

        twitter: {
            card: "summary_large_image",
            title: `${snippet.title} | Devy Code Snippet`,
            description: snippet.description || `Check out this ${snippet.langugae} code snippet on Devy`,
            images: [`${baseUrl}/api/og-snippet?title=${encodeURIComponent(snippet.title)}&language=${snippet.langugae}`]
        },

        alternates: {
            canonical: snippetUrl
        }
    }
}

export default async function PublicSnippetPage({
    params
}: {
    params: { id: string }
}) {
    const snippet = await prisma.snippet.findUnique({
        where: {
            id: params.id,
            isPublic: true
        },
        include: {
            user: {
                select: {
                    name: true,
                    profilePicture: true
                }
            }
        }
    })

    if (!snippet) {
        return (
            <>
                <Navbar />
                <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center p-8 max-w-md">
                        <h1 className="text-2xl font-bold mb-2">Snippet Not Found</h1>
                        <p className="text-muted-foreground">
                            This snippet doesn't exist or isn't publicly available
                        </p>
                    </div>
                </div>
            </>
        )
    }

    // Increment views async
    await prisma.snippet.update({
        where: { id: params.id },
        data: { views: { increment: 1 } }
    })

    return (
        <>
            <Navbar />
            <ViewPublicSnippet snippet={JSON.parse(JSON.stringify(snippet))} />
        </>
    )
}