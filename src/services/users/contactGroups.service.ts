import { api } from 'src/boot/axios'


interface UpdateGroupName{
  id: string,
  name: string
}

export default class ContactGroups{

  static async CreateContactGroup(name: string){
    return await api.post(`api/ContactGroups/${name}`)
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
