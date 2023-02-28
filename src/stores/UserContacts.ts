import { IContact } from "src/types/contact";
import { defineStore } from "pinia";

interface updateContact {
  contactId: string
  groupId: string
  groupName: string
  name: string
}

interface IUserContactStore {
  mainGroupId: string,
  contacts: Array<IContact>,
  sortedContacts: Array<IContact>,
  activeContact: null | string
}

export const useUserContactsStore = defineStore('userContacts', {
  state: () : IUserContactStore => ({
    mainGroupId: '',
    contacts: Array<IContact>(),
    sortedContacts: Array<IContact>(),
    activeContact: null
  }),

  getters:{

      getContactById: (state) => (id: string) => {
          return state.contacts.find(u => u.contactId === id)
      },

      getContacts(state){
          return state.contacts
      },

      getContactByUserId: (state) => (id: string) =>{
          return state.contacts.find(c => c.userId === id)
      },

      getContactNameById: (state) => (id: string) => {
        return state.contacts.find(c => c.contactId === id)?.name
      },

      getContactIsOnline: (state) => (id: string) => {
        return state.contacts.find(c => c.contactId === id)?.isOnline
      },

      getContactAvatar: (state) => (id: string) => {
        const contact = state.contacts.find(c => c.contactId === id)
        if(contact){
          if(contact.avatar){
            return import.meta.env.VITE_APP_BACKEND_PATH + contact.avatar
          } else{
              return import.meta.env.VITE_APP_BACKEND_PATH +
              'Resources/Images/user-profile.png'
            }
        }
      }


  },

  actions:{

    setContacts: function(contacts: Array<IContact>){
      this.contacts = contacts
      this.sortedContacts = contacts
    },

    setContactIsOnline: function (nickName: string): void {
      if(this.contacts.find(c => c.nickName === nickName) != undefined){
        this.contacts.find(c => c.nickName === nickName)!.isOnline = true
      }
    },

    setContactIsOffline: function (nickName: string): void {
      if(this.contacts.find(c => c.nickName === nickName) != undefined){
        this.contacts.find(c => c.nickName === nickName)!.isOnline = false
      }
    },

    addContactToUser(contact: IContact){
      this.contacts.push(contact)
    },

    delUserFromContact(contactId: string){
      this.contacts = this.contacts.filter(c => c.contactId != contactId)
      this.sortedContacts = this.contacts
    },

    delUserFromContactByUserId(userId: string){
      this.contacts = this.contacts.filter(c => c.userId != userId)
      this.sortedContacts = this.contacts
    },

    contactsSort(idGroup: string){
      this.sortedContacts = this.contacts.filter(c => c.groupId == idGroup)
    },

    resetContactsSort(){
      this.sortedContacts = this.contacts
    },

    setMainGroupId(id: string){
      this.mainGroupId = id
    },

    resetGroupInContact(id: string){
        this.contacts.forEach(contact => {
          if(contact.groupId === id){
            contact.groupId = this.mainGroupId,
            contact.groupName = 'General'
          }
        })
    },

    isUserInContacts(userId: string): boolean{
      const user = this.contacts.find(c => c.userId === userId)
      if(user === undefined) return false
      return true
    },

    updateContact(contact: updateContact){
      this.contacts.forEach(c => {
        if(c.contactId === contact.contactId){
          c.groupId = contact.groupId
          c.groupName = contact.groupName
          c.name = contact.name
        }
      })
    }

  }

})

