<template>
  <Window @closeModal="closeHandle">
    <template #header>
      <div class="header-text">
        {{$translate('CameraComponent')}}
      </div>
    </template>
    <template #content>
      <div class="camera-body">     
          <div class="screens">
              <video ref="gumVideo" playsinline autoplay muted></video>
              <div class="source-controls">
                <div class="source-camera btn" :class="{'active': source === 'camera'}" @click="toggleSource('camera')">
                  <span class="material-icons-outlined">videocam</span>
                </div>
                <div class="source-screen btn" :class="{'active': source === 'screen'}" @click="toggleSource('screen')">
                  <span class="material-icons-outlined">desktop_windows</span>
                </div>
              </div>
              <canvas ref="canvas" v-show="getScreenshot"></canvas>
              <video ref="recorded" playsinline v-show="!getScreenshot"></video> 
          </div> 
        <div class="controls">
            <button @click="recordHandle" class="btn"
            :title="$translate('Record')" 
            :disabled="recordDisabled"
            :class="{'red': startRecordingButtonText === 'radio_button_checked', 'disabled' : recordDisabled}">
              <span class="material-icons-outlined">{{startRecordingButtonText}}</span>
            </button>
            <button @click="playHandle" class="btn"
              :title="$translate('Play')"
              :class="{'disabled': playDisabled}" 
              :disabled="playDisabled">
              <span class="material-icons-outlined">play_arrow</span>
            </button>
            <button  class="btn" 
             :title="$translate('Screenshot')"
             :class="{'disabled': snapDisabled}" 
             :disabled="snapDisabled"
             @click="getScreenShotHandle"
             >
              <span class="material-icons-outlined">screenshot</span>
            </button>
            <button @click="downloadHandle" class="btn" 
             :title="$translate('Download')"
             :class="{'disabled': dowloadDisabled}"
             :disabled="dowloadDisabled">
              <span class="material-icons-outlined">file_download</span>
            </button>
            <button class="btn"
               :title="$translate('Refresh')"
               @click="refreshHandle" 
            >
              <span class="material-icons-outlined">restart_alt</span>
            </button>
        </div>

        <div>
            Recording format: <select v-model="codecPreferences" ref="codecSelect" :disabled="codecDisabled"></select>
        </div>
        
        <div class="details">
          <switchCom :label='"Echo"' @toggle="toggleEcho"/>
        </div>
       <div class="send-message" @click="sendMessageHandler"
        :class="{'disabled': !getScreenshot && playDisabled}"
       >
          <span class="material-icons-outlined">send</span>
       </div> 
    </div>  
    </template>
  </Window>    
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import { v4 as uuid } from 'uuid';
import switchCom from "../../UI/checkboxs/switch.vue"
import { Close } from "@/functions/modals"
import Window from '../../ModalWindows/ModalWindowTemplate.vue' 
import FileService from '@/services/FilesService'
import ImageMessage from "@/services/messages/imageMessageService"
import { IContact } from "@/types/contact"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "@/store/User" 
import { IMessage } from "@/types/message"
import { useMainStore } from "@/store/Main"
import { useUserMessagesStore } from "@/store/UserMessages"
import VideoMessage from "@/services/messages/videoMessage.service";

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
          canvas.toBlob(this.sendImageMessage,'image/jpeg', 0.95)        
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
    async sendImageMessage(blob){
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
    toggleSource(value){
      this.source = value
      this.startHandle()
    },
    toggleEcho(value){
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

    handleDataAvailable(event){
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

    handleSuccess(stream) {
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

  async init(constraints) {
   
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
    switchCom,
    Window
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
  }

  .btn{ 
    border: solid 1px rgb(139, 139, 139);
    padding: 6px 6px 0px 6px;
    border-radius: 5px;
    background: inherit;
    color: white;
    transition: all 0.5s ease;
  }

  .red{
    color: red;
  }

  .btn:hover{
    cursor: pointer;
    background: rgb(41, 41, 41);
  }

  .active{
    background: rgb(56, 54, 54);
    box-shadow: 0px 1px 8px 4px rgba(207, 217, 225, 0.2);
  }

  .disabled{
    background: rgb(117, 116, 116) !important;
    color: rgb(179, 176, 176);
  }

  .disabled:hover{
    background: rgb(117, 116, 116);
    color: rgb(179, 176, 176);
  }

  .controls{
    display: flex;
  }
  .source-screen{ 
    margin-top: 10px;
  }

  button{
    margin-left: 18px;
  }
  video{
    border: solid 1px grey;
    width: 300px;
  }

  canvas{
    border: solid 1px grey;
    width: 300px;
  }

.send-message{
  position: absolute;
  right: 20px;
  bottom: 20px;
  height: 50px;
  width: 50px;
  background: #1C9DEA;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 400ms ease;
}

.send-message:hover{
   background: #60afdd;
}
.details{
  margin-top: 20px;
}
</style>