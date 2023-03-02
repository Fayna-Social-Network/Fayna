import { AxiosResponse } from 'axios'
import { api } from 'src/boot/axios'
import { IContactGroup } from '../types/ContactGroup'
import { useUserStore } from '../store/User'
import { i18n } from 'src/boot/i18n'
import { Notify } from 'quasar'

interface UpdateGroupName{
  id: string,
  name: string
}

export default class ContactGroups{

  static async CreateContactGroup(name: string): Promise<void> {
    const userStore = useUserStore()
    try {

      const result = await api.post<string>(`api/ContactGroups/${name}`)

      const group: IContactGroup = {
        id: result.data,
        groupName: name
      }

      userStore.addContactGroupToUser(group)
      Notify.create({message: i18n.global.t('ContactGroupSuccessAdd')})
    } catch(e) {
      Notify.create({message: i18n.global.t('ContactGroupErrorToAdd'), type: 'negative'})
    }

  }

  static async DeleteContactGroup(id: string){
    await api.delete(`api/ContactGroups/${id}`)
  }

  static async GetGeneralGroupId(){
    return await api.get('api/ContactGroups/GetIdGeneralGroup')
  }

  static async UpdateContactGroupName(update: UpdateGroupName){
    await api.put('api/ContactGroups', update)
  }
}
