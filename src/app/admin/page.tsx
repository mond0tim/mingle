"use client";

import { useEffect, useState } from "react";
import { 
  Music, 
  ListMusic, 
  Users, 
  Clock, 
  TrendingUp, 
  Activity,
  Play,
  ArrowUpRight,
  Loader2
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import "./admin.css";

interface Stats {
  trackCount: number;
  playlistCount: number;
  userCount: number;
  totalPlayTime: number;
  topTracks: any[];
  recentHistory: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours}ч ${mins}м`;
  };

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-zinc-800" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="admin-page-header">
        <h1 className="text-5xl font-black tracking-tighter italic uppercase text-zinc-100">Command Center</h1>
        <p className="text-zinc-500 text-sm font-bold uppercase tracking-[0.3em] mt-2 opacity-70">Системная аналитика и активность</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          icon={<Users className="h-5 w-5" />} 
          label="Пользователи" 
          value={stats?.userCount ?? 0} 
          trend="+4%" 
        />
        <MetricCard 
          icon={<Music className="h-5 w-5" />} 
          label="Медиа-база" 
          value={stats?.trackCount ?? 0} 
          subValue="активных треков"
        />
        <MetricCard 
          icon={<ListMusic className="h-5 w-5" />} 
          label="Коллекции" 
          value={stats?.playlistCount ?? 0} 
        />
        <MetricCard 
          icon={<Clock className="h-5 w-5" />} 
          label="Время прослушивания" 
          value={formatTime(stats?.totalPlayTime ?? 0)} 
          isHighlight
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <Activity className="h-5 w-5 text-zinc-600" />
              Живая Активность
            </h2>
            <button className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-zinc-300 transition-colors">См. всё</button>
          </div>
          
          <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl overflow-hidden shadow-2xl">
            <div className="divide-y divide-zinc-800/50">
              {stats?.recentHistory.map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 hover:bg-zinc-800/30 transition-colors group">
                  <div className="h-10 w-10 relative flex-shrink-0">
                    <img src={item.track.cover} className="h-full w-full object-cover rounded-lg border border-zinc-800 group-hover:scale-105 transition-transform" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg">
                      <Play className="h-3 w-3 fill-white text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-zinc-100">{item.track.title}</p>
                    <p className="text-[11px] text-zinc-500 flex items-center gap-1.5">
                      <span className="text-zinc-400 font-semibold">{item.user?.name || "Аноним"}</span>
                      <span className="w-1 h-1 rounded-full bg-zinc-700" />
                      <span>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="px-2 py-0.5 rounded-md bg-zinc-950 border border-zinc-800 text-[9px] font-bold text-zinc-500 uppercase tracking-widest">
                      Listening
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Tracks */}
        <div className="space-y-6">
          <div className="flex items-center justify-between px-2">
            <h2 className="text-xl font-black uppercase italic tracking-tight flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-zinc-600" />
              Хиты Недели
            </h2>
          </div>

          <div className="space-y-3">
            {stats?.topTracks.map((track, i) => (
              <div key={i} className="bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-3 flex items-center gap-4 hover:border-zinc-700 transition-all group shadow-lg">
                <div className="text-lg font-black text-zinc-800 italic w-4">{i + 1}</div>
                <img src={track.cover} className="h-12 w-12 rounded-xl object-cover grayscale group-hover:grayscale-0 transition-all" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black truncate text-zinc-100 mb-0.5">{track.title}</p>
                  <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-tight">{track.artist}</p>
                </div>
                <div className="text-right font-mono text-[10px] text-primary font-bold">
                  {track.playCount} <span className="text-[8px] text-zinc-700">PLYS</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ icon, label, value, trend, subValue, isHighlight }: any) {
  return (
    <div className={cn(
      "p-6 rounded-3xl border transition-all duration-500 group relative overflow-hidden shadow-xl",
      isHighlight 
        ? "bg-zinc-100 border-zinc-100 text-zinc-950" 
        : "bg-zinc-900/40 border-zinc-800/50 text-zinc-100 hover:border-zinc-700"
    )}>
      {isHighlight && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 blur-[60px] -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700" />
      )}
      <div className="flex justify-between items-start mb-4">
        <div className={cn(
          "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500",
          isHighlight ? "bg-zinc-950 text-zinc-100" : "bg-zinc-800 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-12"
        )}>
          {icon}
        </div>
        {trend && (
          <div className="flex items-center gap-1 text-[10px] font-black bg-green-500/10 text-green-500 px-2 py-1 rounded-full">
            <ArrowUpRight className="h-3 w-3" />
            {trend}
          </div>
        )}
      </div>
      <div>
        <p className={cn("text-[10px] font-black uppercase tracking-[0.2em] mb-1 opacity-50", isHighlight ? "text-zinc-900" : "text-zinc-500")}>
          {label}
        </p>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-black italic tracking-tighter">{value}</span>
          {subValue && <span className="text-[10px] font-bold opacity-40 uppercase">{subValue}</span>}
        </div>
      </div>
    </div>
  );
}
