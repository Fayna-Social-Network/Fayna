import { INotification } from './../types/notification';
import { language } from './../types/types';
import { defineStore } from "pinia";
import { IReaction } from '../types/Reaction';

export interface MainLayout{
  leftNavBarActive: boolean
  appsNavBarActive: boolean
  isMainNavMayHide: boolean
  mainNavHide: boolean
  isSearchOpenInLeftNav: boolean
}

interface AlarmMessage{
  text: string,
  type: string,
  active: boolean
}

interface MainStoreState{
  isReady: boolean,
  appMessage: AlarmMessage
  locale: language,
  reaction: Array<IReaction>
  messageTrigger: string | null
  mainMenuNumber: Number,
  typingMessage: string | null
  mainLayout: MainLayout,
  notifyObject: INotification | null
}

export const useMainStore = defineStore('mainStore', {
  state: (): MainStoreState => ({
    isReady: false,
    appMessage: {
        text: '',
        type: '',
        active: false
    },
    locale: 'ru-Ru',
    reaction: Array<IReaction>(),
    messageTrigger: null,
    mainMenuNumber: 0,
    typingMessage: null,
    mainLayout:{
        leftNavBarActive: true,
        appsNavBarActive: true,
        isMainNavMayHide: false,
        mainNavHide: true,
        isSearchOpenInLeftNav: false
    },
    notifyObject: null
  }),

  actions:{

    setReadyComponent(value: boolean){
      this.isReady = value
    },

    setSearchIsOpenLeftNav(value: boolean){
      this.mainLayout.isSearchOpenInLeftNav = value
    },

    callMessage(message :AlarmMessage){
      this.appMessage.text = message.text
      this.appMessage.type = message.type
      this.appMessage.active = message.active
    },

    setLocale(value: any){
      this.locale = value
    },

    setTyping(value: any){
      this.typingMessage = value
    },

    setReaction(value: any){
      this.reaction = value
    },

    setMessageTrigger(value: any){
      this.messageTrigger = value
    },

    setMainMenuNumber(value: any){
      this.mainMenuNumber = value
    },

    setNotifyObject(value: INotification){
      this.notifyObject = value
    }
  }
})
