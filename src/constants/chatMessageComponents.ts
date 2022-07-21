import { defineAsyncComponent, markRaw } from 'vue'

export const chatMessageComponents = {
  TextMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/TextMessage.vue'))),
  DelMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/DelMessage.vue'))),
  StickerMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/StickerViewer.vue'))),
  AudioMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/AudioMessageComponent.vue'))),
  ImagesMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/ImagesMessageComponent.vue'))),
  CodeMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/CodeMessageComponent.vue'))),
  OpenGraphMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/MessageOpenGraphViewer.vue'))),
  VideoMessage : markRaw(defineAsyncComponent(() => import('components/Messager/MessageComponents/VideoMessage.component.vue')))
}