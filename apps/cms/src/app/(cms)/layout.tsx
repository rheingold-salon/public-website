import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export const metadata: Metadata = {
    title: "RGS - Website Content Managment System",
    description: "The content managment system for the RGS public website",
    icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en" className={`${GeistSans.variable}`}>
            <body>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="min-h-screen w-full">
                        {children}
                    </main>
                </SidebarProvider>
            </body>
        </html>
    );
}
