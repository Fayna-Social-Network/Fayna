<template>
  <div class="loading" v-if="!isReady">
    <Loader />
  </div>
  <div class="sticker" v-else>
    <img :src="getFullPath(sticker!.path)" alt="" loading="lazy">
  </div>
</template>

<script lang="ts">
import Stickers from "@/services/messages/sticker.service"
import { IMessage } from "@/types/message"
import { ISticker } from "@/types/sticker"
import Loader from "../../UI/Loader.vue"
import { defineComponent, PropType } from "vue"

interface StickerData{
  isReady: boolean
  sticker: ISticker | null
}

export default defineComponent({
  props: {
    message:{
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  data:(): StickerData => ({
    isReady: false,
    sticker: null
  }),
  methods:{
    getFullPath(path: string): string{
      return import.meta.env.VITE_APP_BACKEND_PATH + path
    }
  },

  async created(){
    const stickerId = this.message.text.slice(4)
    const result = await Stickers.getStickerById(stickerId)
    this.sticker = result.data
    this.isReady = true
  },
  components:{
    Loader
  }
})
</script>


<style scoped>
.sticker{
  /* height: 200px; */
  padding: 20px;
}

.loading{
  height: 200px;
  width: 200px;
}
</style>