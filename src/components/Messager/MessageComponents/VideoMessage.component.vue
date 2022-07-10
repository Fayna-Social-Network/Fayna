<template>
  <SuspenseVue>
    <template #component>
      <div class="loading" v-if="loading">
        <Loader />
      </div>
      <div class="video-player" v-else>
        <video :src="source" controls></video>
      </div>
    </template>
  </SuspenseVue>
</template>

<script lang="ts">
import { IMessage } from "src/types/message"
import { defineComponent, PropType } from "vue"
import Loader from '../../UI/Loader.vue'
import SuspenseVue from "src/components/Suspense.vue"
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
    Loader,
    SuspenseVue
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