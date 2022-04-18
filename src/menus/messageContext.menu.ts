import { IReaction } from './../types/Reaction';
import { Notify } from 'quasar';
import { useUserStore } from 'stores/User';
import { useUserMessagesStore } from 'stores/UserMessages';
import { IMessage } from 'src/types/message';
import { MenuItem } from 'src/types/menu';
import { Open } from 'src/functions/modals';
import Reaction from 'src/services/messages/reactions.service';


export type IAction = 'messageDelete' | 'contactChecker' | 'addReaction'

interface MenuActionData{
  message: IMessage
  contactId: string
}

export const Menu: Array<MenuItem> = [
    {
        id: 0,
        icon: 'delete',
        text: 'DeleteMessage',
        action: 'messageDelete'
    },

    {
        id: 1,
        icon: 'replay',
        text: 'ForwardMessage',
        action: 'contactChecker'
    },

    {
        id: 2,
        icon: 'add_reaction',
        text: 'ReactionMessage',
        action: 'addReaction'
    },
]

export const MenuActions = {

  messageDelete(data: MenuActionData){
    const messageStore = useUserMessagesStore()
    messageStore.deleteMessage(data)
  },

  contactChecker(data: MenuActionData){
    Open('ContactChecker', data)
  },

 async addReaction(data: MenuActionData){
   let tmp = 0
   const userStore = useUserStore()
    const reaction = await Reaction.Get(data.message.id)
    if(reaction.data.reactions.length > 0){
      reaction.data.reactions.forEach((reaction: IReaction ) => {
        if(reaction.userId === userStore.user?.id){
          Notify.create({type: 'negative', message: 'ReactionError'})
          tmp++
        }
      });
    }
    if(tmp === 0){
      Open('MessageReaction', data)
    }
  }

}