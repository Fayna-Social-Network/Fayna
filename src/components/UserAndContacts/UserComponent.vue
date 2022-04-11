<template>

<Loader v-if="loading"/>

    <Contact
      @click="userClickHandle"
      v-else
    >
        <template #profile>
             <img
                class="bg-img"
                :src="avatar"
                alt="Avatar"
                />
            <div v-if="isOnline" class="user-online"></div>
        </template>
        <template #details>
            <h4>{{nickName}}</h4>
            <h5>{{username}}</h5>
        </template>
        <template #content>
            <div v-if="!itsNoMe"
             class="add-friend-button"
             @click.stop="clickToMeHandle()"
            >
                 <span class="material-icons-outlined">insert_emoticon</span>
            </div>

        <div v-else-if="checkBlockUsers"
          @click.stop="UnBlockUserHandler"
        class="del-friend-button">
        <span class="material-icons-outlined">block</span>
        </div>

        <div v-else-if="blockMe"
        class="block-friend">
        <span class="material-icons-outlined">remove_circle_outline</span>
      </div>


        <div v-else-if="userContact == undefined"
        class="add-friend-button"
        @click.stop="addUserToContactHandler()"

        >
            <span class="material-icons-outlined">
                person_add_alt</span>
        </div>

    <div v-else
     @click.stop="removeUserFromContactHandler()"
     class="del-friend-button"

    >
       <span class="material-icons-outlined">person_remove</span>
    </div>
        </template>
    </Contact>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Contact from './ContactTemplate.vue'
import { mapState, mapActions } from 'pinia'
import { useMainStore } from "stores/Main";
import { useUserStore } from "stores/User";
import { useUserContactsStore } from "stores/UserContacts";
import Contacts from 'src/services/users/contacts.service'
import { Open } from "src/functions/modals";
import User from "src/services/users/user.service";
import Loader from "components/UI/Loader.vue";



export default defineComponent({
    props: ['userlist'],
    data:() =>({
        nickName: '',
        username: '',
        isOnline: false,
        itsNoMe: true,
        blockMe: false,
        loading: true
    }),
    methods:{
    userClickHandle(){
      if(this.mainLayout.isMainNavMayHide){
        this.mainLayout.mainNavHide = false
      }
     this.$emit('userClick', this.userlist.id)
    },

    clickToMeHandle(){
      this.$q.notify(`${this.$t('Hello')}, ${this.user!.nickName}!!!`)
    },
    addUserToContactHandler(){
      Open('AddContactToUser', this.userlist)

    },
     async removeUserFromContactHandler(){
        const name = this.userContact!.nickName
       await Contacts.delContactFromUser(this.userContact!.contactId)
        this.$alert(`${name} ${this.$translate('UserSuccessDel')}`, false)
     },

      async UnBlockUserHandler(){
        const blockUser = this.user!.userBlackLists.find(b => b.blockedUser === this.userlist.id)
        await User.unBlockUser(blockUser!.id)
        this.$alert(this.$translate('UnBlockUser'), false)
      }

    },
   async mounted() {
        if(this.userlist.firstName || this.userlist.lastName){
            this.username =  this.userlist.firstName+' '
                 +this.userlist.lastName
        }
         this.nickName =  '@' +  this.userlist.nickName

        if(this.currentUser!.id == this.userlist.id){
            this.itsNoMe = false
    }
      const res = await User.isUserBlockMe(this.userlist.id)
      this.blockMe = res.data.isBlocked
      this.loading = false
   },
    computed: {
   ...mapState(useUserStore, ['user']),
   ...mapState(useMainStore, ['mainLayout']),
   ...mapState(useUserContactsStore, ['getContactByUserId']),

    currentUser(){
      return this.user
    },

    userContact(){
      return this.getContactByUserId(this.userlist.id)
    },

     avatar(){
      if(this.userlist.avatar){
         return  import.meta.env.VITE_APP_BACKEND_PATH +
            this.userlist.avatar
      }else{
         return import.meta.env.VITE_APP_BACKEND_PATH +
              'Resources/Images/user-profile.png'
      }
    },

    checkBlockUsers(){
      let temp = 0
      this.user!.userBlackLists.forEach(blocked => {
        if(blocked.blockedUser === this.userlist.id){
          temp++
        }
      });
      if(temp > 0){
        return true
      }
      return false
    }
  },
    components:{
        Contact,
        Loader
    }
})
</script>

<style scoped>
h5{
 font-family: 'Roboto, sans serif';
}

.bg-img{
  width: 60px;

}

.add-friend-button{
  position: absolute;
  right: 10px;
  top: 17px;
  color: var(--add-friend-left-sidebar-button-color);
  transition: all 0.4s ease;
}

.add-friend-button:hover{
  transform: scale(1.2);
}

.del-friend-button{
  position: absolute;
  right: 10px;
  top: 17px;
  color: var(--del-friend-left-sidebar-button-color);
  transition: all 0.4s ease;
}

.block-friend{
  position: absolute;
  right: 10px;
  top: 17px;
  color: var(--del-friend-left-sidebar-button-color);
}

.del-friend-button:hover{
  transform: scale(1.2);
}

.user-online{
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  left: 0;
  border-radius: 100%;
  background: var(--user-online-badge-bg);
   box-shadow: 0 0 0 0 var(--user-online-badge-bg-shadow);
  animation: pl1 1s infinite;
}

@keyframes pl1 {
    100% {box-shadow: 0 0 0 10px #0000}
}


</style>