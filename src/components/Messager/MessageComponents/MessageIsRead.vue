<template>
 <transition
 appear
 enter-active-class="animated tada"
 leave-active-class="animated tada">
  <div class="message-is-read" v-if="message.isRead && message.seller === user!.id">
    <q-icon name="done_all" color="info"/>
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
  bottom: -45px;
  right: -60px;
}

</style>