<template>
  <div class="send-message-panel"
    :class="{'bg-dark' : $q.dark.isActive}"
  >
    <div class="button-contol">
      <q-btn round color="primary" icon="mood">
        <StickerBox
          @onSelectSticker="onSelectSticker"
          @selectEmoji="selectEmoji"
        />
      </q-btn>
      <q-btn round color="primary" icon="add">
        <MenuMessage :companion="companion!"/>
      </q-btn>
    </div>
    <div class="message-input">
      <q-input filled v-model="message"
        @input="changeHandler()"
        :placeholder="$t('SendMessageInputPlaceholder')"/>
    </div>
    <div class="button-contol">
      <MicButton :companion="companion!"/>
      <q-btn round color="primary" icon="send" size="17px"
        @click="sendMessageHandle"
      />
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import { useSignalR } from '@quangdao/vue-signalr';
import MicButton from "components/Messager/MicButton.vue";
import MenuMessage from 'components/Messager/menu/MessageComponentMenu.vue'
import StickerBox from 'components/Stikers&Emojis/StickersBoxComponent.vue'
import { mapState, mapActions } from "pinia";
import { useUserStore } from "stores/User";
import { useUserMessagesStore } from "stores/UserMessages";
import { useUserContactsStore } from "stores/UserContacts";
import { v4 as uuid } from 'uuid';
import { IMessage } from "src/types/message";


export default defineComponent({
    data:() =>({
        message: '',
        signalR: useSignalR(),
    }),

    methods: {
      ...mapActions(useUserMessagesStore, ['sendMessage']),

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
        selectEmoji(emoji: string){
            this.message = this.message + emoji
        },
        onSelectSticker(mess : string){
           this.sendMessageTo(mess)
        },

      sendMessageTo(message : string){
        const newMess: IMessage = {
            id: uuid(),
            text: message,
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.companion!.userId
        }
          this.sendMessage({message: newMess, contactId: this.currentCorrespondenceId!})
      }
    },

    computed:{
        ...mapState(useUserStore, ['user']),
        ...mapState(useUserMessagesStore, ['currentCorrespondenceId']),
        ...mapState(useUserContactsStore, ['getContactById']),

        companion(){
          return this.getContactById(this.currentCorrespondenceId!)
        }
    },

    watch:{
      message(){
        this.inputTextChange()
      }
    },

    components:{
      MicButton,
      MenuMessage,
      StickerBox
    }
})
</script>


<style scoped lang="scss">
.send-message-panel{
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 20px;
  background: $secondary;
}

.bg-dark{
  background: $dark;
}

.button-contol{
  display: flex;
  align-items: center;
  gap: 20px;
}
.message-input{
  flex: 1 1 auto;
  padding: 0px 10px 0px 10px;
}

@media screen and (max-width: 500px){
  .send-message-panel{
    padding: 10px 5px 10px 5px;
  }

  .button-contol{
    gap: 8px;
  }
}
</style>