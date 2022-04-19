<template>
  <div class="content">
    <div>{{id}} User Profile is under Development</div>
    <button @click="$router.back()">Back</button>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
 props: ['id']
})
</script>