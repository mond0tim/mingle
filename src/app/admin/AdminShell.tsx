"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  Music,
  ListMusic,
  Users,
  LayoutDashboard,
  LogOut,
  Settings,
  MoreVertical,
  Layers,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { href: "/admin", label: "Обзор", icon: LayoutDashboard },
  { href: "/admin/tracks", label: "Треки", icon: Music },
  { href: "/admin/playlists", label: "Плейлисты", icon: ListMusic },
  { href: "/admin/users", label: "Пользователи", icon: Users },
];

interface AdminShellProps {
  user: { name?: string | null; email: string; image?: string | null };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  const pathname = usePathname();
  const initials = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase();

  const handleSignOut = () =>
    signOut({ fetchOptions: { onSuccess: () => { window.location.href = "/"; } } });

  return (
    <div className="flex h-screen w-full bg-[#09090b] text-zinc-100 overflow-hidden font-sans">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800/50 bg-[#09090b]">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-3 group mb-10">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 group-hover:bg-zinc-100 group-hover:text-zinc-900 transition-all duration-300 shadow-2xl">
              <Layers className="h-5 w-5" />
            </div>
            <span className="font-bold text-xl tracking-tight uppercase italic drop-shadow-sm">mingle</span>
          </Link>

          <nav className="space-y-1.5 mt-2">
            {navItems.map((item) => {
              const isActive = item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-medium",
                    isActive
                      ? "text-zinc-100"
                      : "text-zinc-500 hover:text-zinc-100 hover:bg-zinc-900/50"
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 bg-zinc-900 border border-zinc-800 rounded-xl"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <item.icon className={cn("relative h-5 w-5 z-10", isActive ? "text-zinc-100" : "group-hover:scale-110 transition-transform")} />
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User card */}
        <div className="mt-auto p-6">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="h-8 w-8 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center text-xs font-bold flex-shrink-0 border border-zinc-800 overflow-hidden">
                {user.image
                  ? <img src={user.image} alt={user.name || ""} className="w-full h-full object-cover" />
                  : initials}
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-bold truncate text-zinc-100">{user.name || "Admin"}</span>
                <span className="text-[10px] text-zinc-500 truncate leading-none mt-1">{user.email}</span>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center justify-center h-8 w-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 cursor-pointer transition-colors flex-shrink-0">
                    <Settings className="h-4 w-4 text-zinc-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100">
                  <DropdownMenuItem className="cursor-pointer focus:bg-zinc-800">
                    <Users className="h-4 w-4 mr-2" /> Профиль
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-zinc-800" />
                  <DropdownMenuItem
                    className="cursor-pointer text-red-400 focus:bg-zinc-800 focus:text-red-400"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-4 w-4 mr-2" /> Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden bg-[#09090b]">
        {/* Mobile header */}
        <header className="md:hidden flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-[#09090b]">
          <Link href="/" className="flex items-center gap-2">
            <Layers className="h-6 w-6 text-zinc-100" />
            <span className="font-bold text-lg tracking-tight uppercase italic">mingle</span>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 cursor-pointer">
                <MoreVertical className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-900 border-zinc-800 text-zinc-100">
              {navItems.map((item) => (
                <DropdownMenuItem
                  key={item.href}
                  className="cursor-pointer focus:bg-zinc-800"
                  onClick={() => { window.location.href = item.href; }}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator className="bg-zinc-800" />
              <DropdownMenuItem
                className="cursor-pointer text-red-400 focus:bg-zinc-800 focus:text-red-400"
                onClick={handleSignOut}
              >
                <LogOut className="h-4 w-4 mr-2" /> Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-7xl mx-auto p-6 md:p-12 lg:p-16">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            >
              {children}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
}
