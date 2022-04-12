<template>
    <Modal
    @closeModal="closeModal"
    >
        <template #header>
            {{$translate('Reactions')}}
        </template>
        <template #content>
           <VuemojiPicker
            :pickerStyle="emojiStyle"
            @emojiClick="handleEmojiClick"
           />
        </template>
    </Modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Modal from '../ModalWindowTemplate.vue'
import { VuemojiPicker, EmojiClickEventDetail} from 'vuemoji-picker'
import Reaction from '../../../services/messages/ReactionsService'
import { useSignalR } from '@quangdao/vue-signalr';
import { Close } from "@/functions/modals";


export default defineComponent({
    props: ['modalData'],
    data:() => ({
        signalR: useSignalR(),
         emojiStyle: {
          background: 'var(--stickers-box-bg)',
          borderColor: 'var(--stickers-box-bg)',
          inputFontColor: 'var(--text-color)'
        } 
    }),
    methods:{
      closeModal(){
        Close()  
      },
       async handleEmojiClick(reaction :EmojiClickEventDetail){
        //   this.$store.commit('setReaction', {messageId: this.data.message.id, reactionName: reaction})
          await Reaction.Add({MessageId: this.modalData.message.id , 
              ReactionName: reaction.unicode as string})
          this.signalR.invoke('ReactionActivity', {messageId: this.modalData.message.id, 
            reactionName: reaction.unicode, contactId: this.modalData.contactId})
          this.closeModal()
        }
    },
    components:{
        Modal,
        VuemojiPicker
    }
})
</script>

<style scoped>

</style>