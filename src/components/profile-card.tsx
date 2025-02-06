import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getUser } from "@/app/actions"

export async function ProfileCard() {
  const user = await getUser()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>
            <strong>Name:</strong> {user?.name}
          </p>

          <p>
            <strong>Email:</strong> {user?.email}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

