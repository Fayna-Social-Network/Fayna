<template>
      <div class="loading" v-if="loading">
        <Loader />
      </div>
        <div class="images-prewiev" v-else>
            <div class="album-header">{{albumHeader}}</div>
            <div class="main-image" @click.stop="imageClickHandle()">
                <div class="badge" v-if="images.length > 1"><span>+{{images.length - 1}}</span></div>
                <q-img width="250px" :src="getImage" alt="" loading="lazy" />
            </div>
            <div class="album-desc">{{albumDesc}}</div>
        </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import { IMessage } from "src/types/message"
import ImageMessage from "src/services/messages/imageMessage.service"
import Images from "src/types/Images"
import Loader from 'components/UI/Loader.vue'
import { Open } from "src/functions/modals"

interface ImageComponentData{
    albumHeader: string,
    albumDesc: string,
    images: Array<Images>
    loading: boolean
}


export default defineComponent({
    props: {
        message:{
            required: true,
            type: Object as PropType<IMessage>
        }
    },
    data:() : ImageComponentData => ({
        albumHeader: '',
        albumDesc: '',
        images: [],
        loading: true
    }),
    methods:{
       async getAlbum(){
           const result = await ImageMessage.Get(this.message.id)
           this.albumHeader = result.data.header
           this.albumDesc = result.data.description
           this.images = result.data.imageMessages
           this.loading = false
        },
        imageClickHandle(){
          Open('ImageViewer', this.images)
        }
    },
    computed:{
        getImage(){
            if(this.images.length != 0){
              return import.meta.env.VITE_APP_BACKEND_PATH + this.images[0].path
            }
            return ''
        }
    },
    mounted(){
       this.getAlbum()
    },
    components:{
      Loader,
    }

})
</script>

<style scoped lang="scss">

.loading{
  height: 250px;
  width: 250px;
}

.images-prewiev{
    padding: 10px 10px 0px 10px;
    cursor: pointer;
}
.main-image{
    position: relative;
}

.album-header{
    margin-bottom: 10px;
    font-family: $oswald;
    font-size: 16px;;
}

.album-desc{
    font-family: $roboto;
    margin-top: 10px;
    font-size: 13px;
    font-style: italic;
}

.badge{
  position: absolute;
  top: -10px;
  right: -10px;
  width: 30px;
  height: 30px;
  display:flex;
  color: white;
  justify-content: center;
  align-items: center;
  z-index: 999;
  font-size: 14px;
  border-radius: 100%;
  background:blue;
   box-shadow: 0 0 0 0 blue;
  animation: pl1 1s infinite;
}

@keyframes pl1 {
    100% {box-shadow: 0 0 0 10px #0000}
}

@media screen and (max-width: 500px){
  .images-prewiev{
    padding: 0;
  }
}

</style>