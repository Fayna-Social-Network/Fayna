<template>
  <transition
    appear
    enter-active-class="animated backInRight"
    leave-active-class="animated backOutDown">
      <component :is="$modalsComponents[activeModal]" :modalData="modalData"/>
  </transition>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useModalWindowStore } from 'src/stores/ModalWindow';

export default defineComponent({
  computed:{
    ...mapState(useModalWindowStore, ['activeModal', 'modalData'])
  }
})
</script>