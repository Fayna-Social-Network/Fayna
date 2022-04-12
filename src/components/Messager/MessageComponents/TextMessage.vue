<template>
    <div class="msg-text">
      {{message.text}}
    </div>
</template>

<script lang="ts">
import { IMessage } from "@/types/message"
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
.msg-text{
    padding: 16px 20px; 
    font-family: "Montserrat",sans-serif;
    font-size: calc(13px + (14 - 13) * ((100vw - 320px) / (1920 - 320)));
    font-weight: 600;
}    
</style>