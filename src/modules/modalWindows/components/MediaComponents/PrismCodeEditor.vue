<template>
  <DialogModal close-button @closeModal="closeModal">
    <template #header-text>
      {{ $t('CodeEditorHeader') }}
    </template>
    <template #body>
      <div class="editor">
        <prism-editor class="my-editor" v-model="code" :highlight="highlighter" line-numbers>
        </prism-editor>
      </div>
    </template>
    <template #actions>
      <q-btn round icon='send' v-if='activeContact != null' color="primary" @click="sendHandler" />
    </template>
  </DialogModal>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import { mapState } from "pinia";
import { useUserStore } from "src/modules/Users/store/User";
import { useUserContactsStore } from "src/modules/Users/store/UserContacts";
import DialogModal from "src/modules/modalWindows/components/DialogModalTemplate.vue";
import { PrismEditor } from 'vue-prism-editor';
import 'vue-prism-editor/dist/prismeditor.min.css';
import { v4 as uuid } from 'uuid';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { IMessage } from "src/modules/Chat/types/message";
import { Close } from "src/modules/modalWindows/services";
import { IContact } from "src/modules/Users/types/contact";
import { addMessageToChat } from "src/modules/Chat/services";

interface PrismEditorData {
  code: string
  userContact: IContact | null
}

export default defineComponent({
  props: {
    modalData: {
      required: true,
      type: Object as PropType<any>
    },
  },
  data: (): PrismEditorData => ({
    code: '//Write code here!!!',
    userContact: null
  }),

  methods: {

    highlighter(code: string) {
      return highlight(code, languages.js);
    },

    closeModal() {
      Close()
    },

    async sendHandler() {
        const newMessage: IMessage = {
          id: uuid(),
          text: '<code>'.concat(this.code),
          isRead: false,
          timestamp: new Date(),
          seller: this.user!.id,
          chatId: this.userContact!.chatId
        }
        if (this.activeContact != null) {
          await addMessageToChat(newMessage)
        }
        Close()
      },


  },

  mounted() {
    if (this.modalData.code) {
      this.code = this.modalData.code
    }
    if (this.activeContact != null) {
      this.userContact = this.getActiveContact as IContact
    }
  },
  computed: {
    ...mapState(useUserStore, ['user']),
    ...mapState(useUserContactsStore, ['getContactById', 'activeContact', 'getActiveContact'])
  },
  components: {
    DialogModal,
    PrismEditor,
  }
})
</script>

<style scoped>
.window {
  width: 50vw;
  z-index: 999;
}

.editor {
  position: relative;
  width: 50vw;
}

.header {
  color: rgb(175, 170, 164);
  padding-bottom: 10px;
}

.controls-buttons {
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

@media screen and (max-width: 500px) {
  .editor {
    width: 90vw;
  }
}
</style>

