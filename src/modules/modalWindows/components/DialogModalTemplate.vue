<template>
  <div class="overlay">
    <div class="window" ref="win">
      <q-card class="my-card card-my">
        <q-card-section class="bg-primary text-white" style="cursor: pointer;">
          <div class="text-h6"
             onselectstart="return false" onmousedown="return false"
             @mousedown.left="windowMoveHandler($event)"
             @mouseup.left="mouseupHandler"
          >
            <slot name="header-text"></slot>
          </div>
        </q-card-section>
        <q-separator />
        <q-card-section>
          <slot name="body"></slot>
        </q-card-section>
        <q-separator />
        <q-card-actions align="right">
          <slot name="actions"></slot>
        </q-card-actions>
        <div class="button-close" v-if="closeButton">
          <q-btn color="negative"
          icon="close"
          glossy padding="1px 10px 1px 10px"
          size="11px"
          @click="$emit('closeModal')"
          />
        </div>
      </q-card>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
    props:{
      closeButton:{
        type: Boolean,
        default: false
      }
    },
    data: () => ({
      lastX: 0,
      lastY: 0
    }),
    methods:{
      windowMoveHandler(event :MouseEvent){
          this.lastX = event.clientX
          this.lastY = event.clientY
          document.addEventListener('mousemove', this.mouseMove)
        },

        mouseupHandler(){
          document.removeEventListener('mousemove', this.mouseMove)
        },

        mouseMove(event :MouseEvent){
          let stepX = 0
          let stepY = 0
          let left = parseInt(window.getComputedStyle(this.$refs.win, null)
                        .getPropertyValue("left"));
          let top = parseInt(window.getComputedStyle(this.$refs.win, null)
                        .getPropertyValue("top"));

          if(this.lastX > event.clientX){
            stepX = this.lastX - event.clientX
            this.$refs.win.style.left = left - stepX + 'px'
            this.lastX = event.clientX
          }
           if(this.lastX < event.clientX){
            stepX = event.clientX - this.lastX
            this.$refs.win.style.left = left + stepX + 'px'
            this.lastX = event.clientX
          }

          if(this.lastY > event.clientY){
            stepY = this.lastY - event.clientY
            this.$refs.win.style.top = top - stepY + 'px'
            this.lastY = event.clientY
          }
           if(this.lastY < event.clientY){
            stepY = event.clientY - this.lastY
            this.$refs.win.style.top = top + stepY + 'px'
            this.lastY = event.clientY
          }
        }
    }
})
</script>

<style scoped lang="scss">

.card-my{
  position: relative;
}
.overlay{
  position: absolute;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  z-index: 2000;
}

.window{
  width: fit-content;
  top: 50%;
  left: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
}

.button-close{
  position: absolute;
  top: 7px;
  right: 7px;
}
</style>