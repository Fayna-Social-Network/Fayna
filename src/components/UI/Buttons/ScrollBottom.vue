<template>
  <div class="button" v-if="scrollHeight - scrollTop > distance"
  @click="clickHandle"
  >
   <q-icon name="expand_more" size="30px"/>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"

interface scrollButtonData{
  rootElement: HTMLElement | null
  scrollHeight: number,
  scrollTop: number
}

export default defineComponent({
  props:{
    rootSelector:{
      required: true,
      type: String
    },
    scrollToSelector:{
      type: String
    },
    distance:{
      type: Number,
      default: 500
    }
  },
  data: (): scrollButtonData => ({
    rootElement: null,
    scrollHeight: 0,
    scrollTop: 0
  }),
  methods:{
   clickHandle(){
     this.$emit('clickHandle')
     if(this.scrollToSelector){
       const el = document.querySelector(this.scrollToSelector) as HTMLElement
       el.scrollIntoView({behavior: 'smooth'})
     }
   }
  },
  mounted(){
    this.rootElement = document.querySelector(this.rootSelector) as HTMLElement
    this.rootElement?.addEventListener('scroll', () => {
      this.scrollHeight = this.rootElement!.scrollHeight - this.rootElement!.offsetHeight
      this.scrollTop = this.rootElement!.scrollTop
    })
  },
  unmounted(){
    this.rootElement?.removeEventListener('scroll', ()=>{})
  }
})
</script>

<style scoped lang="scss">
.button{
  position: absolute;
  width: 50px;
  height: 50px;
  background: $primary;
  color: #fff;
  border-radius: 50%;
  bottom: 15px;
  right: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .3;
  cursor: pointer;
  transition: opacity 0.3s ease;
}

.button:hover{
  opacity: 1;
}
</style>