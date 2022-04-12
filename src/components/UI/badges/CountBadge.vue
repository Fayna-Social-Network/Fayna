<template>
   <div class="message-badge"
     :class="{'numberMessActive': number != 0}"
     ><span>{{number}}</span></div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  props:{
    number:{
      required: true,
      type: Number
    }
  }
})

</script>


<style scoped lang="scss">
  .message-badge{
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    font-size: 13px;
    position: absolute;
    right: 10px;
    bottom: 0;
    border-radius: 100%;
    background: $primary;
    color: white;
    transform: scale(0);
    transition: all 0.6s ease;
  }

  .numberMessActive{
    transform: scale(1);
  }

</style>