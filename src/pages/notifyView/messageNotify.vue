<template>
  <div class="loading" v-if="loading">
    <Loader />
  </div>
  <div  v-else>
    <div class="content">
        <div class="logo">
          <img :src="'../images/logo-text.png'" alt="">
          <div class="message-date">{{dateTimeFilter(notifyObject?.timestamp)}}</div>
        </div>
        <div class="content-body">
        <div class="user">
          <div class="user-photo">
            <img :src="getUserPhoto" alt="user-photo">
          </div>
          <div class="user-info">
            <div class="user-nickname">
             @{{author?.nickName}}
            </div>
            <div class="user-name">
              {{author?.firstName}} {{author?.lastName}}
            </div>
            <div class="user-mail">
             <span class="material-icons-outlined">email</span>
              <a :href="`mailto:${author?.email}`">{{author?.email}}</a> 
            </div>
          </div>
        </div>
          <div class="user-message">
            <div class="message-content">
              <div class="message">{{$translate("Message")}}:</div>
              <div class="message-body">
                 <component :is="messageComponents[messageComponent]" :message="message"/>
              </div>
            </div> 
          </div>
          <div class="buttons">
            <div class="btn add"
              :class="{'disable': isUserInContacts(author!.id)}"
              @click="addContactHandle($event)">
              {{$translate('AddContact')}}
            </div>
            <div class="btn block" @click="blockContactHandle">
              {{$translate('BlockUser')}}
            </div>
          </div>
          <div class="info">
            <div class="info-content">
              <div class="info-icon">
                <span class="material-icons-outlined">info</span>
              </div>
              <div class="info-text">{{$translate('WantSpeak')}}</div>
            </div>
              <div class="info-content">
              <div class="info-icon">
                <span class="material-icons-outlined">info</span>
              </div>
              <div class="info-text">{{$translate('WantBlock')}}</div>
            </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'
import { mapState, mapActions } from 'pinia'
import { useMainStore } from '@/store/Main' 
import User from '@/services/users/UserService'
import { IUser } from '@/types/user'
import Loader from '@/components/UI/Loader.vue'
import { dateTimeFilter } from '@/filters/time.filter'
import { Open } from '@/functions/modals'
import { useUserContactsStore } from '@/store/UserContacts'
import UserService from '@/services/users/UserService'
import MessageService from '@/services/messages/MessageService'
import { useUserNotificationsStore } from '@/store/UserNotification'
import { chatMessageComponents } from '@/constants/chatMessageComponents'
import messageFilter from '@/filters/message.filter'
import { IMessage } from '@/types/message'

interface messageNotifyData{
  author: IUser | null
  message: IMessage | null
  loading: boolean
  dateTimeFilter: Function
  messageComponents
}

export default defineComponent({
  data: (): messageNotifyData => ({
    author: null,
    message: null,
    loading: true,
    dateTimeFilter,
    messageComponents: chatMessageComponents,
  }),
  methods:{
    ...mapActions(useUserContactsStore, ['isUserInContacts']),

    addContactHandle(e){
      if(!e.srcElement.classList.contains('disable')){
         Open('AddContactToUser', this.author)
      }
    },

    async blockContactHandle(){
      const notifyStore = useUserNotificationsStore()
      this.$router.push({name: 'Start'})
      await UserService.blockUser(this.notifyObject!.author)
      await MessageService.delete(this.notifyObject!.messageId)
      notifyStore.delNotification(this.notifyObject!.messageId)
      this.$alert(this.$translate('UserSuccessBlocked'), false)
    }, 

    async Initialization(){
      const result = await User.getUserById(this.notifyObject!.author)
      this.author = result
      const messResult = await MessageService.getMessageById(this.notifyObject!.messageId)
      this.message = messResult
      this.loading = false
    }
  },
  computed:{
    ...mapState(useMainStore, ['notifyObject']),

    getUserPhoto(){
      if(this.author?.avatar){
          return import.meta.env.VITE_APP_BACKEND_PATH + this.author.avatar
        } else{
            return import.meta.env.VITE_APP_BACKEND_PATH + 
              'Resources/Images/user-profile.png'
        }
    },
    
    messageId(){
      return this.notifyObject?.messageId
    },

    messageComponent(){
      return messageFilter(this.notifyObject!.message)
    },

  },

  watch:{
   async messageId(){
      this.loading = true
      await this.Initialization()
      this.loading = false
    }
  },

  async mounted(){
   await this.Initialization()
   this.loading = false
  },
  components:{
    Loader
  }

})
</script>

<style scoped>
.loading{
  height: 100vh;
}

.content-body{
  width: 80%;
  height: 100vh;
  margin: 0 auto;
}

.logo{
  margin-top: 20px;
  margin-bottom: 150px;
  display: flex;
  width: 100%;
  padding: 0px 10px 0px 10px;
  justify-content: space-between;
  align-items: center;
}
.logo img{
  width: 150px;
}
.user{
  display: flex;
}
.user-photo{
  width: 100px;
  margin-right: 20px;
}
.user-photo img{
  width: 100px;
}
.user-mail{
  display: flex;
}
.user-mail span{
  margin-right: 5px;
}

.user-message{
  margin-top: 40px;
}

.message-content{
  display: flex;
}

.message{
  margin-right: 10px;
  font-style: italic;
  font-family: 'Roboto', sans-serif;
}

.message-body{
  cursor: pointer;
}
.message-date{
  text-align: right;
  font-family: 'Roboto', sans-serif;
  color: grey;
  font-style: italic;
  font-weight: 800;
  font-size: 13px;
}

.buttons{
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}

.btn{
  padding: 10px 20px 10px 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 400ms ease; 
}

.add{
  background: rgb(59, 153, 59);
}

.block{
  background: red;
}

.block:hover{
  background: rgb(226, 44, 44);
}

.add:hover{
  background: rgb(97, 175, 97);
}

.info{
  margin-top: 40px;
}

.info-content{
  display: flex;
  padding-bottom: 20px;
  align-items: center;
}
.info-icon{
  margin-right: 10px;
  color: rgb(197, 123, 71);
  display: flex;
}

.info-text{
   font-family: 'Roboto', sans-serif;
   line-height: 1;
   font-style: italic;
  
}

.disable{
  background: grey;
  color: rgb(179, 179, 179);
  cursor: default;
}

.disable:hover{
  background: grey;
  color: rgb(179, 179, 179);
}
</style>