<template>
  <DialogModal>
    <template #header-text>
      {{$t('fileSendHeaderModal')}}
    </template>
    <template #body>
      <q-uploader
        :label="$t('AddFilesToSend')"
        color="primary"
        hide-upload-btn
        multiple
        square
        flat
        bordered
        style="max-width: 300px"
      />
    </template>
    <template #actions>
      <q-btn color="primary" :label="$t('Send')"
       :disable="files.length === 0 || inprocces"
        @click="SendFilesHandle()"
      />
      <q-btn color="negative" :label="$t('Cancel')"
        :disable="inprocces"
        @click="closeHandle()"
      />
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { Close } from 'src/functions/modals';
import { defineComponent } from 'vue'
import DialogModal from "../DialogModalTemplate.vue"

interface ISendFilesData {
  files: Array<File>
  inprocces: boolean
}

export default defineComponent({
  data:(): ISendFilesData => ({
    files: [],
    inprocces: false
  }),
  methods:{
    SendFilesHandle(){

    },

    closeHandle(){
      Close()
    }
  },
  components: {
    DialogModal
  }
})
</script>

<style>

</style>