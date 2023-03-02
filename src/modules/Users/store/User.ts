import User from "src/modules/Users/services/user.service";
import { IContactGroup } from "src/modules/Users/types/ContactGroup";
import { IStickerGroup } from "src/modules/Stickers/types/sticker";
import { BlockUser, IUser } from "src/modules/Users/types/user";
import { defineStore } from "pinia";

interface IUserState{
  user: IUser | null,
  searchUsers: {
    users: Array<IUser>
  }
}


export const useUserStore = defineStore('userStore', {
  state: () : IUserState => ({
    user: null,
    searchUsers: {
      users: Array<IUser>(),
    }
  }),

  getters:{
    getUserAvatar(state){
      const path = state.user!.avatar
      if(path != null){
        return import.meta.env.VITE_APP_BACKEND_PATH + path
      }
      return import.meta.env.VITE_APP_BACKEND_PATH + 'Resources/Images/user-profile.png'
    },

    getUserFullName(state){
      if(!state.user!.firstName){
        return state.user?.nickName
      }
      return state.user?.firstName! + ' ' + state.user?.lastName
    }
  },
  actions:{

    setUser: function(user: IUser){
      this.user = user
    },

    setSearchUsers(users: any){
      this.searchUsers = users
    },

    addContactGroupToUser(contactGroup: IContactGroup){
      if(this.user != null){
        this.user.contactGroups.push(contactGroup)
      }
    },

    addContactGroupToUserStart(contactGroup: IContactGroup){
      if(this.user != null){
        this.user.contactGroups.unshift(contactGroup)
      }
    },

    delContactGroupFromUser(id: string){
      if(this.user != null){
        this.user.contactGroups = this.user.contactGroups.filter(g => g.id != id)
      }
    },

    deleteStickerGroup(id: string){
      if(this.user != null){
        this.user.userStickersGroups = this.user.userStickersGroups.filter(g => g.id != id)
      }
    },

    addStickerGroup(group: IStickerGroup){
      if(this.user != null){
        this.user.userStickersGroups.push(group)
      }
    },

    addUserToBlackList(blockUser: BlockUser){
      if(this.user != null){
        this.user.userBlackLists.push(blockUser)
      }
    },

    delUserFromBlackList(blockId: string){
      if(this.user != null){
        this.user.userBlackLists = this.user.userBlackLists.filter(l => l.id != blockId)
      }
    },

    async updateUser(user: any){
      try {
        await User.updateUser(user)
      } catch (error) {

      }
    }

  }
})
