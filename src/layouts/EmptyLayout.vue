<template>
    <div class="main">
        <router-view v-slot="{ Component }">
            <transition appear enter-active-class="animate__animated animate__fadeIn" mode="out-in">
                    <component :is="Component" />
            </transition>
        </router-view>
    </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"



export default defineComponent({
    name: "empty-layout",

})
</script>

<style scoped>

</style>
