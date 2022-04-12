<template>
  <div class="content" v-if="isActive">
    <div class="title">
      <a :href="openGraph.urlTag" target="_blank">{{openGraph.title}}</a>
    </div>
    <div class="image" v-if="openGraph.image != ''">
      <img :src="openGraph.image" alt="">
    </div>
    <div class="description" v-if="openGraph.description != ''">{{openGraph.description}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import isURL from 'validator/es/lib/isUrl'
import { IMessage } from "@/types/message"
import { OpenGraph } from "@/types/OpenGraph"
import { openGraphScrap } from "@/services/common"

export default defineComponent({
  props:{
    message:{
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  data:() => ({
    isActive: false,
    openGraph: {} as OpenGraph
  }),
  async mounted(){
    if(isURL(this.message.text)){
      this.isActive = true
      const result = await openGraphScrap({url: this.message.text})
      this.openGraph = result.data 
      if(this.openGraph.urlTag == ''){
        this.openGraph.urlTag = this.message.text
      }
      if(this.openGraph.title == ''){
        this.openGraph.title = this.message.text
      }
    }
  },
  methods:{
    clickHandle(){
     
    }
  }
})
</script>

<style scoped>
.title{
  padding: 15px 10px 10px 10px;
}

a{
  color: var(--text-color);
  transition: all 0.3s ease;
}
a:hover{
  color: blueviolet;
}

img{
  width: 100%;
}

.description{
  padding: 10px;
  font-size: 13px;
  font-style: italic;
  line-height: 1.1;
  overflow: hidden;
}
</style>