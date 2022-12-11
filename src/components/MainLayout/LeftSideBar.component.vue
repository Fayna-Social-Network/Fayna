<template>
<div class="leftside-content">
  <LeftSideHeader  />
    <div class="list">
        <div class="content">
        <transition
          appear
          enter-active-class="animated fadeInLeft">
          <component :is="componentList[mainMenuNumber as any]" />
        </transition>
        </div>
    </div>
 </div>
</template>


<script lang="ts">
import LeftSideHeader from './LeftSideBarComponents/LeftSideBarHeaderComponent.vue'

import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useMainStore } from 'stores/Main'
import { defineAsyncComponent, markRaw } from "vue";

export default defineComponent({
   data: () => ({
     componentList: [
       markRaw(defineAsyncComponent(() => import('./LeftSideBarComponents/ContactList.component.vue'))),
       markRaw(defineAsyncComponent(() => import('./LeftSideBarComponents/GroupsList.component.vue'))),
       markRaw(defineAsyncComponent(() => import('./LeftSideBarComponents/ChannelList.component.vue'))),
       markRaw(defineAsyncComponent(() => import('./LeftSideBarComponents/FileList.component.vue'))),
       markRaw(defineAsyncComponent(() => import('./LeftSideBarComponents/NotificationList.component.vue'))),
     ]
   }),
    computed:{
      ...mapState(useMainStore, ['mainMenuNumber'])
    },

    components:{
        LeftSideHeader,
    }
})
</script>

<style scoped>
.leftside-content{
   width: 100%;
   height: 100vh;
}
.header{
    padding: 10px;
}

.list{
    height: 89vh;
    overflow-y: auto;
}

</style>