<template>
    <div class="code-message" v-if="isActive" @click="clickHandle()">
       <div class="text-code">
          {{text}}
       </div>
      
       <div class="message">{{$translate('CodeMessage')}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Open } from "@/functions/modals";
import { IContact } from "@/types/contact";
import { IMessage } from "@/types/message";
import { mapState } from "pinia";
import { useUserMessagesStore } from "@/store/UserMessages";

export default defineComponent({
    props:{
        message:{
            required: true,
            type: Object as PropType<IMessage>
        }
    },
    data:() => ({
        isActive: false,
        text: '</code>'
    }),
    mounted(){
        if(this.message.text.startsWith('<code>')){
            this.isActive = true
        }
    },
    methods:{
        clickHandle(){
            const code = this.message.text.substr(6)
            Open('CodeEditor', {code, contact: this.currentCorrespondenceId})
        }
    },
    computed:{
      ...mapState(useUserMessagesStore, ['currentCorrespondenceId'])
    }
})
</script>

<style scoped>
.code-message{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items:center;
    width: 300px;
    height: 100px;
}
.text-code{
    font-size: 28px;
    user-select: none;
}
.message{
    font-size: 13px;
    color: rgb(63, 63, 63);
    font-style: italic;
    user-select: none;
}
</style>