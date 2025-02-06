import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotifications, markNotificationAsRead } from "@/app/actions"
import { Button } from "@/components/ui/button"

export default async function NotificationsPage() {
  const notifications = await getNotifications()

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Notifications</h1>
      {notifications.map((notification) => (
        <Card key={notification.id}>
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              {new Date(notification.createdAt).toLocaleString()}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>{notification.message}</p>
            {!notification.isRead && (
              <form action={markNotificationAsRead.bind(null, notification.id)}>
                <Button type="submit" variant="outline" size="sm" className="mt-2">
                  Mark as read
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

