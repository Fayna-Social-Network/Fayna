<template>
  <div class="notifications">
    <ul class="notification-list" v-if="Notifications.length > 0">
      <li v-for="item in Notifications" :key="item.messageId"
        class="item"
        :class="{'active': activeNotify === item.timestamp}"
      >
        <NotificationItem
        @notifyClick="notifyClickHandle"
        @deleteNotify="deleteNotify"
        :notification="item"/>
      </li>
    </ul>
    <div class="no-notification" v-else>{{$t('NoNotifications')}}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import NotificationItem from "../NotificationComponents/NotificationItem.component.vue";
import { mapState } from "pinia";
import { useUserNotificationsStore } from "stores/UserNotification";
import { redirectToViewNotification, deleteNotification } from "src/functions/notification.functions";

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

<style scoped>
.item{
  margin-bottom: 5px;
}
.active{
    background-color: var(--contact-list-active-bg);
    border-left: 4px solid var(--contact-list-active-border);

    transition: all 0.3s ease;
}

.no-notification{
  text-align: center;
  color: grey;
}
</style>