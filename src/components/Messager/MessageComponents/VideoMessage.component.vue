<template>
<div class="loading" v-if="loading">
  <Loader />
</div>
  <div class="video-player" v-else>
    <video :src="source" controls></video>
  </div>
</template>

<script lang="ts">
import { IMessage } from "src/types/message"
import { defineComponent, PropType } from "vue"
import Loader from '../../UI/Loader.vue'
import VideoMessage from "src/services/messages/videoMessage.service"

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
  padding: 10px 10px 0px 10px;
}
video{
  width: 250px;
}

@media screen and (max-width: 500px){
  .video-player{
    padding: 0;
  }
}
</style>