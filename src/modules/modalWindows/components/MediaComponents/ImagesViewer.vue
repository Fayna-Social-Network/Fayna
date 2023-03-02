<template>
  <div class="carusel" v-if="isReady">
    <q-carousel
      swipeable
      animated
      v-model="slide"
      v-model:fullscreen="fullscreen"
      thumbnails
      infinite
    >
      <q-carousel-slide v-for="(image, key) in modalData" :key="image.id"
        :name="key" :img-src="imagesPath[key].replaceAll('\\', '/')" />
      </q-carousel>
      <div class="close-button">
        <q-btn round icon="close" color="secondary" @click="closeHandle"/>
      </div>
  </div>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import Images from "src/types/Images";
import { Close } from "src/modules/modalWindows/services";

export default defineComponent({
    props: {
        modalData:{
            required: true,
            type: Object as PropType<Array<Images>>
        }
    },
    data: () => ({
      slide: 0,
      fullscreen: true,
      imagesPath: Array<string>(),
      isReady: false
    }),
    methods:{
        closeHandle(){
           Close()
        },
    },
    computed:{
        getFullImagePath(){
            return (path: string) => import.meta.env.VITE_APP_BACKEND_PATH + path
        }
    },
    mounted(){
      this.imagesPath = this.modalData.map(image =>
          import.meta.env.VITE_APP_BACKEND_PATH + image.path)
      this.isReady = true
    },
})
</script>

<style scoped>
  .carusel{
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .close-button{
    position: absolute;
    right: 5px;
    top: 5px;
    z-index: 9999;
  }
</style>