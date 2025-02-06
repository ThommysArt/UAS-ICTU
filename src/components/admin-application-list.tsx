"use server"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllApplications, updateApplicationStatus } from "@/app/actions"
import { Application, Program, User } from "@prisma/client"

export async function AdminApplicationList({applications}:{applications: (Application & { program: Program, user: User})[] }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {applications.map((app) => (
            <li key={app.id} className="flex justify-between items-center">
              <span>
                {app.user.name} - {app.program.name}
              </span>
              <form action={updateApplicationStatus.bind(null, app.id)}>
                <select
                  name="status"
                  defaultValue={app.status}
                  className="text-sm text-muted-foreground"
                  onChange={(e) => e.target.form?.requestSubmit()}
                >
                  <option value="PENDING">Pending</option>
                  <option value="ACCEPTED">Accepted</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </form>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

