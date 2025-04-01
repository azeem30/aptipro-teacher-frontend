"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Home, User } from "lucide-react"

export function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  const pathname = usePathname()

  if (
    !isAuthenticated ||
    pathname === "/" ||
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/verify"
  ) {
    return null
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/home" className="text-2xl font-bold tracking-tight animate-fade-in text-gradient-rainbow">
            AptiPro
          </Link>
        </div>

        <nav className="flex items-center gap-6">
          <Link
            href="/home"
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/home" ? "text-gradient-primary" : "text-muted-foreground"
            }`}
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>

          <Link
            href="/profile"
            className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/profile" ? "text-gradient-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </Link>

          <ModeToggle />

          <Button variant="outline" size="sm" onClick={logout} className="border-primary/30 hover:bg-primary/10">
            Logout
          </Button>
        </nav>
      </div>
    </header>
  )
}

