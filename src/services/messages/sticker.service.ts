import { api } from "src/boot/axios";
import { useUserStore } from "src/stores/User";


export default class Stickers{

  static async addStickerGroupToUser(groupId :string){
    await api.post(`api/stickers/addStickerGroupToUser/${groupId}`)
  }

  static async getAllGroups(){
    return await api.get('api/Stickers/GetAllGroups')
  }

  static async getStickersByGroup(groupId :string){
    return await api.get(`$api/Stickers/getStickersByGroup/${groupId}`)
  }

  static async deleteStickersGroupFromUser(groupId: string){
    const userStore = useUserStore()
    await api.delete(`api/Stickers/DeleteStickerGroupFromUser/${groupId}`)
    userStore.deleteStickerGroup(groupId)
  }

  static async getStickerById(stickerId: string){
    return await api.get(`api/Stickers/GetStickerById/${stickerId}`)
  }
}
