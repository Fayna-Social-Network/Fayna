import { IContact } from 'src/modules/Users/types/contact';
import { api } from 'src/boot/axios';
import { IMessage } from 'src/modules/Chat/types/message';
import { useUserNotificationsStore } from 'src/modules/Notifications/store/UserNotification';
import { GetCorrespondenceDto } from 'src/dtos/GetCorrespondence.dto';
import { INotification } from 'src/modules/Notifications/types/notification';

export default class Message {

    static async Send(message: IMessage): Promise<void>{
        await api.post('/api/Message', message)
    }

    static Receive(message: IMessage, contact: IContact | undefined){
      // const messagesStore = useUserMessagesStore()
      // const notificationStore = useUserNotificationsStore()
      //   if(contact === undefined){
      //       const notification: INotification = {
      //         type: 'message',
      //         author: message.seller,
      //         message: message.text,
      //         messageId: message.id,
      //         isRead: message.isRead,
      //         timestamp: message.timestamp
      //       }
      //       notificationStore.addNotification(notification)
      //   }else{
      //     messagesStore.addMessageToCorrespondence({message, contactId: contact.contactId})
      //   }
    }

   

    static async delete(id: string){
        await api.delete(`api/message/${id}`)
    }

    static async setRead(id: string){
      await api.put(`api/message/isRead/${id}`)
    }

    static async getUnknownUserMessage(userId: string){
      const result = await api.get(`api/message/correspondence/${userId}`)

      return result.data
    }

    static async getMessageById(messageId: string){
      const result = await api.get(`api/message/${messageId}`)
      return result.data
    }

}
