<template>
<div class="player" v-if="isActive">
   <AudioPlayer :path="source" />
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AudioMessage from "@/services/messages/audioMessageService";
import AudioPlayer from '../../MediaComponents/AudioPlayerComponent.vue'

export default defineComponent({
    props: ['message'],
    data: () => ({
        isActive: false,
        source: ''
    }),
    methods:{
       async getsource(){
           const result = await AudioMessage.Get(this.message.id)
           const path = result.data.path
           this.source = import.meta.env.VITE_APP_BACKEND_PATH + path
        }
    },
  
    mounted(){
        if(this.message.text === '[:audio_message:]'){
            this.getsource()
            this.isActive = true
        }
    },
        components:{
           AudioPlayer     
        }
    

})
</script>