<template>
  <div class="notifications">
    <q-list v-if="Notifications.length > 0">
      <q-item clickable v-for="item in Notifications" :key="item.messageId"
        class="item"
        :class="{'active': activeNotify === item.timestamp}"
      >
        <NotificationItem
        @notifyClick="notifyClickHandle"
        @deleteNotify="deleteNotify"
        :notification="item"/>
      </q-item>
    </q-list>
    <div class="no-notification" v-else>{{$t('NoNotifications')}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationItem from "src/modules/Notifications/components/NotificationItem.component.vue";
import { mapState } from "pinia";
import { useUserNotificationsStore } from "src/modules/Notifications/store/UserNotification";
import { redirectToViewNotification, deleteNotification } from "src/modules/Notifications/services/notification.functions";

export default defineComponent({
  data:() => ({
    activeNotify: new Date
  }),
  computed:{
    ...mapState(useUserNotificationsStore, ['Notifications'])
  },
  methods:{
    notifyClickHandle(item : any){
      this.activeNotify = item.timestamp
      redirectToViewNotification(item)
    },
    deleteNotify(item : any){
      deleteNotification(item)
    }
  },
  components:{
    NotificationItem
  }
})
</script>

<style scoped lang="scss">
.item{
  padding: 0;
}
.active{
   background-color: rgba($color: #000000, $alpha: 0.3);
   border-left: 4px solid $primary;
   transition: all 0.3s ease;
}
.no-notification{
  text-align: center;
  color: grey;
}
</style>