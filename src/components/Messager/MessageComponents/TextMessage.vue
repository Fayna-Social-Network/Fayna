<template>
      <div class="msg-text">
        {{message.text}}
      </div>
</template>

<script lang="ts">
import { IMessage } from "src/types/message"
import { defineComponent, PropType } from "vue"
import SuspenseVue from "src/components/Suspense.vue"

 export default defineComponent({
   props:{
     message:{
       required: true,
       type: Object as PropType<IMessage>
     }
   },
 })
</script>

<style scoped>

</style>