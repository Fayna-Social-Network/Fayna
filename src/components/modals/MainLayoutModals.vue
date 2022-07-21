<template>
  <transition
    appear
    enter-active-class="animated backInRight"
    leave-active-class="animated backOutDown">
      <component :is="modals[activeModal]" :modalData="modalData"/>
  </transition>
</template>


<script lang="ts">
import { defineComponent, markRaw } from "vue";
import { mapState } from "pinia";
import { useModalWindowStore } from "stores/ModalWindow";
import ContactChecker from "components/modals/UserContacts/ContactChecker.vue";
import MessageReaction from "components/modals/MessageModals/ReactionModalComponent.vue";
import AddImage from "components/modals/MessageModals/AddImagesToMessage.vue";
import ImageViewer from "components/modals/MediaComponents/ImagesViewer.vue";
import CodeEditor from "components/modals/MediaComponents/PrismCodeEditor.vue";
import Camera from "components/modals/MessageModals/CameraComponent.vue";
import AddContactToUser from "components/modals/UserContacts/AddContactToUser.vue";
import CreateContactGroup from "components/modals/UserContacts/CreateGroupModal.vue";
import addStickersToUser from "components/modals/MessageModals/addNewStickers.modal.vue";
import EditContact from "components/modals/UserContacts/EditContact.vue";
import UserSettings from "./UserSettings.vue";


export default defineComponent({
  data:() => ({
    modals:{
      ContactChecker: markRaw(ContactChecker),
      MessageReaction: markRaw(MessageReaction),
      AddImage: markRaw(AddImage),
      ImageViewer: markRaw(ImageViewer) ,
      CodeEditor: markRaw(CodeEditor),
      Camera: markRaw(Camera),
      AddContactToUser: markRaw(AddContactToUser),
      CreateContactGroup: markRaw(CreateContactGroup),
      AddNewStickersToUser: markRaw(addStickersToUser),
      EditContact: markRaw(EditContact),
      Settings: markRaw(UserSettings)
    }
  }),

  computed:{
    ...mapState(useModalWindowStore, ['activeModal', 'modalData'])
  }
})
</script>