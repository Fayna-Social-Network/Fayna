<template>
  <q-page>
    <div class="content" >
      <div class="content-header">
        <component :is="$asyncComponents.chat.UserDashboard" />
      </div>
      <div class="chat-messages">
        <component :is="$asyncComponents.chat.Chat" />
      </div>
      <div class="send-message-component">
         <component :is="$asyncComponents.chat.SendMessageComponent" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

   
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