<template>
    <div class="code-message" v-if="isActive" @click="clickHandle()">
       <div class="text-code">
          {{text}}
       </div>

       <div class="message">{{$t('CodeMessage')}}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Open } from "src/functions/modals";
import { IContact } from "src/types/contact";
import { IMessage } from "src/types/message";
import { mapState } from "pinia";
import { useUserMessagesStore } from "stores/UserMessages";

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
    width: 250px;

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