"use client";

import * as React from "react";
import {
  LayoutDashboard,
  Music,
  ListMusic,
  Users,
  Settings,
  LogOut,
  Layers,
  ChevronRight,
  MoreHorizontal,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarRail,
  SidebarMenuAction,
} from "@/components/animate-ui/components/radix/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/animate-ui/components/radix/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { title: "Обзор", url: "/admin", icon: LayoutDashboard },
  { title: "Треки", url: "/admin/tracks", icon: Music },
  { title: "Плейлисты", url: "/admin/playlists", icon: ListMusic },
  { title: "Пользователи", url: "/admin/users", icon: Users },
];

export function AppSidebar({ user, ...props }: { user: any } & React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const initials = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase();

  const handleSignOut = () =>
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });

  return (
    <Sidebar collapsible="icon" className="border-r border-border/50 bg-background/50 backdrop-blur-xl" {...props}>
      <SidebarHeader className="p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-accent/50">
              <Link href="/admin">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-xl">
                  <Layers className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                  <span className="truncate font-black uppercase tracking-tighter italic">Mingle</span>
                  <span className="truncate text-[10px] text-muted-foreground font-mono">Control Center</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="group-data-[state=collapsed]:hidden">Медиатека</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => {
              const isActive = item.url === "/admin" 
                ? pathname === "/admin" 
                : pathname.startsWith(item.url);
                
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={item.title}
                    className={cn(
                      "transition-all duration-200",
                      isActive ? "bg-accent text-foreground font-bold" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon className={cn("size-4", isActive && "text-primary")} />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup className="mt-auto group-data-[state=collapsed]:hidden">
          <SidebarGroupLabel>Инструменты</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton className="text-muted-foreground hover:text-foreground transition-colors">
                <Settings className="size-4" />
                <span>Настройки</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  <Avatar className="h-8 w-8 rounded-lg border border-border/50">
                    {user.image && <AvatarImage src={user.image} alt={user.name || ""} />}
                    <AvatarFallback className="rounded-lg bg-zinc-900 text-zinc-100 text-xs font-bold">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[state=collapsed]:hidden">
                    <span className="truncate font-semibold text-xs">{user.name || "Администратор"}</span>
                    <span className="truncate text-[10px] text-muted-foreground">{user.email}</span>
                  </div>
                  <MoreHorizontal className="ml-auto size-4 group-data-[state=collapsed]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 rounded-xl bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl"
                side="right"
                align="end"
                sideOffset={12}
              >
                <DropdownMenuItem className="cursor-pointer focus:bg-zinc-900 mx-1 rounded-lg gap-3 py-2">
                  <Users className="size-4" /> Профиль
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-zinc-800" />
                <DropdownMenuItem 
                  className="cursor-pointer text-red-400 focus:bg-red-950/30 focus:text-red-400 mx-1 rounded-lg gap-3 py-2"
                  onClick={handleSignOut}
                >
                  <LogOut className="size-4" /> Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
