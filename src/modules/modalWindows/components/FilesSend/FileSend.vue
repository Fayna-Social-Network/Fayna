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
        no-thumbnails
        multiple
        square
        flat
        bordered
        @added="(addFilesHandler as any)"
        @removed="(removedFilesHandler as any)"
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
import { Close } from 'src/modules/modalWindows/services';
import { defineComponent } from 'vue'
import DialogModal from "../DialogModalTemplate.vue"
import FileService from 'src/services/files.service'

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
    addFilesHandler(files: Array<File>){
      this.files = Array.from(files)
    },

    removedFilesHandler(files: Array<File>){
      files.forEach(file => {
        this.files = this.files.filter(f => f.name != file.name)
      })
    },

    async SendFilesHandle(){
      const path = await FileService.uploadFilesAndAddToArchive(this.files)
      console.log(path)
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