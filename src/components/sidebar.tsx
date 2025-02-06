"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserButton } from "@clerk/nextjs"
import { useUser } from "@clerk/nextjs"
import { HomeIcon, BookOpenIcon, FileTextIcon, BellIcon, UserIcon, SettingsIcon, ShieldIcon } from "lucide-react"
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { isUserAdmin } from "@/lib/clerk-actions"

const sidebarItems = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Programs", href: "/programs", icon: BookOpenIcon },
  { name: "Applications", href: "/applications", icon: FileTextIcon },
  { name: "Notifications", href: "/notifications", icon: BellIcon },
  { name: "Profile", href: "/profile", icon: UserIcon },
]

const adminItems = [{ name: "Admin Dashboard", href: "/admin", icon: ShieldIcon }]

export function AppSidebar() {
  const pathname = usePathname()
  const { user } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    const checkAdminStatus = async () => {
      const adminStatus = await isUserAdmin()
      setIsAdmin(adminStatus)
    }
    checkAdminStatus()
  }, [])

  return (
    <Sidebar className="p-4">
      <SidebarHeader>
        <Link href="/" className="flex items-center space-x-2 px-4 py-2">
          <span className="font-bold">University Admissions</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={cn("flex items-center space-x-2 w-full", pathname === item.href && "bg-secondary")}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
            {isAdmin &&
              adminItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={cn("flex items-center space-x-2 w-full", pathname === item.href && "bg-secondary")}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "h-8 w-8",
                },
              }}
            />
            {user && <span className="text-sm font-medium">{user.fullName}</span>}
          </div>
          <Button variant="ghost" size="icon">
            <SettingsIcon className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

