import { Notify } from 'quasar';
import { api } from 'src/boot/axios'
import {AddUserToContactDto} from 'src/dtos/addUserToContact.dto'
import { useUserContactsStore } from 'src/modules/Users/store/UserContacts'
import { AxiosError, AxiosResponse } from 'axios';
import { IContact } from 'src/modules/Users/types/contact';
import { i18n } from 'src/boot/i18n'

interface UpdateContact{
  contactId : string,
  groupId: string,
  contactName: string
}

export default class Contacts{

    static async addContactToUser(dto: AddUserToContactDto): Promise<void>{
      const contactStore = useUserContactsStore()
      try {
        const result =  await api.post<IContact>('api/UserContacts', dto)
        contactStore.addContact(result.data)
        Notify.create({ message: `${result.data.nickName} ${i18n.global.t('UserSuccessAdd')}` })
      } catch(e) {
        Notify.create({ message: `${i18n.global.t('UserAddError')} ${e}`})
      }
    }

    static async delContactFromUser(contactId: string){
        const contactsStore = useUserContactsStore()
        await api.delete(`api/UserContacts/${contactId}`)
        contactsStore.delUserFromContact(contactId)
    }

    static async UpdateUserContact(contactUpdate: UpdateContact){
        await api.put('api/UserContacts', contactUpdate)
    }

    static getLastMessageFromContact(contact: IContact): string {
      const messages = contact.chat.chatMessages
      if(messages.length > 0) {
        return messages[messages.length - 1].text.substr(20)
      }
      return 'No Messages'
    }
}
