import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { AppSidebar } from "@/components/sidebar"
import "@/styles/globals.css"
import { ClerkProvider } from "@clerk/nextjs"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import type React from "react" // Import React
import { dark } from '@clerk/themes'

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "University Admission System",
  description: "Apply for university programs and manage your applications",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <SidebarProvider>
              <div className="flex h-screen w-screen">
                <AppSidebar />
                <main className="flex-1 w-full overflow-y-auto p-8">
                  <SidebarTrigger />
                  {children}
                </main>
              </div>
            </SidebarProvider>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}

