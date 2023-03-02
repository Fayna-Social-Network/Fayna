<template>
  <div v-if="activeModal != ''">
    <transition appear enter-active-class="animated backInRight" leave-active-class="animated backOutDown">
      <component :is="modalWindow" :modalData="modalData" />
    </transition>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { mapState } from 'pinia';
import { useModalWindowStore } from 'src/modules/modalWindows/store';

import ContactChecker from "src/modules/modalWindows/components/UserContacts/ContactChecker.vue"
import MessageReaction from "src/modules/modalWindows/components/MessageModals/ReactionModalComponent.vue"
import AddImage from "src/modules/modalWindows/components/MessageModals/AddImagesToMessage.vue"
import ImageViewer from "src/modules/modalWindows/components/MediaComponents/ImagesViewer.vue"
import CodeEditor from "src/modules/modalWindows/components/MediaComponents/PrismCodeEditor.vue"
import Camera from "src/modules/modalWindows/components/MessageModals/CameraComponent.vue"
import AddContactToUser from "src/modules/modalWindows/components/UserContacts/AddContactToUser.vue"
import CreateContactGroup from "src/modules/modalWindows/components/UserContacts/CreateGroupModal.vue"
import AddNewStickersToUser from "src/modules/modalWindows/components/MessageModals/addNewStickers.modal.vue"
import EditContact from "src/modules/modalWindows/components/UserContacts/EditContact.vue"
import UserCall from "src/modules/modalWindows/components/UserCalling/CallToUser.vue"
import FileSend from "src/modules/modalWindows/components/FilesSend/FileSend.vue"
import Settings from "src/modules/modalWindows/components/UserSettings.vue"

export default defineComponent({
  components: {
    ContactChecker,
    MessageReaction,
    AddImage,
    ImageViewer,
    CodeEditor,
    Camera,
    AddContactToUser,
    CreateContactGroup,
    AddNewStickersToUser,
    EditContact,
    UserCall,
    FileSend,
    Settings
  },

  computed:{
    ...mapState(useModalWindowStore, ['activeModal', 'modalData']),

    modalWindow() {
      return this.activeModal
    }
  }

})
</script>