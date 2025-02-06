import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { prisma } from "@/lib/prisma"

export async function AdminUserList() {
  const users = await prisma.user.findMany()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Users</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {users.map((user) => (
            <li key={user.id} className="flex justify-between items-center">
              <span>{user.name}</span>
              <span className="text-sm text-muted-foreground">{user.email}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

