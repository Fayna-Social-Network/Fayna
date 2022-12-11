import { INotification } from '../types/notification';
import { ContactGroup } from '../types/ContactGroup';
import { useUserStore } from 'src/stores/User';
import { useUserContactsStore } from 'src/stores/UserContacts';
import { useUserMessagesStore } from 'src/stores/UserMessages';
import { useUserNotificationsStore } from 'src/stores/UserNotification';
import { useMainStore } from 'src/stores/Main';
import { api } from 'src/boot/axios'
import Message from './messages/message.service';


export default async function loadData(nickname: string){

    const userResult = await api.get(`api/user/${nickname}`)
    const mainContactGroupId = await api.get('api/ContactGroups/GetIdGeneralGroup')
    useUserStore().setUser(userResult.data)

    const Group: ContactGroup = {
      id: mainContactGroupId.data,
      groupName: 'All'
    }
    useUserStore().addContactGroupToUserStart(Group)


    useUserContactsStore().setMainGroupId(mainContactGroupId.data)
    const userContactsResult = await  api.get(`api/UserContacts/${userResult.data.id}`)

    useUserContactsStore().setContacts(userContactsResult.data.userContacts)

    const contacts = userContactsResult.data.userContacts
    for (let contact of contacts){
        const messages = await  api.post('api/message/correspondence', {
            owner: userResult.data.id,
            withWho: contact.userId
        })
        let correspondence = {
            contact: contact.contactId,
            messages: messages.data
        }

          useUserMessagesStore().setCorrespondence(correspondence)
    }

    const unknownUserMessage = await Message.getUnknownUserMessage(userResult.data.id)
    if(unknownUserMessage){
      for (let message of unknownUserMessage.correspondences) {
        if(!message.isRead){
          let notification : INotification = {
            type: 'message',
            author: message.seller,
            message: message.text,
            messageId: message.id,
            isRead: message.isRead,
            timestamp: message.timestamp
          }
          useUserNotificationsStore().addNotification(notification)
        }
      }
    }



    useMainStore().setReadyComponent(true)
}



