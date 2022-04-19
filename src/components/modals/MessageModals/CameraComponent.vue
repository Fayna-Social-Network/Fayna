<template>
  <DialogModal close-button @closeModal="closeHandle">
    <template #header-text>
      {{$t('CameraComponent')}}
    </template>
    <template #body>
      <div class="camera-body">

          <div class="screens">

              <video ref="gumVideo" playsinline autoplay muted></video>

              <div class="source-controls">
                 <q-btn icon="videocam" @click="toggleSource('camera')"
                 :color="source === 'camera' ? 'accent' : 'secondary'"
                :class="{'active': source === 'camera'}"
                />
                <q-btn icon="desktop_windows" @click="toggleSource('screen')"
                 :color="source === 'screen' ? 'accent' : 'secondary'"
                :class="{'active': source === 'screen'}"
                />
              </div>

              <canvas ref="canvas" v-show="getScreenshot"></canvas>
              <video ref="recorded" playsinline v-show="!getScreenshot"></video>

          </div>

        <div class="controls">
          <div class="group">
            <q-btn
            :color="startRecordingButtonText === 'radio_button_checked' ? 'negative': 'primary'"
            glossy :icon="startRecordingButtonText"
            @click="recordHandle"
            :disabled="recordDisabled"
            >
              <q-tooltip
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('Record')}}
              </q-tooltip>
            </q-btn>

            <q-btn color="primary" glossy icon="play_arrow"
            @click="playHandle"
            :disabled="playDisabled"
            >
              <q-tooltip
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('Play')}}
              </q-tooltip>
            </q-btn>

            <q-btn color="primary" glossy icon="screenshot"
            @click="getScreenShotHandle"
            :disabled="snapDisabled"
            >
              <q-tooltip
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('Screenshot')}}
              </q-tooltip>
            </q-btn>

            <q-btn color="primary" glossy icon="file_download"
            @click="downloadHandle"
            :disabled="dowloadDisabled"
            >
              <q-tooltip
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('Download')}}
              </q-tooltip>
            </q-btn>

            <q-btn color="primary" glossy icon="restart_alt" @click="refreshHandle">
              <q-tooltip
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('Refresh')}}
              </q-tooltip>
            </q-btn>
          </div>
          <div class="group">
            <div class="record-format">
              {{$t('RecordingFormat')}}
            <select v-model="codecPreferences"
            ref="codecSelect" :disabled="codecDisabled"></select>
        </div>
          </div>
        </div>

        <div class="details">
         <q-toggle
            v-model="hasEchoCancellation"
            checked-icon="check"
            color="green"
            unchecked-icon="clear"
            :label="$t('EchoCancellation')"
         />
        </div>
    </div>
    </template>
    <template #actions>
      <q-btn color="primary" round icon="send"
      :disabled="!getScreenshot && playDisabled"
      @click="sendMessageHandler" />
    </template>
  </DialogModal>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import DialogModal from "../DialogModalTemplate.vue";
import { v4 as uuid } from 'uuid';
import { Close } from "src/functions/modals"
import FileService from 'src/services/files.service'
import ImageMessage from "src/services/messages/imageMessage.service"
import { IContact } from "src/types/contact"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "stores/User"
import { IMessage } from "src/types/message"
import { useMainStore } from "stores/Main"
import { useUserMessagesStore } from "stores/UserMessages"
import VideoMessage from "src/services/messages/videoMessage.service";

type VideoSource = 'camera' | 'screen'

