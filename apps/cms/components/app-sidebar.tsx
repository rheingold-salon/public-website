import {
    Sidebar,
    SidebarHeader,
    SidebarContent,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton
} from "@/components/ui/sidebar";
import Link from "next/link";

export function AppSidebar() {
    const pages = [
        {
            name: "home page",
            route: "/",
        },
        {
            name: "dates & events",
            route: "/dates-events",
        },
        {
            name: "founders & team",
            route: "/founders-team"
        },
        {
            name: "news & publications",
            route: "/news-publications"
        },
        {
            name: "references & cases",
            route: "/references-cases",
        }
    ]
    return (
        <Sidebar>
            <SidebarHeader>
                Editable Pages
            </SidebarHeader>
            <SidebarContent>
                <SidebarMenu>
                    {pages.map((page) => (
                        <SidebarMenuItem key={page.name}>
                            <SidebarMenuButton>
                                <Link href={page.route}>
                                    <span>{page.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>
        </Sidebar>
    )
}
