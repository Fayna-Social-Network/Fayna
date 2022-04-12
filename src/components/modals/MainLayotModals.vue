<template>
  <transition
    appear
    enter-active-class="animated backInRight"
    leave-active-class="animated backOutDown">
      <component :is="modals[activeModal]" :modalData="modalData"/>
  </transition>
</template>


<script lang="ts">
import { defineComponent, defineAsyncComponent, markRaw } from "vue";
import { mapState } from "pinia";
import { useModalWindowStore } from "stores/ModalWindow";

export default defineComponent({
  data:() => ({
    modals:{
      // ContactChecker :  markRaw(defineAsyncComponent(() =>
      //     import('./UserContacts/ContactChecker.vue'))),
      // MessageReaction:  markRaw(defineAsyncComponent(() =>
      //     import('./MessageModals/ReactionModalComponent.vue'))),
      // AddImage : markRaw(defineAsyncComponent(() =>
      //     import('./MessageModals/AddImage.vue'))),
      // ImageViewer: markRaw(defineAsyncComponent(() =>
      //     import('../MediaComponents/ImagesViewer.vue'))),
      // CodeEditor: markRaw(defineAsyncComponent(() =>
      //     import('../MediaComponents/PrismCodeEditor.vue'))),
      // Camera : markRaw(defineAsyncComponent(() =>
      //     import('./MessageModals/CameraComponent.vue'))),
      AddContactToUser: markRaw(defineAsyncComponent(() =>
          import('components/modals/UserContacts/AddContactToUser.vue'))),
      // CreateContactGroup: markRaw(defineAsyncComponent(() =>
      //     import('./UserContacts/CreateGroupModal.vue'))),
      // AddNewStickersToUser: markRaw(defineAsyncComponent(() =>
      //     import('./MessageModals/addNewStickers.modal.vue'))),
      // EditContact: markRaw(defineAsyncComponent(() =>
      //     import('./UserContacts/EditContact.vue'))),
    }
  }),

  computed:{
    ...mapState(useModalWindowStore, ['activeModal', 'modalData'])
  }
})
</script>