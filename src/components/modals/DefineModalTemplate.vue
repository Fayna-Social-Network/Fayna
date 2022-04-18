<template>
    <div class="modal">
      <div class="window">
        <div class="close-btn">
          <q-btn round color="accent" icon="close" @click="$emit('closeModal')"/>
        </div>
        <slot name="content"></slot>
      </div>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({

})
</script>


<style scoped>
.modal{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 99999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.window{
  width: fit-content;
  position: relative;
}

.close-btn{
  position: absolute;
  top: 0;
  right: 0;
}

</style>