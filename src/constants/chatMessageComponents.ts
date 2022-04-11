import { defineAsyncComponent, markRaw } from 'vue';

export const chatMessageComponents = {
  TextMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/TextMessage.vue'))),
  DelMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/DelMessage.vue'))),  
  StickerMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/StickerViewer.vue'))),
  AudioMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/AudioMessageComponent.vue'))),
  ImagesMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/ImagesMessageComponent.vue'))),
  CodeMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/CodeMessageComponent.vue'))),
  OpenGraphMessage : markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/MessageOpenGraphViewer.vue'))),
  VideoMessage: markRaw(defineAsyncComponent(() => 
      import('../components/Chat/MessageComponents/VideoMessage.component.vue')))        
}