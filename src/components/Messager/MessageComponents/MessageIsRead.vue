<template>
 <transition appear enter-active-class="animate__animated animate__tada" leave-active-class="animate__animated animate__tada" mode="out-in">
  <div class="message-is-read" v-if="message.isRead && message.seller === user!.id">
    <span class="material-icons-outlined">done_all</span>
  </div>
</transition>
</template>

<script lang="ts">
import { IMessage } from "src/types/message"
import { defineComponent, PropType } from "vue"
import { mapState } from "pinia"
import { useUserStore } from "stores/User"

export default defineComponent({
  props:{
    message:{
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  computed:{
    ...mapState(useUserStore, ['user'])
  }
})
</script>

<style scoped>
.message-is-read{
  position: absolute;
  bottom: -20px;
  right: 0;
}

.message-is-read span{
  color: var(--text-color);
  font-size: 15px;
}
</style>