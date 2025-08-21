import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "@/utils/auth";
import { redirect } from "next/navigation";
import AppSidebar from "./Sidebar";
import TopNavbar from './TopNavbar'
import { SidebarProvider } from "@/components/ui/sidebar";


export const metadata: Metadata = {
    title: "Dashboard | Devy",
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
};

export default async function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await getServerSession(NEXT_AUTH);
    if (!session) {
        return redirect("/login");
    }
    if (session.user?.role !== "USER") {
        return redirect("/login");
    }

    return (
        <>
            <SidebarProvider>
                <div className="flex h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-teal-50/30 w-full">
                    <div >
                        <AppSidebar />
                    </div>
                    <div className="flex flex-col flex-1 overflow-hidden">
                        <TopNavbar />
                        <main className="flex-1 overflow-y-auto p-4 bg-background">
                            {children}
                        </main>
                    </div>
                </div>
            </SidebarProvider>
        </>
    );
}