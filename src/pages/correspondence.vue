<template>
<div class="content">
        <UserDashboard />
    <div class="message-list wrap_Scrollbottom">
        <div id="containerScroll" class="container_Scrollbottom" >
            <Messages />
        </div>
    </div>
    <div class="send-message">
        <SendMessageComponent/>
    </div>  
</div> 
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import UserDashboard from '../components/Chat/UserDashboard.component.vue'
import SendMessageComponent from '../components/Chat/SendMessage.component.vue'
import Messages from '../components/Chat/Correspondence.component.vue'


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
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: var(--correspondence-bg);
    position: relative;
}
.wrap_Scrollbottom {  
  position: relative;
}

.container_Scrollbottom {
    height: 77vh;
    margin-bottom: 14px;
    display: flex;  
}

.send-message{
  position: absolute;
  bottom: 0;
  width: 100%;
}

@media (max-width: 1340px){
    .container_Scrollbottom{
        height: 78vh;
    }
}


</style>