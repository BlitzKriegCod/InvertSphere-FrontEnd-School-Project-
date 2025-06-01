"use client";

import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { getNavigation } from "@/lib/utils/permissions";
import { DivideIcon as LucideIcon, Menu, Bell, Search } from "lucide-react";
import * as Icons from "lucide-react";
import { cn } from "@/lib/utils";

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  // If no user, don't render the header
  if (!user) return null;
  
  const navigation = getNavigation(user.role);

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center bg-background border-b">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 sm:max-w-xs">
              <div className="flex h-16 items-center border-b">
                <Icons.Boxes className="h-6 w-6 text-emerald-600 mr-2" />
                <span className="font-bold text-lg">InventSphere</span>
              </div>
              <nav className="flex flex-col gap-1 py-4">
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
                      onClick={() => setIsOpen(false)}
                    >
                      {Icon && <Icon className="h-4 w-4" />}
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-auto border-t py-4">
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
                <Button
                  variant="ghost"
                  className="w-full justify-start mt-2"
                  onClick={logout}
                >
                  <Icons.LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </SheetContent>
          </Sheet>
          
          {/* Logo (visible on mobile) */}
          <div className="md:hidden flex items-center">
            <Icons.Boxes className="h-6 w-6 text-emerald-600 mr-2" />
            <span className="font-bold">InventSphere</span>
          </div>
        </div>
        
        {/* Right side of header */}
        <div className="flex items-center gap-4">
          <div className="relative rounded-md shadow-sm hidden sm:flex">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border bg-transparent py-2 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-emerald-600"
            />
          </div>
          
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-emerald-600"></span>
          </Button>
          
          <ThemeToggle />
          
          <div className="relative hidden sm:flex items-center">
            <Button variant="ghost" onClick={logout} className="text-sm">
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}