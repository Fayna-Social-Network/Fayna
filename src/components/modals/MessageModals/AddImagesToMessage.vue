<template>
  <DialogModal>
    <template #header-text>
      {{$t('AddImages')}}
    </template>
    <template #body>
    <div class="content">
       <q-uploader
        :label="$t('UploadImages')"
        multiple
        hide-upload-btn
        @added="addedImagesHandle"
        @removed="removedImagesHandle"
        style="max-width: 300px"
      />
      <div class="album-addition">
        <div class="check-controls">
          <q-checkbox dense v-model="addHeader" :label="$t('AddHeader')" color="cyan" />
          <q-checkbox dense v-model="addDesc" :label="$t('AddDesc')" color="cyan" />
        </div>
        <div class="inputs">
          <transition-group  name="list" tag="p">
            <q-input v-model="header"  :label="$t('AddAlbumHeader')"  v-if="addHeader"/>
            <q-input v-model="description"  type="textarea"
            :label="$t('AddAlbumDesc')"  v-if="addDesc"/>
          </transition-group>
        </div>
      </div>
    </div>
    </template>
    <template #actions>
       <q-btn color="primary" :label="$t('Send')"
       :disable="files.length === 0"
        @click="SendImageHandle()"
      />
      <q-btn color="negative" :label="$t('Cancel')"
        @click="closeHandle()"
      />
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import DialogModal from "components/modals/DialogModalTemplate.vue"
import { Close } from "src/functions/modals"
import Files from "src/services/files.service"
import ImageService from "src/services/messages/imageMessage.service"
import { IContact } from "src/types/contact"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "src/stores/User"
import { useUserMessagesStore } from "src/stores/UserMessages"
import { IMessage } from "src/types/message"
import { useMainStore } from "src/stores/Main"
import { v4 as uuid } from "uuid"


export default defineComponent({
  props:{
    modalData:{
      required: true,
      type: Object as PropType<IContact>
    }
  },
  data: () => ({
    files: Array<File>(),
    addHeader: false,
    addDesc: false,
    header: '',
    description: ''
  }),
  methods:{
    ...mapActions(useUserMessagesStore, ['addMessageToCorrespondence']),
    ...mapActions(useMainStore, ['setMessageTrigger']),

    addedImagesHandle(files: Array<File>){
      this.files = Array.from(files)
      console.log(this.files)
    },

    removedImagesHandle(files: Array<File>){
      files.forEach(file => {
        this.files = this.files.filter(f => f.name != file.name)
      })
    },

    closeHandle(){
      Close()
    },

    async SendImageHandle(){
       const imagesPath: string[] = []
            for(let file of this.files){
             let imagePath = await Files.upload(file, 'images')
             imagesPath.push(imagePath.data)
            }

        const result =  await ImageService.Send({
          sellerId: this.user!.id,
          userId: this.modalData.userId,
          header: this.header,
          description: this.description,
          dbImagePath: imagesPath
        })

         const newMess: IMessage = {
            id: result.data,
            text: '[:image_message:]',
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.modalData.userId

         }

        this.addMessageToCorrespondence({message: newMess,
           contactId: this.modalData.contactId})
        this.setMessageTrigger(uuid())

        Close()
    }
  },
  computed:{
    ...mapState(useUserStore, ['user'])
  },
  components:{
    DialogModal
  }
})
</script>

<style scoped lang="scss">

.content{
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}
.album-addition{
  margin-top: 10px;
}
.check-controls{
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: solid 1px $border;
  border-radius: 10px;
  padding: 10px;
}
.inputs{
  margin-top: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>