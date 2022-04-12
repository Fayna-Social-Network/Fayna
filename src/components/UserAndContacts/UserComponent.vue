<template>
  <Loader v-if="loading"/>
    <Contact
      @click="userClickHandle"
      v-else
    >
     <template #profile>
        <q-avatar rounded size="50px">
          <img :src="avatar">
        </q-avatar>
        <isOnlineBadge v-if="userItem.isOnline"/>
     </template>
     <template #details>
       <div class="nickname">{{nickName}}</div>
       <div class="username">{{username}}</div>
     </template>
     <template #content>
      <div class="action-buttons">
        <q-btn v-if="checkBlockUsers"
          round color="accent" size="12px" class="glossy" icon="block"
          @click.stop="UnBlockUserHandler"
        >
           <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
            >
                {{$t('UnBlock')}}
            </q-tooltip>
        </q-btn>
        <q-btn v-else-if="blockMe"
          round color="negative" size="12px" class="glossy" icon="remove_circle_outline"
        >
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
                {{$t('YouAreBlocked')}}
            </q-tooltip>
        </q-btn>
        <q-btn v-else-if="userContact == undefined"
          round color="primary" size="12px" class="glossy" icon="person_add_alt"
          @click.stop="addUserToContactHandler()"
        >
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
                {{$t('AddContact')}}
          </q-tooltip>
        </q-btn>
        <q-btn v-else
          round color="negative" class="glossy" size="12px" icon="person_remove"
          @click.stop="removeUserFromContactHandler()"
        >
          <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
              transition-show="flip-right"
              transition-hide="flip-left"
          >
              {{$t('DelContact')}}
          </q-tooltip>
        </q-btn>
      </div>
    </template>
  </Contact>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import Contact from './ContactTemplate.vue'
import { mapState, mapActions } from 'pinia'
import { useMainStore } from "stores/Main";
import { useUserStore } from "stores/User";
import { useUserContactsStore } from "stores/UserContacts";
import Contacts from 'src/services/users/contacts.service'
import { Open } from "src/functions/modals";
import User from "src/services/users/user.service";
import Loader from "components/UI/Loader.vue";
import { IUser } from "src/types/user";
import IsOnlineBadge from "components/UI/badges/IsOnline.vue";

export default defineComponent({
    props:{
      userItem:{
        required: true,
        type: Object as PropType<IUser>
      }
    },
    data:() =>({
        nickName: '',
        username: '',
        isOnline: false,
        blockMe: false,
        loading: true
    }),
    methods:{
      userClickHandle(){
        this.$emit('userClick', this.userItem.id)
      },

      addUserToContactHandler(){
        Open('AddContactToUser', this.userItem)
      },

      async removeUserFromContactHandler(){
        const name = this.userContact!.nickName
        await Contacts.delContactFromUser(this.userContact!.contactId)
        this.$q.notify({message: this.$t('UserSuccessDel')})
      },

      async UnBlockUserHandler(){
        const blockUser = this.user!.userBlackLists.find(b => b.blockedUser === this.userItem.id)
        await User.unBlockUser(blockUser!.id)
        this.$q.notify({message: this.$t('UnBlockUser')})
      }

    },
    async mounted() {
          if(this.userItem.firstName || this.userItem.lastName){
              this.username =  this.userItem.firstName+' '
                  +this.userItem.lastName
          }
          this.nickName =  '@' +  this.userItem.nickName
        const res = await User.isUserBlockMe(this.userItem.id)
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
      return this.getContactByUserId(this.userItem.id)
    },

     avatar(){
      if(this.userItem.avatar){
         return  import.meta.env.VITE_APP_BACKEND_PATH +
            this.userItem.avatar
      }else{
         return import.meta.env.VITE_APP_BACKEND_PATH +
              'Resources/Images/user-profile.png'
      }
    },

    checkBlockUsers(){
      let temp = 0
      this.user!.userBlackLists.forEach(blocked => {
        if(blocked.blockedUser === this.userItem.id){
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
        Loader,
        IsOnlineBadge
    }
})
</script>

<style scoped>
.nickname{
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.username{
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
}

.action-buttons{
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translate(0, -50%);
}

</style>