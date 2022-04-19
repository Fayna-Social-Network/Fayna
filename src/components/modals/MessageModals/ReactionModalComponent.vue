<template>
    <DialogModal>
      <template #header-text>
        {{$t('Reactions')}}
      </template>
        <template #body>
           <VuemojiPicker
            :pickerStyle="emojiStyle"
            @emojiClick="handleEmojiClick"
           />
        </template>
      <template #actions>
        <q-btn color="negative" :label="$t('Cancel')" @click="closeModal"/>
      </template>
    </DialogModal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { VuemojiPicker, EmojiClickEventDetail} from 'vuemoji-picker'
import Reaction from 'src/services/messages/reactions.service'
import { useSignalR } from '@quangdao/vue-signalr';
import { Close } from "src/functions/modals";
import DialogModal from "../DialogModalTemplate.vue";

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
          await Reaction.Add({MessageId: this.modalData.message.id ,
              ReactionName: reaction.unicode as string})
          this.signalR.invoke('ReactionActivity', {messageId: this.modalData.message.id,
            reactionName: reaction.unicode, contactId: this.modalData.contactId})
          this.closeModal()
        }
    },
    components:{
       DialogModal,
       VuemojiPicker
    }
})
</script>

<style scoped>

</style>