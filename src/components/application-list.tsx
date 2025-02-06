import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getApplications } from "@/app/actions"
import { Badge } from "@/components/ui/badge"

export async function ApplicationList() {
  const applications = await getApplications()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {applications.map((app) => (
            <li key={app.id} className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{app.program.name}</p>
                <p className="text-sm text-muted-foreground">{app.program.department}</p>
              </div>
              <Badge
                variant={app.status === "PENDING" ? "outline" : app.status === "ACCEPTED" ? "default" : "destructive"}
              >
                {app.status}
              </Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

