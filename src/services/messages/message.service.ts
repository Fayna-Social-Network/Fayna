import { IContact } from 'src/types/contact';
import { api } from 'src/boot/axios';
import { IMessage } from 'src/types/message';
import { useUserMessagesStore } from 'src/stores/UserMessages';
import { useUserNotificationsStore } from 'src/stores/UserNotification';
import { ICorrespondence } from 'src/types/correspondence';
import { GetCorrespondenceDto } from 'src/dtos/GetCorrespondence.dto';
import { INotification } from 'src/types/notification';

export default class Message {

    static async Send(message: IMessage): Promise<void>{
        await api.post('/api/Message', message)
    }

    static Receive(message: IMessage, contact: IContact | undefined){
      const messagesStore = useUserMessagesStore()
      const notificationStore = useUserNotificationsStore()
        if(contact === undefined){
            const notification: INotification = {
              type: 'message',
              author: message.seller,
              message: message.text,
              messageId: message.id,
              isRead: message.isRead,
              timestamp: message.timestamp
            }
            notificationStore.addNotification(notification)
        }else{
          messagesStore.addMessageToCorrespondence({message, contactId: contact.contactId})
        }
    }

    static async getCorrespondence(owner: string, withWho: string, contactId: string)
                        : Promise<ICorrespondence>{

        const dto = new GetCorrespondenceDto(owner, withWho)

        const result = await api.post('api/message/correspondence', dto)
        const correspondence: ICorrespondence = {
            contact: contactId,
            messages: result.data
        }

        return correspondence
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
