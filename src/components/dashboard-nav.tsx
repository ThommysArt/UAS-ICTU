"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      <Link
        href="/dashboard"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/dashboard" ? "bg-accent" : "transparent",
        )}
      >
        <span>Dashboard</span>
      </Link>
      <Link
        href="/dashboard/applications"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/dashboard/applications" ? "bg-accent" : "transparent",
        )}
      >
        <span>Applications</span>
      </Link>
      <Link
        href="/dashboard/profile"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/dashboard/profile" ? "bg-accent" : "transparent",
        )}
      >
        <span>Profile</span>
      </Link>
    </nav>
  )
}

