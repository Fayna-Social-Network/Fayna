<template>
  <q-page>
    <div class="content">
      <div class="content-header">
        <UserDashboard />
      </div>
      <div class="chat-messages">
        <Chat />
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
import Chat from 'src/components/Messager/Chat.vue';


export default defineComponent({
    components:{
        UserDashboard,
        SendMessageComponent,
        Chat
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