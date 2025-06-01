"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { User, Role } from "@/lib/types";
import { getNavigation } from "@/lib/utils/permissions";
import { LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";

interface SidebarProps {
  user: User;
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname();
  const navigation = getNavigation(user.role);

  return (
    <div className="hidden md:flex flex-col h-full w-64 border-r bg-card">
      <div className="flex h-16 items-center gap-2 border-b px-6">
        <Icons.Boxes className="h-6 w-6 text-emerald-600" />
        <span className="font-bold text-lg text-foreground">InventSphere</span>
      </div>
      <div className="flex flex-col flex-1 py-4 px-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const Icon = Icons[item.icon as keyof typeof Icons] as LucideIcon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "bg-emerald-600/15 text-emerald-600"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {Icon && <Icon className="h-4 w-4" />}
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
      <div className="mt-auto p-4 border-t">
        <div className="flex items-center gap-3 rounded-md px-3 py-2">
          <div className="relative h-8 w-8 rounded-full bg-muted">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="absolute inset-0 h-full w-full object-cover rounded-full"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center h-full w-full rounded-full bg-emerald-600 text-white font-medium">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{user.role}</span>
          </div>
        </div>
      </div>
    </div>
  );
}