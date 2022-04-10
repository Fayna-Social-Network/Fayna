import { Notify } from 'quasar';
import { api } from 'src/boot/axios'
import {AddUserToContactDto} from 'src/dtos/addUserToContact.dto'
import { useUserMessagesStore } from 'src/stores/UserMessages'
import { useUserContactsStore } from 'src/stores/UserContacts'
import { AxiosError } from 'axios';



interface UpdateContact{
  contactId : string,
  groupId: string,
  contactName: string
}

export default class Contacts{
    static async addContactToUser(dto: AddUserToContactDto){
        return await api.post('api/UserContacts', dto)
          .catch(function (error: AxiosError){
            Notify.create('Add contact to user')
          })

    }
    static async delContactFromUser(contactId: string){
      const messagesStore = useUserMessagesStore()
      const contactsStore = useUserContactsStore()
        await api.delete(`api/UserContacts/${contactId}`)
        messagesStore.delCorrespondence(contactId)
        contactsStore.delUserFromContact(contactId)
    }
    static async UpdateUserContact(contactUpdate: UpdateContact){
        await api.put('api/UserContacts', contactUpdate)
    }
}
