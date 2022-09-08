import { api }  from 'src/boot/axios'
import { useUserContactsStore } from 'src/stores/UserContacts';
import { useUserStore } from 'src/stores/User';


interface updateUser {
  id: string
  firstName: string | null
  lastName: string | null
  avatar: string | null
}

export default class User {
    static async findByNickName(text: string ){
        return await api.get(`api/User/searchbyname/${text}`)
    }
    static async getUsersByCountAndPage(count: number, page: number){
        return await api.get(`api/User/${count}/${page}`)
    }
    static async updateUser(obj: updateUser){
        await api.put('api/user', obj)
   }

    static async blockUser(userId: string){
      const result = await api.post(`api/UserBlackList/${userId}`)
      const userStore = useUserStore()
      const contactsStore = useUserContactsStore()
      userStore.addUserToBlackList({blockedUser: userId, id: result.data})
      contactsStore.delUserFromContactByUserId(userId)
    }

    static async unBlockUser(blockId: string){
      const userStore = useUserStore()
      await api.delete(`api/UserBlackList/${blockId}`)
      userStore.delUserFromBlackList(blockId)
    }

    static async isUserBlockMe(userId: string){
      const result = await api.get(`api/UserBlackList/${userId}`)
      return result
    }

    static async getUserById(userId: string){
      const user = await api.get(`api/user/byId/${userId}`)
      return user.data
    }

    static async getUserByNickname(nickname: string){
      const user = await api.get(`api/user/${nickname}`)
      return user.data
    }

}
