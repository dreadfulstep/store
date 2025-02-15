"use client";

import { useState } from "react";
import { Home, User, Settings, LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Button from "@/components/Button";

const sidebarLinks = [
  { name: "Home", href: "/dashboard", icon: Home },
  { name: "Profile", href: "/profile", icon: User },
  { name: "Settings", href: "/settings", icon: Settings },
  { name: "Logout", href: "/login", icon: LogOut },
];

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside
        className={`h-full bg-surface-a10/20 text-light-a0 transition-all ${
          isCollapsed ? "w-16" : "w-64"
        } flex flex-col border-r border-border`}
      >
        <div className="flex items-center justify-between mb-6 p-4">
          {!isCollapsed && (
            <h1 className="text-xl font-bold text-primary-a50">Dashboard</h1>
          )}
          <Button
            variant="ghost"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg"
          >
            <Menu size={20} className="text-light-a0" />
          </Button>
        </div>

        <nav className="flex flex-col space-y-2">
          {sidebarLinks.map(({ name, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 p-3 border-l-4 transition ${
                pathname === href
                  ? "bg-primary-a10/20 border-primary-a10 text-white"
                  : "text-neutral-400 hover:text-neutral-200 border-transparent hover:bg-primary-a10/20 hover:border-primary-a10"
              }`}
            >
              <Icon size={20} />
              {!isCollapsed && <span className="text-sm">{name}</span>}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-surface-a0 text-light-a0">
        <h1 className="text-3xl font-bold text-primary-a50">Overview</h1>
        <p className="mt-2 text-neutral-400">Welcome to your dashboard.</p>

        {/* Dashboard Widgets or Content Here */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-surface-a10 rounded-lg border border-primary-a20">
            <h2 className="text-lg font-semibold">Widget 1</h2>
            <p className="text-neutral-400">Some data...</p>
          </div>
          <div className="p-6 bg-surface-a10 rounded-lg border border-primary-a20">
            <h2 className="text-lg font-semibold">Widget 2</h2>
            <p className="text-neutral-400">More data...</p>
          </div>
          <div className="p-6 bg-surface-a10 rounded-lg border border-primary-a20">
            <h2 className="text-lg font-semibold">Widget 3</h2>
            <p className="text-neutral-400">Even more data...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
