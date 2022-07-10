<template>
  <Suspense>
    <template #default>
      <slot name="component"></slot>
    </template>
    <template #fallback>
      <div class="load">
        <Loader />
      </div>
    </template>
  </Suspense>
</template>

<script>
import { defineComponent } from "vue";
import Loader from "./UI/Loader.vue";

export default defineComponent({
  components: {
    Loader
  }
})
</script>

<style scoped>
.load {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
</style>