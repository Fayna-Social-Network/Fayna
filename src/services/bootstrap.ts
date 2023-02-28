import { useUserStore } from 'src/stores/User';
import { useMainStore } from 'src/stores/Main';
import { api } from 'src/boot/axios'
import { IUser } from 'src/types/user';
import ContactGroupService from './users/contactGroups.service'
import { ContactGroup } from 'src/types/ContactGroup';
import { IContact } from 'src/types/contact';
import { useUserContactsStore } from 'src/stores/UserContacts';

export default async function loadData(nickname: string){

    const userResult = await api.get<IUser>(`api/user/${nickname}`)

    useUserStore().setUser(userResult.data)

    if(userResult.data.contactGroups.length == 0) {

      const data = await ContactGroupService.CreateContactGroup('All')

      const Group: ContactGroup = {
        id: data.data,
        groupName: 'All'
      }

      useUserStore().addContactGroupToUserStart(Group)
    }
    interface contactsResponce {
      userContacts: Array<IContact>
    }

    const userContactsResult = await  api.get<contactsResponce>(`api/UserContacts/${userResult.data.id}`)

    useUserContactsStore().setContacts(userContactsResult.data.userContacts)

    useMainStore().setReadyComponent(true)
}



