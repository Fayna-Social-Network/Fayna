<template>
<div class="leftside-content">
  <LeftSideHeader  />
    <div class="list">
        <div class="content">
        <transition
          appear
          enter-active-class="animated fadeInLeft">
          <component :is="activeList" />
        </transition>
        </div>
    </div>
 </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useMainStore } from 'stores/Main'

import LeftSideHeader from './LeftSideBarComponents/LeftSideBarHeaderComponent.vue'

import ContactList from './LeftSideBarComponents/ContactList.component.vue'
import GroupsList from './LeftSideBarComponents/GroupsList.component.vue'
import ChannelList from './LeftSideBarComponents/ChannelList.component.vue'
import UserFilesList from './LeftSideBarComponents/FileList.component.vue'
import NotificationList from './LeftSideBarComponents/NotificationList.component.vue'


export default defineComponent({
  components:{
        LeftSideHeader,
        ContactList,
        GroupsList,
        ChannelList,
        UserFilesList,
        NotificationList
  },

  computed:{
      ...mapState(useMainStore, ['mainMenuNumber']),

      activeList() {
        switch (this.mainMenuNumber) {
          case 0:
            return ContactList
          case 1:
            return GroupsList
          case 2:
            return ChannelList
          case 3:
            return UserFilesList
          case 4:
            return NotificationList

          default:
            return ContactList
        }
      }
  },


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