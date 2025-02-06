import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { UserButton } from "@clerk/nextjs"

export function Header() {
  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">University Admission System</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/programs">Programs</Link>
            <Link href="/about">About</Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center">
            <UserButton afterSignOutUrl="/" />
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

