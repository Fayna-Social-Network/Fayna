import { useUserContactsStore } from "src/modules/Users/store/UserContacts"
import { Notify } from 'quasar';

export default function InitUsersSignals(signalR: any) {

  const contactsStore = useUserContactsStore()

  signalR.on('userIsOnline', (nickName: string ) => {
    contactsStore.setContactIsOnline(nickName)
  })


  signalR.on('userIsOffline', (nickName: string) => {
   contactsStore.setContactIsOffline(nickName)
  })



  signalR.on('youAreBlocked', (userId: string) =>{
    contactsStore.delUserFromContactByUserId(userId)
    Notify.create('You are blocked by user')
  })

}