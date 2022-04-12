<template>
<div class="main">
<div class="content">
    <div class="left-buttons">
        <ul>
                <li
                @mouseover="isStickersActive"
                >
                <a class="icon-btn mobile" >
                <span class="material-icons-outlined">sentiment_satisfied</span></a></li>
                <li
                @mouseover="messageMenuOver"
                ><a class="icon-btn"><span class="material-icons-outlined">add</span>
</a></li>
        </ul>
    </div>
    <div class="input-message">
        <input @keydown.enter="sendMessageHandle" v-model="message"
         @input="inputTextChange"
         type="text" :placeholder="$t('SendMessageInputPlaceholder')">
    </div>
    <div class="rigth-buttons">
        <ul>
            <li>
            <MicButton
            :companion="companion"
            />
            </li>

            <li><a class="icon-btn send" @click="sendMessageHandle" ><span class="material-icons-outlined">send</span></a></li>
        </ul>
    </div>
</div>
<StickerBox :class="{'stickersV': !stickersActive}"
class="stick"
@mouseleave="stickersActive = false"
@onSelectSticker="onSelectSticker"
@selectEmoji="selectEmoji"
/>
<MenuMessage
:companion="companion!"
@mouseleave="messageMenu = false"
v-if="messageMenu"
/>

</div>

</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useSignalR } from '@quangdao/vue-signalr';
// import MicButton from "../UI/buttons/MicButton.vue";
// import MenuMessage from './menu/MessageComponentMenu.vue'
// import StickerBox from '../UI/Stikers&Emojis/StickersBoxComponent.vue'
import { mapState, mapActions } from "pinia";
import { useUserStore } from "stores/User";
import { useUserMessagesStore } from "stores/UserMessages";
import { useUserContactsStore } from "stores/UserContacts";
import { v4 as uuid } from 'uuid';
import { IMessage } from "src/types/message";

export default defineComponent({
    data:() =>({
        message: '',
        stickersActive: false,
        messageMenu: false,
        signalR: useSignalR(),
    }),

    methods: {
      ...mapActions(useUserMessagesStore, ['sendMessage']),

        isStickersActive(){
            this.stickersActive = true
            this.messageMenu = false
        },
        messageMenuOver(){
            this.stickersActive = false
            this.messageMenu = true
        },

        inputTextChange(){
           this.signalR.invoke('UserTypingMessage',
                    {user: this.companion!.userId, fromWho: this.user!.id})
        },

        sendMessageHandle(){
            if(this.message === ''){
                return
            }

            this.sendMessageTo(this.message)
            this.message = ''

        },
        selectEmoji(emoji){
            this.message = this.message + emoji
        },
        onSelectSticker(mess){
           this.sendMessageTo(mess)
             this.stickersActive = false
        },




      sendMessageTo(message){
        const newMess: IMessage = {
            id: uuid(),
            text: message,
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.companion!.userId
        }
          this.sendMessage({message: newMess, contactId: this.currentCorrespondenceId})
      }
    },

    computed:{
        ...mapState(useUserStore, ['user']),
        ...mapState(useUserMessagesStore, ['currentCorrespondenceId']),
        ...mapState(useUserContactsStore, ['getContactById']),

        companion(){
          return this.getContactById(this.currentCorrespondenceId)
        }
    },

    components:{

        // StickerBox,
        // MenuMessage,
        // MicButton,

    }
})
</script>


<style scoped>

.main{
    width: 100%;
    background: var(--send-message-component-bg);
    transition: all 0.5s;
    padding: 5px 45px;
    z-index: 9;
    position: relative;

}
.content{
    display: flex;
}
.input-message{
    width: 100%;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
}
li{
    list-style: none;
    padding-right: 10px;
}

a{
    text-decoration: none;
    color: var(--send-message-component-icon);

}

input{
    width: 100%;
    height: 50px;
    color: var(--send-message-component-text-color);
    padding-left: 20px;
    padding-right: 20px;
    background: var(--send-message-component-input-bg);
    border-radius: 20px;
    border: none;
}

ul{
    display: flex;
}



.icon-btn {
    height: 45px;
    width: 45px;
    cursor: pointer;
    border-radius: 100%;
    font-weight: 800;
    align-items: center;
    justify-content: center;
    display: inline-flex;
   background: var(--send-message-component-icon-bg);
   transition: all 0.6s ease;

}

.stick{
    opacity: 1;
    transition: all 0.6s ease;

}
.stickersV{
    opacity: 0;
    visibility: hidden;
}


.icon-btn:hover{
    background: var(--send-message-component-icon-hover);
}

.send{
    background: var(--send-message-component-icon-send-bg);
    color: var(--send-message-component-icon-send);
}

.send:hover{
    transform: scale(1.1);
    background: var(--send-message-component-icon-send-bg);
}

@media (max-width: 1340px){
    .main{
        position: absolute;
        bottom: 0;
        left: 0;
    }

    .icon-btn{
        height: 40px;
        width: 40px;
    }
}

@media (max-width: 960px){
    .main{
        padding: 0px 0px;
    }
    ul{
        padding-left: 10px;
    }

    input{
         height: 40px;
         font-size: 14px;
    }
    .mobile{
        display: none;
    }
}
</style>