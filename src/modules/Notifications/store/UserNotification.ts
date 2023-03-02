import { INotification } from "src/modules/Notifications/types/notification";
import { defineStore } from "pinia";

export const useUserNotificationsStore = defineStore('Notifications', {

  state: () => ({
    Notifications: Array<INotification>()
  }),

  getters:{

  },

  actions:{
    addNotification(notification: INotification){
      this.Notifications.push(notification)
    },

    delNotification(messageId: string){
      this.Notifications = this.Notifications.filter(n => n.messageId != messageId)
    }
  }
})
