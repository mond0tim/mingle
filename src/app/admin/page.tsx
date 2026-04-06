"use client";

import { useEffect, useState } from "react";
import { Music, ListMusic, Users } from "lucide-react";
import "./admin.css";

interface Stats {
  trackCount: number;
  playlistCount: number;
  userCount: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="admin-page-header">
        <h1>Dashboard</h1>
        <p>Обзор контента и статистика платформы</p>
      </div>

      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-label">
            <Music size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            Треки
          </div>
          <div className="stat-value">{stats?.trackCount ?? "—"}</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-label">
            <ListMusic size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            Плейлисты
          </div>
          <div className="stat-value">{stats?.playlistCount ?? "—"}</div>
        </div>

        <div className="admin-stat-card">
          <div className="stat-label">
            <Users size={14} style={{ display: "inline", marginRight: 6, verticalAlign: "middle" }} />
            Пользователи
          </div>
          <div className="stat-value">{stats?.userCount ?? "—"}</div>
        </div>
      </div>
    </>
  );
}
