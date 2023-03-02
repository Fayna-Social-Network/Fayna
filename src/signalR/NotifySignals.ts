import { useUserNotificationsStore } from "src/modules/Notifications/store/UserNotification"
import { INotification } from "src/modules/Notifications/types/notification"

export default function InitNotificationSignals(signalR: any) {


  signalR.on('Notification', (data : INotification) => {
    const notifications = useUserNotificationsStore()

    notifications.addNotification(data)
  })

}