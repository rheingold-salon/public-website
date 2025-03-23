import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SignOut } from "./signout-button";

import logoImage from "public/Logo_Text_Black.png";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Newspaper, BookMarked, Users } from "lucide-react";

export function AppSidebar() {
  const pages = [
    {
      name: "dates & events",
      route: "/dates-events",
      icon: Calendar,
    },
    {
      name: "news & publications",
      route: "/news-publications",
      icon: Newspaper,
    },
    {
      name: "references & cases",
      route: "/references-cases",
      icon: BookMarked,
    },
    {
      name: "founders & team",
      route: "founders-team",
      icon: Users,
    },
  ];
  return (
    <Sidebar>
      <SidebarHeader className="p-8">
        <Link href="/">
          <Image src={logoImage} alt="RGS Logo" />
        </Link>
      </SidebarHeader>
      <SidebarContent className="p-8">
        <SidebarMenu>
          {pages.map((page) => (
            <SidebarMenuItem key={page.name}>
              <SidebarMenuButton asChild>
                <Link href={page.route}>
                  <page.icon />
                  <span>{page.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-8">
        <SignOut />
      </SidebarFooter>
    </Sidebar>
  );
}
