import { useMainStore } from './Main';
import { defineStore } from "pinia";
import { DeleteMessageDto } from "src/dtos/deleteMessage.dto";
import MessageService from "src/services/messages/message.service";
import { ICorrespondence } from "src/types/correspondence";
import { IMessage } from "src/types/message";
import { v4 as uuid } from "uuid";

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

    getAllCorrespondence(state){
        return state.Correspondences
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
      let index = this.Correspondences.find(c => c.contact == message.contactId)
        ?.messages.correspondences.findIndex(i => i.id === message.message.id)
      if (index != -1) {
        this.Correspondences.find(c => c.contact == message.contactId)
              ?.messages.correspondences.splice(index!, 1)
      }
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
          main.setMessageTrigger(uuid())
      } catch (error) {
          console.log(error)
      }
    }

  }
})

