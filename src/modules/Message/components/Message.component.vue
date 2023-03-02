<template>
  <div class="message">
      <Reaction :message='message'/>
      <MessageIsRead :message="message" />
      <component :is="getMessage" :message="message"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { IMessage } from 'src/modules/Chat/types/message'
import { GetTypeOfMessage } from '../services'

import Reaction from './MessageComponents/ReactionsMonitor.vue'
import MessageIsRead from './MessageComponents/MessageIsRead.vue'

import StickerMessage from './MessageComponents/StickerViewer.vue'
import AudioMessage from './MessageComponents/AudioMessageComponent.vue'
import ImagesMessage from './MessageComponents/ImagesMessageComponent.vue'
import CodeMessage from './MessageComponents/CodeMessageComponent.vue'
import OpenGraphMessage from './MessageComponents/MessageOpenGraphViewer.vue'
import DelMessage from './MessageComponents/DelMessage.vue'
import VideoMessage from './MessageComponents/VideoMessage.component.vue'
import TextMessage from './MessageComponents/TextMessage.vue'

export default defineComponent({
  components:{
      Reaction,
      MessageIsRead,

      StickerMessage,
      AudioMessage,
      ImagesMessage,
      CodeMessage,
      OpenGraphMessage,
      DelMessage,
      VideoMessage,
      TextMessage
  },

  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>
    },
  },

  computed: {
    getMessage() {
      return GetTypeOfMessage(this.message.text)
    }
  }
})
</script>

