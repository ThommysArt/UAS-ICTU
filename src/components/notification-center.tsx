import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getNotifications, markNotificationAsRead } from "@/app/actions"

export async function NotificationCenter() {
  const notifications = await getNotifications()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li key={notification.id} className="text-sm">
              {notification.message}
              {!notification.isRead && (
                <form action={markNotificationAsRead.bind(null, notification.id)}>
                  <button type="submit" className="text-xs text-blue-500 ml-2">
                    Mark as read
                  </button>
                </form>
              )}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

