"use client";
import { AppSidebar } from "@/components/admin/AppSidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/animate-ui/components/radix/sidebar";
import { motion } from "framer-motion";

interface AdminShellProps {
  user: { name?: string | null; email: string; image?: string | null };
  children: React.ReactNode;
}

export default function AdminShell({ user, children }: AdminShellProps) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-background text-foreground overflow-hidden font-sans">
        <AppSidebar user={user} />
        
        <SidebarInset className="relative flex-1 overflow-hidden bg-background">
          <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-border/50 px-6 backdrop-blur-md bg-background/50 sticky top-0 z-10 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-accent/30 border border-border/20">
                <span className="text-[10px] font-black uppercase tracking-widest text-primary/70">Mingle Admin</span>
                <span className="text-[10px] text-muted-foreground font-mono">v1.6.0</span>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto scroll-smooth custom-scrollbar h-[calc(100vh-64px)]">
            <div className="max-w-7xl mx-auto p-6 md:p-10 lg:p-12 min-h-full">
              <motion.div
                initial={{ opacity: 0, y: 15, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              >
                {children}
              </motion.div>
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
