"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/animate-ui/components/radix/dialog";
import {
  Loader2,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Ban,
  UserCheck,
  Activity,
  Calendar,
  Lock,
  Pencil
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DataTable } from "@/components/admin/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { cn } from "@/lib/utils";

interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
  role: string;
  banned: boolean;
  loginCount: number;
  lastLoginAt: string | null;
  totalPlayTime: number;
  createdAt: string;
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Partial<User> | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users?limit=1000");
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleToggleBan = async (user: User) => {
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, banned: !user.banned }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Ban toggle error", err);
    }
  };

  const handleRoleChange = async (user: User) => {
    const nextRole = user.role === "ADMIN" ? "USER" : "ADMIN";
    try {
      const res = await fetch("/api/admin/users", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: user.id, role: nextRole }),
      });
      if (res.ok) fetchUsers();
    } catch (err) {
      console.error("Role change error", err);
    }
  };

  const formatPlayTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    if (hours > 0) return `${hours}ч ${mins}м`;
    return `${mins}м`;
  };

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "name",
      header: "Member",
      cell: ({ row }) => {
        const user = row.original;
        const initials = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase();
        return (
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => { setEditingUser(user); setIsEditOpen(true); }}>
            <div className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-100 flex-shrink-0 overflow-hidden group-hover:border-primary/50 transition-colors">
              {user.image
                ? <img src={user.image} alt={user.name || ""} className="w-full h-full object-cover" />
                : initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold truncate max-w-[160px] text-zinc-100 text-sm group-hover:text-primary transition-colors">{user.name || "MEMBER"}</span>
              <span className="text-[11px] text-zinc-600 truncate">{user.email}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Access",
      cell: ({ row }) => {
        const isAdmin = row.original.role === "ADMIN";
        return (
          <span className={cn(
            "px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border",
            isAdmin
              ? "bg-zinc-100 text-zinc-900 border-zinc-100 shadow-[0_0_10px_rgba(255,255,255,0.05)]"
              : "bg-transparent text-zinc-600 border-zinc-800"
          )}>
            {row.original.role}
          </span>
        );
      },
    },
    {
        accessorKey: "totalPlayTime",
        header: "Insights",
        cell: ({ row }) => (
          <div className="flex flex-col">
            <span className="text-xs font-bold text-zinc-200">{formatPlayTime(row.original.totalPlayTime || 0)}</span>
            <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-tight">Listening</span>
          </div>
        ),
    },
    {
      accessorKey: "banned",
      header: "Status",
      cell: ({ row }) => {
        const isBanned = row.original.banned;
        return (
          <div className="flex items-center gap-1.5">
            <div className={cn(
              "w-1.5 h-1.5 rounded-full",
              isBanned ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" : "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.3)]"
            )} />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", isBanned ? "text-red-500" : "text-zinc-500")}>
              {isBanned ? "Banned" : "Active"}
            </span>
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <TooltipProvider>
            <div className="flex items-center justify-end gap-1.5">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-500 hover:text-zinc-100 hover:bg-zinc-800"
                    onClick={() => handleRoleChange(user)}
                  >
                    {user.role === "ADMIN"
                      ? <ShieldAlert className="h-4 w-4" />
                      : <ShieldCheck className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-100 text-xs">
                  {user.role === "ADMIN" ? "Разжаловать" : "Сделать админом"}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-zinc-600 hover:text-red-500 hover:bg-red-950/30"
                    onClick={() => handleToggleBan(user)}
                  >
                    {user.banned
                      ? <UserCheck className="h-4 w-4" />
                      : <Ban className="h-4 w-4" />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-100 text-xs text-right">
                  {user.banned ? "Разбанить" : "Забанить"}
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        );
      },
    },
  ], []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-zinc-800/50">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-zinc-100 uppercase italic">MEMBERSHIP</h1>
          <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] opacity-70">Централизованный контроль доступа и аналитика</p>
        </div>
        <div className="flex gap-4 p-4 px-6 bg-zinc-900/40 border border-zinc-800 rounded-2xl shadow-xl">
          <div className="flex flex-col items-start gap-0.5">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Active Members</span>
            <span className="text-2xl font-black text-zinc-100 tracking-tighter italic leading-none">{users.length}</span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex h-96 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-zinc-800" />
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={users}
          searchKey="email"
          searchPlaceholder="Поиск по Email или имени..."
        />
      )}

      {/* Detail Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#0b0b0b] border-zinc-800 text-zinc-100 max-w-lg rounded-3xl overflow-hidden shadow-2xl p-0 gap-0">
          <div className="h-24 bg-gradient-to-r from-zinc-800 to-zinc-900 relative">
             <div className="absolute -bottom-10 left-8 h-20 w-20 rounded-3xl bg-zinc-950 border-4 border-[#0b0b0b] shadow-2xl flex items-center justify-center overflow-hidden">
                {editingUser?.image
                  ? <img src={editingUser.image} alt="" className="w-full h-full object-cover" />
                  : <span className="text-2xl font-black italic">{editingUser?.name?.[0]?.toUpperCase() || "M"}</span>}
             </div>
          </div>

          <div className="p-8 pt-14 space-y-6">
            <div>
              <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">
                {editingUser?.name || "Anonymous Member"}
              </h2>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mt-1">{editingUser?.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Listening Time</p>
                  <p className="text-xl font-black text-primary italic">{formatPlayTime(editingUser?.totalPlayTime || 0)}</p>
               </div>
               <div className="p-4 bg-zinc-900/40 border border-zinc-800/50 rounded-2xl space-y-1">
                  <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Login Count</p>
                  <p className="text-xl font-black text-zinc-200 italic">{editingUser?.loginCount || 0}</p>
               </div>
            </div>

            <div className="space-y-4">
               <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Member ID</span>
                  <span className="text-[10px] font-mono text-zinc-300">{editingUser?.id}</span>
               </div>
               <div className="flex items-center justify-between py-3 border-b border-zinc-800/50">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Registered</span>
                  <span className="text-xs font-bold text-zinc-300">
                    {editingUser?.createdAt ? new Date(editingUser.createdAt).toLocaleDateString("ru-RU") : "—"}
                  </span>
               </div>
               <div className="flex items-center justify-between py-3">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Last Seen</span>
                  <span className="text-xs font-bold text-zinc-300">
                    {editingUser?.lastLoginAt ? new Date(editingUser.lastLoginAt).toLocaleString("ru-RU", { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : "Never"}
                  </span>
               </div>
            </div>
          </div>

          <DialogFooter className="p-6 bg-zinc-900/30 border-t border-zinc-800/50">
            <Button variant="ghost" className="w-full text-zinc-500 hover:text-zinc-100 font-bold uppercase tracking-widest text-xs" onClick={() => setIsEditOpen(false)}>
              Close Profile
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
