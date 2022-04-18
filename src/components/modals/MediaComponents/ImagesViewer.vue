<template>
  <DefineModal @closeModal="closeHandle">
    <template #content>
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
      </div>
    </template>
  </DefineModal>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import DefineModal from "../DefineModalTemplate.vue";
import Images from "src/types/Images";
import { Close } from "src/functions/modals";

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
    components: {
      DefineModal
    },
})
</script>

<style scoped>
  .carusel{
    width: 100vw;
    height: 100vh;
  }
</style>