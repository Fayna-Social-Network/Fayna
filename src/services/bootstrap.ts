import { useUserStore } from 'src/modules/Users/store/User';
import { useMainStore } from 'src/stores/Main';
import { api } from 'src/boot/axios'
import { IUser } from 'src/modules/Users/types/user';
import ContactGroupService from '../modules/Users/services/contactGroups.service'
import { ContactGroup } from 'src/modules/Users/types/ContactGroup';
import { IContact } from 'src/modules/Users/types/contact';
import { useUserContactsStore } from 'src/modules/Users/store/UserContacts';

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



