import { IMessage } from "src/modules/Chat/types/message";
import { useMainStore } from "src/stores/Main";
import { useUserContactsStore } from "src/modules/Users/store/UserContacts";
import { setChatMessageIsRead } from 'src/modules/Chat/services'
import { CallType } from "src/modules/Chat/store/UserCalls";
import { useUserCallsStore } from "src/modules/Chat/store/UserCalls";
import UserService from "src/modules/Users/services/user.service";
import { Open } from "src/modules/modalWindows/services";

interface IAskForCall {
  userNickname : string
  callType : CallType
}

export default function InitChatSignals(signalR: any) {

  const mainStore = useMainStore()
  const contactsStore = useUserContactsStore()
  const UserCallStore = useUserCallsStore()

  signalR.on('acceptChatMessage', (message: IMessage) => {
    contactsStore.addMessageToChat(message)
     setTimeout(() => {
        mainStore.setMessageTrigger()
     }, 300);
  }),

  signalR.on('ChatTypingMessage', (id: string)=>{
    mainStore.setTyping(id)
  })

  signalR.on('ChatReactionActive', (data: any) =>{
    mainStore.setReaction(data)
  })

  signalR.on('chatMessageIsRead', (message : IMessage) => {
    setChatMessageIsRead(message)
  })

  signalR.on('chatMessageIsDelete', (messageId: string) => {
    console.log(`message delete ${messageId}`)
  })

  signalR.on('UserAskForCall', async(data: IAskForCall) => {
    const user = await UserService.getUserByNickname(data.userNickname)
    UserCallStore.setCallType(data.callType)
    UserCallStore.setIncomeCall(true)
    Open('UserCall', user)
  })

}
