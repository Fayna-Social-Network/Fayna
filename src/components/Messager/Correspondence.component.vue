<template>
<div class="message">
<ul class="chatappend" id="message-container" ref="container">
 <transition-group name="list" tag="p">
    <li 
    v-for="mess in getCorrespondenceNoParams" :key="mess.id"
    :class="{'send': user!.id == mess.seller}"
    class="replies" ref="messageBlock" :data-isread="mess.isRead">
      <div class="date" v-if="isDisplayDate(mess.timestamp)">
         <div class="date-item">{{datefilter(mess.timestamp)}}</div>
      </div> 
        <div class="media">            
            <div class="profile"></div>
            <div class="media-body">
                <div class="contact-name">          
                    <div class="time">{{timefilter(mess.timestamp)}}</div>
                </div>
                <div class="msg-box">
                  <Message :message="mess"/>

                  <div class="message-menu"
                    :class="{'messege-menu-to': user!.id != mess.seller}"
                    v-if="mess.text != '[message_delete]'"
                    >
                      <div class="message-menu-button">
                        <span class="material-icons-outlined">more_vert</span>
                        <ContextMenu 
                          :mess="mess" 
                          class="context-menu-mess" />
                      </div>        
                  </div>
                </div>
            </div>         
        </div>
      <Observer :rootselector="'.chatappend'"
      @handleIntersect="messageHandle(mess)"
      />
    </li>
 <Typing v-if="typingMessage && getContactById(currentCorrespondenceId)!.userId == typingMessage"/>
</transition-group>
  <li ref="down" class="down-scroll" key="23472"></li>
</ul>
<ScrollBottom 
  :rootSelector="'.chatappend'"
  :scrollToSelector="'.down-scroll'"
  />
</div>        
</template>


<script lang="ts">
import { defineComponent} from "vue";
import { mapActions, mapState } from "pinia";
import { isDisplayDate } from "@/functions/messager";
import { timeFilter, dateFilter } from "../../filters/time.filter";
import Typing from "../UI/Message/Typing.vue";
import Observer from "../Observer.vue";
import MessageService from "@/services/messages/MessageService";
import ScrollBottom from "../UI/buttons/ScrollBottom.vue";
import { useUserMessagesStore } from "@/store/UserMessages";
import { useUserStore } from "@/store/User";
import { useUserContactsStore } from "@/store/UserContacts";
import { useMainStore } from "@/store/Main";
import { IMessage } from "@/types/message";
import Message from './Message.component.vue'
import ContextMenu from "./menu/MessageContextMenu.vue";

export default defineComponent({
    data: () =>({
         isImg: false,
         picture: '',
         isDisplayDate,
         arr: [],
         loading: false
    }),

    methods:{
      ...mapActions(useUserMessagesStore, ['setMessageIsRead']),

        scrollToEnd() {
           const down = this.$refs.down as HTMLElement
           down.scrollIntoView()
        },

        timefilter(date){
            return timeFilter(date)
        },

        datefilter(date){
          return dateFilter(date)
        },

       async messageHandle(mess :IMessage){
         if(mess.seller != this.user!.id){
           if(!mess.isRead){
             await MessageService.setRead(mess.id)
             this.setMessageIsRead({contact: this.currentCorrespondenceId, messageId: mess.id})
           }
         }
          
        },

       
        corrTrigger(){
          const messages = this.$refs.messageBlock as Array<HTMLElement>
          if(messages){
            const message = messages.filter(m => m.dataset.isread === 'false' 
                && m.classList[0] === 'replies')
            if(message.length > 0){
              message[0].scrollIntoView()
            }else{
              setTimeout(() => {
                this.scrollToEnd()
              }, 1000);     
            } 
          }
        }
    },

    computed:{
          ...mapState(useUserMessagesStore, ['getCorrespondenceNoParams' , 'currentCorrespondenceId']),
          ...mapState(useUserStore, ['user']),
          ...mapState(useUserContactsStore, ['getContactById']),
          ...mapState(useMainStore, ['mainLayout','typingMessage', 'messageTrigger']),
        
        messageTriggerX(){
            return this.messageTrigger
        },

        changeCorrespondence(){
          return this.currentCorrespondenceId
        }
    },
    watch:{
        messageTriggerX(){
             setTimeout(() => {
                this.scrollToEnd() 
             }, 500);             
        },

         changeCorrespondence(){
           this.corrTrigger()
         }
    },

    mounted(){
      this.corrTrigger()
    },
    components:{
        Typing,
        Observer,
        ScrollBottom,
        Message,
        ContextMenu
    }
    
})

</script>


<style scoped>
.loading{
    display: flex;
    justify-content: center;
    width: 100%;
}

.message{
  width: 100%;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  position: relative;
}
.chatappend{
  display: flex;
  flex-direction: column;
  padding: 0px 15px 0 15px; 
  overflow-y: auto;
}

li {
    margin-top: 10px;
    width: 100%;
    display: list-item;
    text-align: -webkit-match-parent;
    position: relative;
}

li:last-child{
  margin-bottom: 30px;
}

.media-body{
  max-width: 40%;
}

.msg-box {
    position: relative;
    border-radius: 0 25px 25px 30px;
    color: var(--correspondence-message-income-text);
    background-color:var(--correspondence-message-income-bg);
    cursor: pointer;
    
}


    .replies{
        margin-left: auto;
        text-align: left;
    }

    .media{
        position: relative;
        display: flex; 
        align-items: flex-start;
       
        /* flex-direction: row-reverse; */
    }

.date{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.date-item{
  
  background-color: #647589;
  color: white;
  padding: 3px 10px 3px 10px;
  border-radius: 15px;
  font-size: 11px;
  border: solid 1px yellowgreen;
}

.send .media{
    flex-direction: row-reverse;   
}

.send .msg-box{
    color: var(--correspondence-message-send-text);
    background-color:var(--correspondence-message-send-bg);
    border-radius: 30px 0 25px 30px;
}

.contact-name{
    color: var(--text-color);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 5px;
}




.message-menu span:hover{
    transform: scale(1.1);
}
.message-menu{
    position: absolute;
    color:var(--text-color);
    display: flex;
    width: 30px;
    flex-direction: column; 
    left: -35px;
    top: 0;
    opacity: 0;
    transition: all 0.8s ease;
}
.messege-menu-to{
 left: unset;
    right: -35px;
}

.context-menu-mess{
    opacity: 0;
    display: none;
    transition: all 0.5s ease;
}

.message-menu:hover .context-menu-mess{
   display: block;
    opacity: 1;
}

.message-menu-button{
    position: relative;
  
}

.message{
  position: relative;
}

.msg-box:hover .message-menu{
   opacity: 1;
}



.time{
    font-family: "Roboto",sans-serif;
    font-size: calc(11px + (12 - 11) * ((100vw - 320px) / (1920 - 320)));
    font-weight: 400;
    color: #647589;
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





@media (max-width: 1020px){
  .media-body{
  max-width: 95%;
}
}


</style>