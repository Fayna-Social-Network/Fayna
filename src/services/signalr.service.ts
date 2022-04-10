import { Notify } from 'quasar'
import { IContact } from './../types/contact';
import Message from './messages/message.service';
import { v4 as uuid } from 'uuid';
import { IMessage } from '../types/message';
import { useUserContactsStore } from 'src/stores/UserContacts';
import { useUserMessagesStore } from 'src/stores/UserMessages';
import { useMainStore } from 'src/stores/Main';



export  function InitializeResponseSignalRCommands(contacts: Array<IContact>, nickname: string, signalR: any) {

  const contactsStore = useUserContactsStore()
  const messagesStore = useUserMessagesStore()
  const mainStore = useMainStore()

    signalR.on('acceptMessage', (message: IMessage) => {

        const contact = contacts.find(c => c.userId == message.seller)
        Message.Receive(message, contact)
         setTimeout(() => {
            mainStore.setMessageTrigger(uuid())
         }, 300);
    }),

     signalR.on('TypingMessage', (id: string)=>{
        mainStore.setTyping(id)
    })

     signalR.on('userIsOnline', (nickName: string ) => {
        contactsStore.setContactIsOnline(nickName)
    })

     signalR.on('ReactionActive', (data: any) =>{
        mainStore.setReaction(data)
    })

     signalR.on('userIsOffline', (nickName: string) => {
       contactsStore.setContactIsOffline(nickName)
    })

    signalR.on('messageIsRead', (message : IMessage) => {
      messagesStore.setMessageIsReadNoContact(message.id)
    })

    signalR.on('messageIsDelete', (messageId: string) => {
      messagesStore.setMessageRemoveByUser(messageId)
    })

    signalR.on('youAreBlocked', (userId: string) =>{
      contactsStore.delUserFromContactByUserId(userId)
       Notify.create('You are blocked by user')
    })

}

export function signalrRegisterUserOnline(nickname: string, signalR: any){
    signalR.invoke('RegisterUserOnline', nickname)
    signalR.on('regOk', () => {
        signalR.invoke('SuccessRegistration', nickname)
   })
}
