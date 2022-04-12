<template>
<div class="loading" v-if="loading">
  <Loader />
</div>
  <div class="video-player" v-else>
    <video :src="source" controls></video>
  </div>
</template>

<script lang="ts">
import { IMessage } from "@/types/message"
import { defineComponent, PropType } from "vue"
import Loader from '../../UI/Loader.vue'
import VideoMessage from "@/services/messages/videoMessage.service"

export default defineComponent({
  props:{
    message:{
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  data: () => ({
    loading: true,
    source: ''
  }),
  methods:{
    async getVideoSource(){
      const result = await VideoMessage.Get(this.message.id)
      const path = result.data.path 
      return import.meta.env.VITE_APP_BACKEND_PATH + path
    }
  },
  async mounted(){
    this.source = await this.getVideoSource()
    this.loading = false
  },
  components:{
    Loader
  }
})
</script>

<style scoped>

.video-player{
  padding: 25px 20px 15px 30px;
}
video{
  width: 300px;
}
</style>