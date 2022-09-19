import { Notify } from 'quasar';
import { IContact } from 'src/types/contact';
import Message from 'src/services/messages/message.service';
import { IMessage } from 'src/types/message';
import { useUserContactsStore } from 'stores/UserContacts';
import { useUserMessagesStore } from 'stores/UserMessages';
import { useMainStore } from 'stores/Main';
import UserService from 'src/services/users/user.service'
import { Open } from 'src/functions/modals';
import { CallType } from 'stores/UserCalls'
import { useUserCallsStore } from 'stores/UserCalls'

interface IUserCalling {
  userNickname : string
  signalData : string
  callType : CallType
}

export  function InitializeResponseSignalRCommands(contacts: Array<IContact>, nickname: string, signalR: any) {

  const contactsStore = useUserContactsStore()
  const messagesStore = useUserMessagesStore()
  const UserCallStore = useUserCallsStore()
  const mainStore = useMainStore()

    signalR.on('acceptMessage', (message: IMessage) => {

        const contact = contacts.find(c => c.userId == message.seller)
        Message.Receive(message, contact)
         setTimeout(() => {
            mainStore.setMessageTrigger()
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

    signalR.on('UserCalling', async (data: IUserCalling) => {
      const user = await UserService.getUserByNickname(data.userNickname)
      UserCallStore.setCallSettigs(data.callType, true, data.signalData)
      Open('UserCall', user)
    })

    signalR.on('UserAnswerToCall', (signal: string ) => {
      UserCallStore.setCallAnswer('answer', signal)
    })

    signalR.on('CanselingCall', () => {
      UserCallStore.setCallAnswer('noAnswer', null)
    })

}

export function signalrRegisterUserOnline(nickname: string, signalR: any){
    signalR.invoke('RegisterUserOnline', nickname)
    signalR.on('regOk', () => {
        signalR.invoke('SuccessRegistration', nickname)
   })
}