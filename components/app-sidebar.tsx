"use client";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Logout from "./logout-button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  House,
  Image as ImageIcon,
  Ticket,
  Users,
  Crown,
  FileText,
} from "lucide-react"; 

import logoDash from "@/public/blackLogo.png";

const items = [
  { title: "Home", url: "/", icon: House },
  { title: "Slider", url: "/admin/dashboard/slider", icon: ImageIcon },
  { title: "Services", url: "/admin/dashboard/services", icon: Ticket },
  { title: "Clients", url: "/admin/dashboard/clients", icon: Users },
  { title: "Projects", url: "/admin/dashboard/projects", icon: Crown },
  { title: "Posts", url: "/admin/dashboard/posts", icon: FileText },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center text-black rounded">
           
            <Image src={logoDash} alt="logo"  width={300} height={300}/>
            
          </SidebarGroupLabel >
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => router.replace(item.url)}
                      className={isActive ? "bg-[#E0F2FE] text-black mt" : ""}
                    >
                      <button className="flex items-center gap-2 w-full text-left p-2 rounded cursor-pointer">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
              <div className="mt-10">
               <Logout/>
               </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
