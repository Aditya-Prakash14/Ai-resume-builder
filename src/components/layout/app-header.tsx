'use client';

import { LogoutButton } from "@/components/auth/logout-button";
import { SettingsButton } from "@/components/settings/settings-button";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import { PageTitle } from "./page-title";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface AppHeaderProps {
  children?: React.ReactNode;
}

export function AppHeader({ children }: AppHeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="h-14 fixed top-0 left-0 right-0 z-40 ultra-glass">
      {/* Enhanced gradient backdrop with advanced blur */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-50/90 via-white/90 to-purple-50/90" />

      {/* Advanced Gradient Overlays with animations */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f3e8ff40_0%,#ffffff50_50%,#f3e8ff40_100%)] pointer-events-none animate-subtle-shift" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_-40%,#f3e8ff40_0%,transparent_100%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_100%_100%,#f3e8ff30_0%,transparent_100%)] pointer-events-none" />

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-purple-400/20 animate-float-advanced"></div>
        <div className="absolute top-3/4 left-2/3 w-3 h-3 rounded-full bg-blue-400/20 animate-float-advanced" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 rounded-full bg-cyan-400/20 animate-float-advanced" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Border glow effect */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-300/50 to-transparent"></div>

      {/* Content Container with enhanced styling */}
      <div className="max-w-[2000px] mx-auto h-full px-3 flex items-center justify-between relative">
        {/* Left Section - Logo and Title with enhanced styling */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-shrink group">
          <Logo className="text-xl flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="h-5 w-px bg-gradient-to-b from-purple-200/30 via-purple-300/50 to-purple-200/30 hidden sm:block flex-shrink-0" />
          <div className="flex items-center min-w-0 max-w-[140px] sm:max-w-[300px] lg:max-w-[600px]">
            <div className="truncate max-w-[80ch] overflow-hidden text-ellipsis transition-all duration-300 group-hover:text-gradient">
              <PageTitle />
            </div>
          </div>
        </div>

        {/* Right Section - Navigation Items */}
        <div className="flex items-center flex-shrink-0">
          {children ? (
            children
          ) : (
            <>
              {/* Enhanced Desktop Navigation */}
              <nav className="hidden md:flex items-center gap-3">

                <div className="flex items-center px-3 py-1 rounded-lg hover:bg-white/50 transition-all duration-300">
                  <Link
                    href="/profile"
                    className={cn(
                      "flex items-center gap-1.5 px-3 py-1 relative overflow-hidden group",
                      "text-sm font-medium text-purple-600/80 hover:text-purple-800",
                      "transition-all duration-300"
                    )}
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-100/0 via-purple-100/50 to-purple-100/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                    <User className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                    <span className="hidden sm:inline relative">Profile</span>
                  </Link>
                  <div className="mx-2 h-4 w-px bg-gradient-to-b from-purple-200/30 via-purple-300/50 to-purple-200/30" />
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative">
                      <SettingsButton />
                    </div>
                  </div>
                  <div className="mx-2 h-4 w-px bg-gradient-to-b from-purple-200/30 via-purple-300/50 to-purple-200/30" />
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative">
                      <LogoutButton />
                    </div>
                  </div>
                </div>
              </nav>

              {/* Enhanced Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Menu className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:scale-110" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[280px] sm:w-[320px] ultra-glass border-l border-purple-200/50">
                  <SheetHeader>
                    <SheetTitle className="text-gradient">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-5 pt-8">

                    <Link
                      href="/profile"
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-2 px-4 py-3 mx-4 rounded-lg relative overflow-hidden group",
                        "text-sm font-medium text-purple-600/80 hover:text-purple-800",
                        "hover:bg-white/50 transition-all duration-300"
                      )}
                    >
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-100/0 via-purple-100/50 to-purple-100/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                      <User className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                      <span className="relative">Profile</span>
                    </Link>

                    <div className="px-4 relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative">
                        <SettingsButton className="w-full justify-start" />
                      </div>
                    </div>

                    <div className="px-4 relative group">
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-300"></div>
                      <div className="relative">
                        <LogoutButton className="w-full justify-start" />
                      </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-8 left-4 right-4">
                      <div className="h-px w-full bg-gradient-to-r from-transparent via-purple-300/30 to-transparent"></div>
                      <div className="flex justify-center mt-4">
                        <div className="w-2 h-2 rounded-full bg-purple-400/30 animate-pulse mx-1"></div>
                        <div className="w-2 h-2 rounded-full bg-blue-400/30 animate-pulse mx-1" style={{ animationDelay: '0.5s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-cyan-400/30 animate-pulse mx-1" style={{ animationDelay: '1s' }}></div>
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          )}
        </div>
      </div>
    </header>
  );
}