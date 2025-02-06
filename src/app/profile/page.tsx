import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { getUser } from "@/app/actions"

export default async function ProfilePage() {
  const user = await getUser()

  if (!user) {
    return <div>User not found</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Your Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Field</TableHead>
                <TableHead>Details</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell><strong>Name:</strong></TableCell>
                <TableCell>{user.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Email:</strong></TableCell>
                <TableCell>{user.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Clerk ID:</strong></TableCell>
                <TableCell>{user.clerkId}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Created At:</strong></TableCell>
                <TableCell>{user.createdAt?.toLocaleString()}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell><strong>Updated At:</strong></TableCell>
                <TableCell>{user.updatedAt?.toLocaleString()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

