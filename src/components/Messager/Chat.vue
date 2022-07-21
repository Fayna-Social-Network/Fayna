<template>
      <div class="chat">
        <div class="chat-content">
          <Observer :rootselector="'.chat-content'"
                @handleIntersect="scrollingToTop"/>
        <transition-group  name="list" tag="p">
          <q-chat-message
            v-for="(message, index) in messageItems"
            :key="message.id"
            :avatar="message.seller === user?.id ? getUserAvatar
            : getContactAvatar(currentCorrespondenceId as string)"
            :stamp="getTime(message.timestamp)"
            :sent="message.seller === user?.id"
            :size="getSize(message.text)"
          >

            <template #label>
              <div class="message-date" v-if="isDisplayDate(message.timestamp)">
                <span>{{getDate(message.timestamp)}}</span>
              </div>
            </template>

            <template #name>
              <div class="user-name">
                <span>{{message.seller === user?.id ? getUserFullName
              : getContactNameById(currentCorrespondenceId as string)}}</span>
              </div>
            </template>


              <div ref="messageBlock" id="message-block"
                :class="{'replies': message.seller != user?.id}"
                :data-isread="message.isRead"
              >
                <Message :message="message"/>

                <Observer :rootselector="'.chat-content'" :height="100"
                @handleIntersect="messageHandle(message)"/>
                <div class="menu-button"
                :class="{'friend-menu': message.seller != user?.id}"
                >
                  <q-fab
                    v-model="fabMenu"
                    :label="$t('MessageContextMenu')"
                    label-position="top"
                    external-label
                    color="positive"
                    :icon="message.seller != user?.id ? 'keyboard_arrow_left' : 'keyboard_arrow_right'"
                    :direction="message.seller != user?.id ? 'left' : 'right'"
                    padding="2px"
                  >
                    <q-fab-action v-for="(menuItem, i) in Menu"
                    :key="menuItem.id"
                    padding="5px"
                    :color="`blue-${9 - i}`"
                    :icon="menuItem.icon"
                    @click.stop="menuItemClickHandle(menuItem, message!)"
                    />

                  </q-fab>
                </div>
              </div>

          </q-chat-message>
          <UserTyping v-if="typingMessage &&
              getContactById(currentCorrespondenceId as string)!.userId == typingMessage"/>
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
import { Menu, MenuActions} from 'src/menus/messageContext.menu'
import { MenuItem } from "src/types/menu"


interface ChatData {
  isDisplayDate: Function
  fabMenu: boolean
  currentPage: number
  messagesCount: number
  messageItems: Array<IMessage>
  Menu: Array<MenuItem>
  NumberOfStartMessageDisplay: number
  MenuActions: any
  scrollTopFlag: boolean
}

export default defineComponent({
  data: () : ChatData => ({
    isDisplayDate,
    fabMenu: false,
    currentPage: 0,
    messagesCount: 0,
    messageItems: [],
    Menu,
    NumberOfStartMessageDisplay: 10,
    MenuActions,
    scrollTopFlag: false
  }),
  computed:{
    ...mapState(useUserMessagesStore, ['getCorrespondenceByCountAndPage',
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

    updateMessages(){
      this.messagesCount =
             this.getCorrespondenceByCountAndPage(this.NumberOfStartMessageDisplay,
              this.currentPage).messagesCount
      this.messageItems =
              this.getCorrespondenceByCountAndPage(this.NumberOfStartMessageDisplay,
               this.currentPage).items
    },

    scrollingToTop(){
      const messages = this.$refs.messageBlock as Array<HTMLElement>

      if(!this.scrollTopFlag){
        this.scrollTopFlag = true
        return
      }
      if(this.messagesCount > this.messageItems.length){
        this.currentPage++
        this.messagesCount = this.getCorrespondenceByCountAndPage(this.NumberOfStartMessageDisplay, this.currentPage).messagesCount
        this.messageItems.unshift(...this.getCorrespondenceByCountAndPage(this.NumberOfStartMessageDisplay, this.currentPage).items)

        messages[messages.length - this.NumberOfStartMessageDisplay].scrollIntoView()
      }
    },

    getDate(time : any){
      return dateFilter(time)
    },

    menuItemClickHandle(item : MenuItem, message: IMessage){
      this.MenuActions[item.action]({
        message,
        contactId: this.currentCorrespondenceId!
      })
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
      this.currentPage = 0
      this.scrollTopFlag = false
      this.updateMessages()

      setTimeout(() => {
        this.corrTrigger()
      }, 500);

    },

    messageTrigger(){
      this.currentPage = 0
      this.updateMessages()
      setTimeout(() => {
        this.scrollToEnd()
      }, 10);
    }

  },
  mounted(){
    this.updateMessages()

      setTimeout(() => {
        this.corrTrigger()
      }, 1000);

  },
  components:{
    UserTyping,
    Observer,
    Message,
    ScrollBottom,
  }
})
</script>


<style scoped lang="scss">
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

.message-date span{
  background: #81C784;
  border: solid 1px rgb(57, 71, 28);
  border-radius: 20px;
  padding: 1px 7px 1px 7px;
  font-weight: 700;
  color: rgb(51, 51, 51);
}

.user-name span{
  display: inline-block;
  font-family: $yanone;
  font-size: 16px;
  min-width: 120px;
}


#message-block{
  position: relative;
}

#message-block:hover .menu-button{
  opacity: 1;
}
.menu-button{
  position: absolute;
  top: -42px;
  left: -15px;
  opacity: 0;
  transition: all 400ms ease;
}

.friend-menu{
  left: unset;
  right: -15px;
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

.top_scroll {
  width: 100%;
  height: 20px;
}

@media screen and (max-width: 500px){
  .chat-content{
     padding: 0px 10px 0 10px;
  }
}
</style>