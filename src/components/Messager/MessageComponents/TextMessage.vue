<template>
    <div class="msg-text">
      {{message.text}}
    </div>
</template>

<script lang="ts">
import { IMessage } from "src/types/message"
import { defineComponent, PropType } from "vue"

 export default defineComponent({
   props:{
     message:{
       required: true,
       type: Object as PropType<IMessage>
     }
   }
 })
</script>

<style scoped>

</style>