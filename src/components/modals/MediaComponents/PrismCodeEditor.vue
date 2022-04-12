<template>
  <Overlay>
    <template #content>
        <div class="window">
        <div class="header">
          <h1>{{$translate('CodeEditorHeader')}}</h1>
        </div>
            <div class="editor">
            <CloseButton @closeModal="closeModal"/>
               <prism-editor class="my-editor" v-model="code" 
                  :highlight="highlighter" line-numbers>
              </prism-editor>
            </div>
           
            <div class="controls-buttons">
                <CircleButton :icon="'send'"
                @click="sendHandler"
                v-if='currentCorrespondenceId != null'/>
            </div>
        </div>
    </template>
  </Overlay>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import { mapState, mapActions } from "pinia";
import { useUserStore } from "@/store/User";
import { useUserMessagesStore } from "@/store/UserMessages";
import { useUserContactsStore } from "@/store/UserContacts";
import Overlay from '../ModalWindows/OverlayComponent.vue'
import CloseButton from '../UI/buttons/CloseModalButton.vue'
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css'; 
import CircleButton from "../UI/buttons/CircleButton.vue";
import { v4 as uuid } from 'uuid';  
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css'; 
import { IMessage } from "../../types/message";
import { Close } from "../../functions/modals";
import { IContact } from "@/types/contact";


interface PrismEditorData{
  code: string
  userContact: IContact | null  
}

export default defineComponent({
  props:{
    modalData:{
      required: true,
      type: Object as PropType<any>
    },
  },
    data:(): PrismEditorData => ({
        code: '//Write code here!!!', 
        userContact: null
    }),
    methods:{
      ...mapActions(useUserMessagesStore, ['sendMessage']),
    
      highlighter(code) {
        return highlight(code, languages.js); 
      },

      closeModal(){
          Close()
      },

      sendHandler(){
        if(this.modalData.userId){
          const newMessage: IMessage ={
            id: uuid(),
            text: '<code>'.concat(this.code),
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.modalData.userId
          } 
          if(this.currentCorrespondenceId != null){
             this.sendMessage({message: newMessage, contactId: this.currentCorrespondenceId})
          }
         
        }else{
          const newMessage: IMessage ={
            id: uuid(),
            text: '<code>'.concat(this.code),
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.userContact!.userId
          }
          if(this.currentCorrespondenceId != null){
             this.sendMessage({message: newMessage, contactId: this.currentCorrespondenceId})
          }
        }
          Close()
      }
    },
    
    mounted(){
      if(this.modalData.code){
        this.code = this.modalData.code
      }
      if(this.currentCorrespondenceId != null){
        this.userContact = this.getContactById(this.currentCorrespondenceId) as IContact
      } 
    },
    computed:{
      ...mapState(useUserStore, ['user']),
      ...mapState(useUserMessagesStore, ['currentCorrespondenceId']),
      ...mapState(useUserContactsStore, ['getContactById'])
    },
    components:{
        Overlay,
       PrismEditor,
       CloseButton,
       CircleButton
    }
})
</script>

<style scoped>
.window{
    width: 50vw;
    z-index: 999;
}
.editor{
  position: relative;
}
.header{
  color:rgb(175, 170, 164);
  padding-bottom: 10px;
}
.controls-buttons{
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
  width: 100%;
  height: 50px;
}
 .my-editor {
    background: #2d2d2d;
    color: #ccc; 
    font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    line-height: 1.5;
    padding: 5px;
    height: 400px;
  }


  .prism-editor__textarea:focus {
    outline: none;
  }
  
</style>

