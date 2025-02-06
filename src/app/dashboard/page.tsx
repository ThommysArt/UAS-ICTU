import { Suspense } from "react"
import { ApplicationList } from "@/components/application-list"
import { NotificationCenter } from "@/components/notification-center"
import { ProfileCard } from "@/components/profile-card"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DashboardNav } from "@/components/dashboard-nav"
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const { userId } = await auth()
  if (!userId) redirect("/sign-in")

  return (
    <DashboardShell>
      <DashboardNav />
      <DashboardHeader heading="Dashboard" text="Welcome to your applicant dashboard" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<div>Loading profile...</div>}>
          <ProfileCard />
        </Suspense>
        <Suspense fallback={<div>Loading applications...</div>}>
          <ApplicationList />
        </Suspense>
        <Suspense fallback={<div>Loading notifications...</div>}>
          <NotificationCenter />
        </Suspense>
      </div>
    </DashboardShell>
  )
}

