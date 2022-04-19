<template>
  <div class="notification"
    @click="notifyClick"
  >
    <div class="main-content">
      <div class="icon">
        <img :src="icon" />
      </div>
      <div class="content">
        <div class="notify-line">
          <div class="from">{{$t('From')}}</div>
          <div class="from-content">{{notificationData.from}}</div>
        </div>
        <div class="notify-line">
          <div class="type">{{$t('Type')}}</div>
          <div class="type-content">{{$t(notificationData.type)}}</div>
        </div>
      </div>
    </div>
    <div class="button">
       <q-btn round color="negative" icon="delete"
        @click.stop="deleteNotify" size="12px"/>
    </div>
  </div>
</template>


<script lang="ts">
import { INotification } from "src/types/notification"
import { defineComponent, PropType } from "vue"
import { getNotificationItemData } from 'src/functions/notification.functions'
import icon from 'src/assets/image/notify.png'

interface ItemData {
    from: string
    type: string
}

interface NotificationITemData{
  notificationData: ItemData,
  icon: string
}


export default defineComponent({
  props:{
    notification:{
      required: true,
      type: Object as PropType<INotification>
    }
  },

  data:(): NotificationITemData => ({
   notificationData: {
     from: '',
     type: '',
    },
    icon
  }),
  methods:{
    notifyClick(){
      this.$emit('notifyClick', this.notification)
    },
    deleteNotify(){
      this.$emit('deleteNotify', this.notification)
    }
  },

  async created(){
    this.notificationData = await getNotificationItemData(this.notification)
  }

})
</script>

<style scoped>
.notification{
  display: flex;
  width: 100%;
  padding: 10px 5px;
  cursor: pointer;
  justify-content: space-between;
}

.notify-line{
  display: flex;
  font-size: 13px;
}

.main-content{
  display: flex;
}
.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.button{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px;
}
.icon{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

.from{

  margin-right: 5px;

}

.type{
  margin-right: 5px;
}
</style>