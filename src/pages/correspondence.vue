<template>
  <q-page>
    <div class="content">
      <div class="content-header">
        <UserDashboard />
      </div>
      <div class="chat-messages">
       
      </div>
      <div class="send-message-component">
         <SendMessageComponent/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserDashboard from 'components/Messager/UserDashboard.component.vue'
import SendMessageComponent from 'components/Messager/SendMessage.component.vue'
import Messages from 'components/Messager/Message.component.vue'


export default defineComponent({
    components:{
        UserDashboard,
        SendMessageComponent,
        Messages
    }
})
</script>


<style scoped>
.content{
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.chat-messages{
  flex: 1 1 auto;
}
</style>