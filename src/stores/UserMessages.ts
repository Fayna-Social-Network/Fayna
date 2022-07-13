import { IContact } from 'src/types/contact';
import { useMainStore } from './Main';
import { defineStore } from "pinia";
import { DeleteMessageDto } from "src/dtos/deleteMessage.dto";
import MessageService from "src/services/messages/message.service";
import { ICorrespondence } from "src/types/correspondence";
import { IMessage } from "src/types/message";
import { v4 as uuid } from "uuid";
import _ from 'lodash'

interface newMessage{
  message: IMessage,
  contactId: string
}

interface setIsReadDto{
contact: string,
messageId: string
}

interface IMessagerStore{
  Correspondences: Array<ICorrespondence>
  currentCorrespondenceId: string | null
}



export const useUserMessagesStore = defineStore('userMessages', {
  state: (): IMessagerStore => ({
    Correspondences: Array<ICorrespondence>(),
    currentCorrespondenceId: null,
  }),

  getters:{

    getCorrespondence: (state) => {
      return (idContact: string) => state.Correspondences
          .find(c => c.contact === idContact)?.messages.correspondences
    },

    getCorrespondenceNoParams(state){
      const corr = state.Correspondences.find(c => c.contact === state.currentCorrespondenceId)
      return corr!.messages.correspondences
    },


    getCorrespondenceByCountAndPage: (state) => (count: number, page: number) => {

      const corr = state.Correspondences.find(c => c.contact === state.currentCorrespondenceId)
      const messages = corr!.messages.correspondences
      const arrayMessages = JSON.parse(JSON.stringify(messages))
      const reverseMessages = _.reverse(arrayMessages)
      const allItems = _.chunk(reverseMessages, count)

      return {
        items: _.reverse(allItems[page]) as Array<IMessage>,
        messagesCount: messages.length
      }
    },

    getAllCorrespondence(state){
        return state.Correspondences
    },

    getNumberOfUnreadMessage: (state) => (contact: IContact) =>{
      const messages = state.Correspondences
            .find(c => c.contact === contact.contactId)?.messages.correspondences
      if(messages){
       return messages.filter(c => c.seller === contact.userId
            && c.isRead === false).length
      }
      return 0
    },

    getLastContactMessage: (state) => (contactId: string) => {
      const messages = state.Correspondences
            .find(c => c.contact === contactId)?.messages.correspondences
      if(messages){
        const len = messages.length
        if(len > 0){
          return getMessageText(messages[len - 1].text)
        }
      }
      return 'No Messages'
    }

  },

  actions:{

    setCorrespondence: function(correspondence: ICorrespondence): void{
      this.Correspondences.push(correspondence)
    },

    addMessageToCorrespondence: function(data: newMessage): void{
      this.Correspondences.find(c => c.contact == data.contactId)
             ?.messages.correspondences.push(data.message)
    },

    delCorrespondence: function(contact: string): void{
     this.Correspondences = this.Correspondences.filter(cor => cor.contact != contact)
    },

    delMessageFromCorrespondence: function(message: any): void{
      const main = useMainStore()

      let index = this.Correspondences.find(c => c.contact == message.contactId)
        ?.messages.correspondences.findIndex(i => i.id === message.message.id)
      if (index != -1) {
        this.Correspondences.find(c => c.contact == message.contactId)
              ?.messages.correspondences.splice(index!, 1)
      }

      main.setMessageTrigger()

    },

    setMessageIsRead: function(message: setIsReadDto): void{
      this.Correspondences.find(c => c.contact === message.contact)
          ?.messages.correspondences.forEach(mess => {
            if(mess.id === message.messageId){
              mess.isRead = true
            }
          })
    },

    setMessageIsReadNoContact: function(messageId: string ): void{
      this.Correspondences.forEach(cor => {
        cor.messages.correspondences.forEach(message => {
          if(message.id === messageId){
            message.isRead = true
          }
        })
      })
    },

    setMessageRemoveByUser: function(messageId: string): void{
      this.Correspondences.forEach(cor => {
        cor.messages.correspondences.forEach(message => {
          if(message.id === messageId){
            message.text = '[message_delete]'
          }
        })
      })
    },

    setCurrentCorrespondenceId: function(Id: string | null): void{
      this.currentCorrespondenceId = Id
    },

    async deleteMessage (message: DeleteMessageDto){
      try {
         await MessageService.delete(message.message.id)
         this.delMessageFromCorrespondence(message)
      } catch (error) {

      }
    },

    async sendMessage(data: newMessage): Promise<void>{
      const main = useMainStore()
      try {
          await MessageService.Send(data.message)
          this.addMessageToCorrespondence(data)
          main.setMessageTrigger()
      } catch (error) {
          console.log(error)
      }
    }

  }
})

function getMessageText(text: string){
  if(text.startsWith('$[]:')){
    return '(Sticker Message)'
  }
  if(text == '[:audio_message:]'){
    return '(Audio Message)'
  }
  if(text == '[:image_message:]'){
    return '(Image Message)'
  }
  if(text == '[:video_message:]'){
    return '(Video Message)'
  }
  if(text == '[:file_message:]'){
    return '(File Message)'
  }
  if(text.startsWith('<code>')){
    return '(Code Message)'
  }

  return text
}