import  MessageService  from 'src/modules/Message/services/messages/message.service';
import User from 'src/modules/Users/services/user.service';
import { INotification } from 'src/modules/Notifications/types/notification';
import { Router } from 'src/router/index'
import { useMainStore } from 'stores/Main';
import { useUserNotificationsStore } from 'src/modules/Notifications/store/UserNotification';


export async function getNotificationItemData(notification: INotification){
  const ItemData = {
    from: '',
    type: ''
  }
    switch (notification.type) {
      case 'message':
        const user = await User.getUserById(notification.author)
        ItemData.from = "@" + user.nickName
        ItemData.type = 'NewMessage'
        break;

      default:
        break;
    }

    return ItemData
}

export async function redirectToViewNotification(notification: INotification){
  const mainStore = useMainStore()
  mainStore.setNotifyObject(notification)

  switch(notification.type){
    case 'message':
     Router.push({name: 'messageNotify'})
      break;

      default:
        break;
  }
}

export async function deleteNotification(notification: INotification){
  const notifyStore = useUserNotificationsStore()

  switch(notification.type){
    case 'message':
      Router.push({name: 'Start'})
      await MessageService.setRead(notification.messageId)
      notifyStore.delNotification(notification.messageId)
      break;

      default:
        break;
  }
}