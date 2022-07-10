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
         <SendMessageComponent/>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { defineAsyncComponent } from 'vue';
import Loader from 'src/components/UI/Loader.vue';

export default defineComponent({

    components:{
        UserDashboard : defineAsyncComponent({
          loader: () => import('components/Messager/UserDashboard.component.vue'),
          loadingComponent: Loader
          }),
        SendMessageComponent : defineAsyncComponent(() => import('components/Messager/SendMessage.component.vue')),
        Chat : defineAsyncComponent(() => import('components/Messager/Chat.vue')),
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