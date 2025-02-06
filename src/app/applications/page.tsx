"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getApplications, updateApplicationStatus } from "@/app/actions"
import { isUserAdmin } from "@/lib/clerk-actions"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Application, ApplicationStatus, Program } from "@prisma/client"

type ApplicationAndProgram = Application & { program: Program }

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<ApplicationAndProgram[]>([])
  const [filteredApplications, setFilteredApplications] = useState<ApplicationAndProgram[]>([])
  const [statusFilter, setStatusFilter] = useState("ALL")
  const [isAdmin, setIsAdmin] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    const fetchData = async () => {
      const apps = await getApplications()
      setApplications(apps)
      setFilteredApplications(apps)
      const adminStatus = await isUserAdmin()
      setIsAdmin(adminStatus)
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (statusFilter === "ALL") {
      setFilteredApplications(applications)
    } else {
      setFilteredApplications(applications.filter((app) => app.status === statusFilter))
    }
  }, [statusFilter, applications])

  const handleStatusChange = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      const formData = new FormData()
      formData.append("status", newStatus)
      await updateApplicationStatus(applicationId, formData)

      // Update the local state
      const updatedApplications = applications.map((app) =>
        app.id === applicationId ? { ...app, status: newStatus } : app,
      )
      setApplications(updatedApplications)

      toast({
        title: "Success",
        description: `Application status updated to ${newStatus}`,
      })
    } catch (error) {
      console.error("Error updating application status:", error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Applications</h1>
        <Link href="/applications/new">
          <Button>New Application</Button>
        </Link>
      </div>
      <div className="flex items-center space-x-2">
        <Select onValueChange={setStatusFilter} defaultValue="ALL">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
            <SelectItem value="ACCEPTED">Accepted</SelectItem>
            <SelectItem value="REJECTED">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Application List</CardTitle>
        </CardHeader>
        <CardContent>
            {isAdmin ? (
                <ul className="space-y-4">
                    {filteredApplications.map((app) => (
                    <li key={app.id} className="flex justify-between items-center border-b pb-2">
                        <div>
                        <p className="font-semibold">{app.program.name}</p>
                        <p className="text-sm text-muted-foreground">{app.program.department}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                        <Badge
                            variant={
                            app.status === "PENDING" ? "outline" : app.status === "ACCEPTED" ? "default" : "destructive"
                            }
                        >
                            {app.status}
                        </Badge>
                        {isAdmin && (
                            <Select onValueChange={(value) => handleStatusChange(app.id, value as ApplicationStatus)} defaultValue={app.status}>
                            <SelectTrigger className="w-[120px]">
                                <SelectValue placeholder="Change status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="ACCEPTED">Accept</SelectItem>
                                <SelectItem value="REJECTED">Reject</SelectItem>
                            </SelectContent>
                            </Select>
                        )}
                        </div>
                    </li>
                    ))}
                </ul>
            ):(
                <div>You are not an admin</div>
            )}
        </CardContent>
      </Card>
    </div>
  )
}

