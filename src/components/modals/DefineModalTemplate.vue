<template>
    <div class="modal">
          <div class="window" ref="win">
            <div class="modal-header"
              @mousedown.left="windowMoveHandler($event)"
              @mouseup.left="mouseupHandler"
            >
                <h2 class="modal-title" onselectstart="return false" onmousedown="return false">
                    <slot name="header">
                    </slot>
                </h2>
                <button class="close" @click="closeHandle" type="button">
                <span class="material-icons-outlined">close</span></button>
            </div>
            <section class="modal-content">
                <slot name="content">
                </slot>
            </section>
            <div class="modal-footer">
              <slot name="footer">
              </slot>
            </div>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    data: () => ({
      lastX: 0,
      lastY: 0
    }),
    methods:{
        closeHandle(){
            this.$emit('closeModal')
        },
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


<style scoped>
.modal{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 9999;
}

.window{
    position: absolute;
    min-width: 375px;
    border: solid 1px darkslategrey;
    border-radius: 10px;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}


.modal-header {
    padding: 10px 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* padding: 10px; */
    border-bottom: 1px solid var(--modal-window-border-bottom);
    background-color: var(--modal-window-bg);
    position: relative;
    cursor: pointer;
}

.modal-title{
    color: var(--modal-window-title-color);
    text-transform: capitalize;
    font-weight: 700;
    margin-bottom: 0;
    line-height: 1.5;
}

 .close {
    color: var(--modal-window-close-icon-color);
    width: 77px;
    height: 55px;
    background: var(--modal-window-close-bg);
    border-radius: 0 0 0 90px;
    position: absolute;
    right: 0;
    top: 0;
    border: none;
    opacity: 1;
    cursor: pointer;
    transition: all 0.6s ease;
}

.close:hover{
    background: var(--modal-window-close-hover);
}

.modal-content{
    background: var(--modal-window-content-bg);
    padding: 15px;
    color: var(--modal-window-text-color);
    height: 430px;
    overflow-y: auto;
    overflow-x: hidden;
}

.modal-footer{
  background-color: var(--modal-window-bg);
}
</style>