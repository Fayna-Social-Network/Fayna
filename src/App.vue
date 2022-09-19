<template>
  <router-view />
</template>

<script lang="ts">
  window.global ||= window;
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>
