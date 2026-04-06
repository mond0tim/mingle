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
  DialogDescription,
} from "@/components/animate-ui/components/radix/dialog";
import {
  Loader2,
  Mail,
  ShieldAlert,
  ShieldCheck,
  Ban,
  UserCheck,
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

  const columns = useMemo<ColumnDef<User>[]>(() => [
    {
      accessorKey: "name",
      header: "Member",
      cell: ({ row }) => {
        const user = row.original;
        const initials = user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase();
        return (
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-100 flex-shrink-0 overflow-hidden">
              {user.image
                ? <img src={user.image} alt={user.name || ""} className="w-full h-full object-cover" />
                : initials}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-semibold truncate max-w-[160px] text-zinc-100 text-sm">{user.name || "MEMBER"}</span>
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
              ? "bg-zinc-100 text-zinc-900 border-zinc-100"
              : "bg-transparent text-zinc-600 border-zinc-800"
          )}>
            {row.original.role}
          </span>
        );
      },
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
              isBanned ? "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]" : "bg-zinc-400"
            )} />
            <span className={cn("text-[10px] font-bold uppercase tracking-widest", isBanned ? "text-red-500" : "text-zinc-400")}>
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
                <TooltipContent className="bg-zinc-900 border-zinc-800 text-zinc-100 text-xs">
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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800/50">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tighter text-zinc-100 uppercase italic">Members</h1>
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em]">Контроль доступа / Permissions</p>
        </div>
        <div className="flex gap-4 p-3 px-5 bg-zinc-900/40 border border-zinc-800/50 rounded-xl">
          <div className="flex flex-col items-start gap-1">
            <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Total Members</span>
            <span className="text-xl font-black text-zinc-100 tracking-tighter italic">{users.length}</span>
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
          searchPlaceholder="ID / Email search..."
        />
      )}

      {/* Detail Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="bg-[#0b0b0b] border-zinc-800 text-zinc-100 max-w-lg rounded-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold uppercase italic tracking-tight">User Metadata</p>
                <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Platform Security Config</p>
              </div>
              <div className="h-10 w-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-600 flex-shrink-0">
                <Mail className="h-4 w-4" />
              </div>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-5 py-2">
            <div className="flex items-center gap-5 p-5 bg-zinc-900/30 border border-zinc-800/50 rounded-xl">
              <div className="h-16 w-16 rounded-2xl bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xl font-black text-zinc-100 flex-shrink-0 overflow-hidden">
                {editingUser?.image
                  ? <img src={editingUser.image} alt="" className="w-full h-full object-cover" />
                  : editingUser?.name?.[0]?.toUpperCase() || "M"}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">Registered Name</p>
                <p className="text-lg font-bold text-white italic tracking-tight">{editingUser?.name || "Anonymous Member"}</p>
              </div>
            </div>

            <div>
              <Label className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Authentication Email</Label>
              <Input
                className="mt-1.5 bg-zinc-900/50 border-zinc-800 text-zinc-400 font-mono text-sm"
                value={editingUser?.email || ""}
                readOnly
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 bg-zinc-900/20 border border-zinc-800 rounded-xl">
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-1">Current Role</p>
                <p className="text-sm font-bold text-zinc-200 uppercase">{editingUser?.role}</p>
              </div>
              <div className="p-4 bg-zinc-900/20 border border-zinc-800 rounded-xl">
                <p className="text-[9px] font-bold uppercase tracking-widest text-zinc-600 mb-1">Joined Date</p>
                <p className="text-sm font-bold text-zinc-200">
                  {editingUser?.createdAt
                    ? new Date(editingUser.createdAt).toLocaleDateString("ru-RU")
                    : "—"}
                </p>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" className="border-zinc-800 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 w-full" onClick={() => setIsEditOpen(false)}>
              Close Config
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
