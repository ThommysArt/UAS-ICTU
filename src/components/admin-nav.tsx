"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav className="grid items-start gap-2">
      <Link
        href="/admin"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/admin" ? "bg-accent" : "transparent",
        )}
      >
        <span>Dashboard</span>
      </Link>
      <Link
        href="/admin/applications"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/admin/applications" ? "bg-accent" : "transparent",
        )}
      >
        <span>Applications</span>
      </Link>
      <Link
        href="/admin/programs"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/admin/programs" ? "bg-accent" : "transparent",
        )}
      >
        <span>Programs</span>
      </Link>
      <Link
        href="/admin/users"
        className={cn(
          "group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
          pathname === "/admin/users" ? "bg-accent" : "transparent",
        )}
      >
        <span>Users</span>
      </Link>
    </nav>
  )
}

