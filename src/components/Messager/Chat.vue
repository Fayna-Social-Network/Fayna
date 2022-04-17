<template>
   <div class="chat">
    <div class="chat-content">
    <transition-group  name="list" tag="p">
      <q-chat-message
        v-for="message in getCorrespondenceNoParams"
        :key="message.id"
        :label="isDisplayDate(message.timestamp) ? getDate(message.timestamp) : undefined"
        :name="message.seller === user?.id ? getUserFullName
        : getContactNameById(currentCorrespondenceId)"
        :avatar="message.seller === user?.id ? getUserAvatar
        : getContactAvatar(currentCorrespondenceId)"
        :stamp="getTime(message.timestamp)"
        :sent="message.seller === user?.id"
        :size="getSize(message.text)"

      >
        <div ref="messageBlock"
          :class="{'replies': message.seller != user.id}"
          :data-isread="message.isRead"
        >
          <Message :message="message"/>

          <Observer :rootselector="'.chat-content'"
          @handleIntersect="messageHandle(message)"/>
        </div>
       </q-chat-message>
      <UserTyping v-if="typingMessage &&
          getContactById(currentCorrespondenceId)!.userId == typingMessage"/>
    </transition-group>
    <div class="div-bottom" ref="bottom"></div>
    </div>
  <ScrollBottom
    :rootSelector="'.chat-content'"
    :scrollToSelector="'.div-bottom'"
  />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "src/stores/User"
import { useUserMessagesStore } from "src/stores/UserMessages"
import { useUserContactsStore } from "src/stores/UserContacts"
import { useMainStore } from "src/stores/Main"
import { timeFilter, dateFilter } from "src/filters/time.filter"
import { isDisplayDate } from "src/functions/messager"
import UserTyping from "./UserTyping.vue"
import { IMessage } from "src/types/message"
import MessageService from "src/services/messages/message.service"
import Observer from 'components/Observer.vue'
import Message from 'components/Messager/Message.component.vue'
import ScrollBottom from "components/UI/Buttons/ScrollBottom.vue"

export default defineComponent({
  data: () => ({
    isDisplayDate
  }),
  computed:{
    ...mapState(useUserMessagesStore, ['getCorrespondenceNoParams' ,
          'currentCorrespondenceId']),
    ...mapState(useUserStore, ['user', 'getUserAvatar', 'getUserFullName']),
    ...mapState(useUserContactsStore, ['getContactAvatar' , 'getContactNameById', 'getContactById']),
    ...mapState(useMainStore, ['typingMessage', 'messageTrigger']),

  },
  methods:{
    ...mapActions(useUserMessagesStore, ['setMessageIsRead']),

    getTime(time: any){
      return timeFilter(time)
    },

    getDate(time : any){
      return dateFilter(time)
    },

    getSize(text: string){
      if(window.innerWidth > 600){
        if(text.length > 100){
          return '5'
        }
      }
    },

    scrollToEnd() {
      const down = this.$refs.bottom as HTMLElement
      down.scrollIntoView()
    },

     corrTrigger(){
      const messages = this.$refs.messageBlock as Array<HTMLElement>

          if(messages){
            const message = messages.filter(m => m.dataset.isread === 'false'
                && m.classList[0] === 'replies')
            if(message.length > 0){
              message[0].scrollIntoView()
            }else{
             this.scrollToEnd()
            }
          }
    },

     async messageHandle(mess :IMessage){
      if(mess.seller != this.user!.id){
        if(!mess.isRead){
          await MessageService.setRead(mess.id)
          this.setMessageIsRead({contact: this.currentCorrespondenceId!, messageId: mess.id})
        }
      }

    },
  },

  watch:{

    currentCorrespondenceId(){
      setTimeout(() => {
        this.corrTrigger()
      }, 200);

    },

    messageTrigger(){
      setTimeout(() => {
        this.scrollToEnd()
      }, 10);
    }

  },
  mounted(){
    setTimeout(() => {
      this.corrTrigger()
    }, 200);
  },
  components:{
    UserTyping,
    Observer,
    Message,
    ScrollBottom
  }
})
</script>


<style scoped>
.chat{
  height: 75vh;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
}
.chat-content{
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  padding: 0px 30px 0 30px;
  overflow-y: auto;

}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

@media screen and (max-width: 500px){
  .chat-content{
     padding: 0px 10px 0 10px;
  }
}
</style>