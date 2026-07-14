"use client";

import { useState } from "react";
import { mockNotifications } from "@/lib/mockData";
import { Bell, Package, Tag, CreditCard, Settings, Check } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import Link from "next/link";

const typeIcons = {
  order: Package,
  promotion: Tag,
  payment: CreditCard,
  system: Settings,
  delivery: Package,
};

const typeColors = {
  order:     { bg: "rgba(139,92,246,0.12)",  color: "#C4B5FD" },
  promotion: { bg: "rgba(236,72,153,0.12)",  color: "#F472B6" },
  payment:   { bg: "rgba(34,197,94,0.12)",   color: "#86EFAC" },
  system:    { bg: "rgba(59,130,246,0.12)",   color: "#93C5FD" },
  delivery:  { bg: "rgba(249,115,22,0.12)",  color: "#FDBA74" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div style={{ width: "100%", maxWidth: 640, margin: "0 auto", padding: "32px 20px 80px", boxSizing: "border-box" }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 800, fontFamily: "Outfit, sans-serif", marginBottom: 4 }}>Notifications</h1>
          {unreadCount > 0 && (
            <p style={{ color: "#6B7280", fontSize: 14 }}>{unreadCount} unread</p>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            style={{
              background: "none", border: "none", cursor: "pointer", color: "#A78BFA",
              fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6,
            }}
          >
            <Check style={{ width: 15, height: 15 }} />
            Mark all read
          </button>
        )}
      </div>

      {/* List */}
      {notifications.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 0" }}>
          <Bell style={{ width: 48, height: 48, color: "#374151", margin: "0 auto 16px" }} />
          <h3 style={{ color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 8 }}>All caught up!</h3>
          <p style={{ color: "#6B7280", fontSize: 13 }}>No notifications right now</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {notifications.map((notif) => {
            const Icon = typeIcons[notif.type] || Bell;
            const styleToken = typeColors[notif.type] || { bg: "rgba(255,255,255,0.05)", color: "#9CA3AF" };

            return (
              <div
                key={notif.id}
                onClick={() => markRead(notif.id)}
                style={{
                  display: "flex", gap: 16, padding: 16, borderRadius: 20, cursor: "pointer",
                  background: notif.isRead ? "#181424" : "#1E1830",
                  border: "1px solid",
                  borderColor: notif.isRead ? "rgba(255,255,255,0.06)" : "rgba(139,92,246,0.2)",
                  transition: "all 0.2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(139,92,246,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = notif.isRead ? "rgba(255,255,255,0.06)" : "rgba(139,92,246,0.2)"; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                  background: styleToken.bg, color: styleToken.color,
                }}>
                  <Icon style={{ width: 20, height: 20 }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <h3 style={{ fontSize: 14, fontWeight: 700, color: notif.isRead ? "#D1D5DB" : "#fff", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {notif.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                      {!notif.isRead && (
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6" }} />
                      )}
                      <span style={{ color: "#4B5563", fontSize: 11 }}>{formatRelativeTime(notif.createdAt)}</span>
                    </div>
                  </div>
                  <p style={{ color: "#6B7280", fontSize: 12, lineHeight: 1.6 }}>{notif.message}</p>
                  {notif.action && (
                    <Link
                      href={notif.action.href}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 4, color: "#C4B5FD",
                        fontSize: 12, fontWeight: 600, marginTop: 10, textDecoration: "none",
                      }}
                    >
                      {notif.action.label} →
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