export default defineComponent({
  props:{
    modalData:{
      required: true,
      type: Object as PropType<IContact>
    }
  },
  data:() => ({
    recordDisabled: true,
    playDisabled: true,
    dowloadDisabled: true,
    snapDisabled: true,
    getScreenshot: false,
    startRecordingButtonText: 'radio_button_checked',
    codecDisabled: true,
    mediaRecorder: {} as MediaRecorder,
    recordedBlobs: Array<Blob>(),
    codecPreferences: '',
    hasEchoCancellation: false,
    source: 'camera',
    systemDevices: Array<MediaDeviceInfo>()
  }),
  methods:{
    ...mapActions(useMainStore, ['setMessageTrigger']),
    ...mapActions(useUserMessagesStore, ['addMessageToCorrespondence']),


    closeHandle(){
      Close()
    },
    async sendMessageHandler(){
      if(this.getScreenshot || !this.playDisabled){
        if(this.getScreenshot){
          const canvas = this.$refs.canvas as HTMLCanvasElement
          canvas.toBlob(this.sendImageMessage as BlobCallback,'image/jpeg', 0.95)
        }else{
          const file = new File(this.recordedBlobs, `${Date.now()}.webm`)
          const resultFilePath = await FileService.upload(file, "videos")

          const resultVideoMessage = await VideoMessage.Send({
            videoPath: resultFilePath.data,
            title: '',
            contactId: this.modalData.userId
          })

          const newMess: IMessage = {
            id: resultVideoMessage.data,
            text: '[:video_message:]',
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
      }
    },
    async sendImageMessage(blob: Blob){
      const file = new File([blob], `${Date.now()}.jpeg`);
      const resultFilePath = await FileService.upload(file, "images")
      const imagePath = [resultFilePath.data]

      const resultImageMessageSend = await ImageMessage.Send({
          sellerId: this.user!.id,
          userId: this.modalData.userId,
          header: '',
          description: '',
          dbImagePath: imagePath
      })

       const newMess: IMessage = {
            id: resultImageMessageSend.data,
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
    },
    refreshHandle(){
      this.recordDisabled = true
      this.playDisabled = true
      this.dowloadDisabled = true
      this.snapDisabled = true
      this.getScreenshot = false
      this.startRecordingButtonText = 'radio_button_checked'
      this.codecDisabled = true
      this.recordedBlobs = []
      this.codecPreferences = ''
      this.hasEchoCancellation = false
      this.source = 'camera'
      this.$refs.recorded.src = ''
      this.startHandle()
    },
    getScreenShotHandle(){
      this.recordDisabled = true
      this.playDisabled = true
      this.getScreenshot = true
      this.dowloadDisabled = false
      const canvas = this.$refs.canvas as HTMLCanvasElement
      const video = this.$refs.gumVideo as HTMLVideoElement
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0, canvas.width, canvas.height)
    },
    toggleSource(value: VideoSource){
      this.source = value
      this.startHandle()
    },
    toggleEcho(value: boolean){
      this.hasEchoCancellation = value
    },
    recordHandle(){
      if(this.startRecordingButtonText === 'radio_button_checked'){
        this.snapDisabled = true
        this.startRecording()
      }else{
        this.stopRecording()
        this.startRecordingButtonText = 'radio_button_checked'
        this.playDisabled = false
        this.dowloadDisabled = false
        this.codecDisabled = false
      }
    },
    playHandle(){
      const mimeType = this.codecPreferences.split(';', 1)[0]
      const superBuffer = new Blob(this.recordedBlobs, {type: mimeType})
       this.$refs.recorded.src = URL.createObjectURL(superBuffer)
       this.$refs.recorded.controls = true
       this.$refs.recorded.play()
    },

    downloadHandle(){
      if(this.getScreenshot){
        const canvas = this.$refs.canvas as HTMLCanvasElement
        const url = canvas.toDataURL("image/jpeg")
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${Date.now()}.jpeg`
        a.click()
        setTimeout(() => {
          document.body.removeChild(a)
        }, 100);
      }else{
        const blob = new Blob(this.recordedBlobs, {type: 'video/webm'})
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.style.display = 'none'
        a.href = url
        a.download = `${Date.now()}.webm`
        document.body.appendChild(a)
        a.click()
        setTimeout(() => {
          document.body.removeChild(a)
          URL.revokeObjectURL(url)
        }, 100);
      }
    },

    handleDataAvailable(event: any){
      console.log('handleDataAvailable', event)
      if(event.data && event.data.size > 0){
        this.recordedBlobs.push(event.data)
      }
    },

    getSupportedMimeTypes(){
      const possibleTypes = [
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm;codecs=h264,opus',
        'video/mp4;codecs=h264,aac',
      ]
      return possibleTypes.filter(mimeType => {
        return MediaRecorder.isTypeSupported(mimeType)
      })
    },

    startRecording(){
      this.recordedBlobs = []
      const mimeType = this.codecPreferences
      const options = {mimeType}

      try {
        this.mediaRecorder = new MediaRecorder(window.stream, options)
      } catch (e) {
         console.error('Exception while creating MediaRecorder:', e);
          return;
      }

      console.log('Created MediaRecorder', this.mediaRecorder, 'with options', options)
      this.playDisabled = true
      this.dowloadDisabled = true
      this.startRecordingButtonText = 'stop_circle'
      this.codecDisabled = true
      this.mediaRecorder.onstop = (event) => {
        console.log('Recorder stopped: ', event);
        console.log('Recorded Blobs: ', this.recordedBlobs);
      }
      this.mediaRecorder.ondataavailable = this.handleDataAvailable;
      this.mediaRecorder.start();
      console.log('MediaRecorder started', this.mediaRecorder);

    },

    stopRecording() {
      this.mediaRecorder.stop();
    },

    handleSuccess(stream: any) {
      this.recordDisabled = false;
      this.snapDisabled = false;
      console.log('getUserMedia() got stream:', stream);
      window.stream = stream;

      this.$refs.gumVideo.srcObject = stream;

      this.getSupportedMimeTypes().forEach(mimeType => {
        const option = document.createElement('option');
        option.value = mimeType;
        option.innerText = option.value;
        this.$refs.codecSelect.appendChild(option);
      });
    this.codecDisabled = false;
  },

  async init(constraints: any) {

    let stream
    try {
      if(this.source === 'camera'){
          stream = await navigator.mediaDevices.getUserMedia(constraints);
      }else{
          stream = await navigator.mediaDevices.getDisplayMedia({video: true});
      }
      this.handleSuccess(stream);
    } catch (e) {
      console.error('navigator.getUserMedia error:', e)
    }
  },

 async startHandle(){
    const constraints = {
      audio: {
        echoCancellation: {exact: this.hasEchoCancellation}
      },
      video: {
        width: 1280, height: 720
      }
    }
     console.log('Using media constraints:', constraints);
     await this.init(constraints);
  }

},
computed:{
  ...mapState(useUserStore, ['user'])
},
mounted(){
   navigator.mediaDevices.enumerateDevices().then(devices => {
     this.systemDevices = devices
    });
    this.startHandle()
},
  components:{
    DialogModal
  }
})
</script>

<style scoped>

  .camera-body{
    display: flex;
    flex-direction: column;
    position: relative;
    height: 100%;
  }
  .screens{
    display: flex;
    margin-top: 10px;
    margin-bottom: 10px;
    gap: 15px;
  }

  .source-controls{
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
  }



  .active{
    background: rgb(56, 54, 54);
    box-shadow: 0px 1px 8px 4px rgba(207, 217, 225, 0.2);
  }


  .controls{
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .group{
    display: flex;
    gap: 5px;
  }

  .record-format{
    display: flex;
    flex-direction: column;
  }
  .source-screen{
    margin-top: 10px;
  }

  video{
    border: solid 1px grey;
    width: 300px;
  }

  canvas{
    border: solid 1px grey;
    width: 300px;
  }

.details{
  margin-top: 20px;
}
</style>