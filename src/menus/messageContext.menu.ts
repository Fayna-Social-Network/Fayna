import { $translate } from '@/plugins/localize.plugin';
import { useUserStore } from '@/store/User';
import { useUserMessagesStore } from '@/store/UserMessages';
import { IMessage } from './../types/message';
import { MenuItem } from '../types/menu';
import { Open } from '@/functions/modals';
import Reaction from '@/services/messages/ReactionsService';
import { $alert } from '@/plugins/alert.plugin';


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
      reaction.data.reactions.forEach(reaction => {
        if(reaction.userId === userStore.user?.id){
          $alert($translate('ReactionError'), true)
          tmp++
        }
      });
    }
    if(tmp === 0){
      Open('MessageReaction', data)
    }
  }

}