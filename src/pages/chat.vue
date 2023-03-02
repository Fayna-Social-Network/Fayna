<template>
  <q-page>
    <div class="content" >
      <div class="content-header">
        <UserDashboard />
      </div>
      <div class="chat-messages">
        <Chat />
      </div>
      <div class="send-message-component">
        <SendMessage />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import UserDashboard from 'src/modules/Header/components/PageHeader.vue';
import Chat from 'src/modules/Chat/components/Chat.vue';
import SendMessage from 'src/modules/MessageSender/components/SendMessage.component.vue';

export default defineComponent({
  components: {
    UserDashboard,
    Chat,
    SendMessage
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