<template>
  <div class="target"  ref="target"></div>
</template>

<script lang="ts">
import { defineComponent} from "vue"

interface ObserverData{
  observer: IntersectionObserver | null
}

export default defineComponent({
  props:{
    rootselector:{
      required: true,
      type: String
    },
  },

  data:  (): ObserverData => ({
    observer: null
  }),

  mounted(){
    const options = {
      root: document.querySelector(this.rootselector),
      rootMargin: "0px",
      threshold: 1
    }

    this.observer = new IntersectionObserver(([entry]) => {
      if(entry && entry.isIntersecting){
        this.$emit('handleIntersect')

      }

    }, options)

    this.observer.observe(this.$refs.target as Element)
  },

  beforeUnmount(){
    this.observer?.disconnect()
  }

})

</script>

<style scoped>
.target{
  width: 100%;
  height: 20px;
  background: transparent;
}
</style>