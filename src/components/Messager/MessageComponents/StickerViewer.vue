<template>
      <div class="loader" v-if="loading">
        <Loader />
      </div>
      <div class="sticker" v-else>
        <q-img :src="getFullPath(sticker!.path)" loading="lazy"/>
      </div>
</template>

<script lang="ts">
import Stickers from "src/services/messages/sticker.service"
import { IMessage } from "src/types/message"
import { ISticker } from "src/types/sticker"
import Loader from "components/UI/Loader.vue"

import { defineComponent, PropType } from "vue"

interface StickerData{
  loading: boolean,
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
    sticker: null,
    loading: true
  }),
  methods:{
    getFullPath(path : string): string{
      return import.meta.env.VITE_APP_BACKEND_PATH + path
    }
  },

  async mounted(){
    const stickerId = this.message.text.slice(4)
    const result = await Stickers.getStickerById(stickerId)
    this.sticker = result.data
    this.loading = false
  },
  components:{
    Loader,
  }

})
</script>


<style scoped>
.sticker{
  width: 150px;
}
</style>