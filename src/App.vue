<template>
  <router-view />
</template>

<script lang="ts">
(window as any).global ||= window;

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App'
});
</script>
