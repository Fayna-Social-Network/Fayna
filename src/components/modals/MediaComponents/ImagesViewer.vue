<template>
    <Overlay>
       <template #content>     
        <div class="window"> 
          <CloseButton @closeModal='closeHandle'/>       
           <Swiper
            :slides-per-view="1"
            :space-between="50"
            :modules="[Effect]" effect="cards"
             @swiper="onSwiper"
           >
           <SwiperSlide 
           v-for="image in modalData"
           :key="image.id"
           >
              <div class="slide-image">      
                <img :src="getFullImagePath(image.path)" alt="">
              </div>                  
            </SwiperSlide>                    
          </Swiper>         
         <div class="slide-button next" @click="swipper.slideNext()" v-if="!swipper.isEnd">
          <span class="material-icons-outlined">navigate_next</span>
         </div>
         <div class="dowload-button" @click="downloadHandler(swipper.realIndex)">
          <span class="material-icons-outlined">file_download</span>
         </div>
         <div class="slide-button prev" @click="swipper.slidePrev()" v-if="!swipper.isBeginning">
          <span class="material-icons-outlined">navigate_before</span>
         </div>
        </div>
    </template> 
  </Overlay>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import Overlay from '../ModalWindows/OverlayComponent.vue'
import Images from "../../types/Images";
import CloseButton from '../UI/buttons/CloseModalButton.vue'
import { Close } from "@/functions/modals";
import { Swiper, SwiperSlide } from 'swiper/vue';
import { EffectCards } from 'swiper';
import FileSaver from "file-saver";

import 'swiper/css';
import 'swiper/css/effect-cards';



export default defineComponent({
    props: {
        modalData:{
            required: true,
            type: Object as PropType<Array<Images>>
        }
    },
    data: () => ({
       Effect: EffectCards,
       swipper: Swiper 
    }),
    methods:{
        closeHandle(){
           Close()
        },
        onSwiper(swiper){
          this.swipper = swiper
          
        },
       async downloadHandler(index){
          FileSaver.saveAs(this.getFullImagePath(this.modalData[index].path), 'hfgsfgs.jpg')
        }
    },
    computed:{
        getFullImagePath(){
            return path => import.meta.env.VITE_APP_BACKEND_PATH + path 
        }
    },

components: {
    Overlay,
    CloseButton,
    Swiper,  
    SwiperSlide
  },
})
</script>

<style scoped>

.window{
  position: relative;
  width: 50vw;
}

img{
  max-height: 88vh;
}

.slide-button{
  position: absolute;
  color: #fff;
  cursor: pointer;
  width: 30px;
  height: 30px;
  background: #642AFB;
  border-radius: 50%;
  border: solid 1px #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: -43px;
  z-index: 99999;
  transition: all 0.5s ease;
}

.slide-button:hover{
  background: #9772f5;
}

.next{
  right: -20px;
}

.prev{
  left: -20px;
}

.dowload-button{
  position: absolute;
  bottom: -53px;
  left: 50%;
  color: #fff;
  cursor: pointer;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translate(-50%, 0);
  transition: all 0.5s ease;
}

.dowload-button:hover{
  background: rgb(173, 172, 172);
}

@media (max-width: 1000px){
  .window{
    width: 88vw;
  }
}

</style>