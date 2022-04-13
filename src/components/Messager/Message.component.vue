<template>
  <div class="message">
      <Reaction :message='message'/>
      <MessageIsRead :message="message" />
      <component :is="messageType[messageFilter(message.text)]" :message="message"/>
  </div>
</template>

<script lang="ts">
import { IMessage } from 'src/types/message'
import { defineComponent, PropType } from 'vue'
import Reaction from './MessageComponents/ReactionsMonitor.vue'
import MessageIsRead from './MessageComponents/MessageIsRead.vue'
import messageFilter from 'src/filters/message.filter'
import { chatMessageComponents } from 'src/constants/chatMessageComponents'

export default defineComponent({
  props: {
    message: {
      required: true,
      type: Object as PropType<IMessage>
    },
  },
    data:() => ({
      messageFilter,
      messageType: chatMessageComponents
    }),
    components:{
      Reaction,
      MessageIsRead
    }
})
</script>

<style scoped>

</style>