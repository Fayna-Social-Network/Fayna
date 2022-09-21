<template>
<Teleport to="body" :disabled="!fullscreen"  >
  <div :class="{'video-chat' : fullscreen}">
    <div class="video-content">
      <video ref="localvideo" class="video-local" playsinline autoplay muted></video>
      <video ref="remotevideo" class="video-remote" :class="{'video-remote-full' : fullscreen}" playsinline autoplay></video>
      <div class="video-menu">
        <div class="menu-buttons">
          <q-icon class="nenu-button" color="red" size="35px" name="radio_button_checked"/>
          <q-icon class="nenu-button"
            :name="audioTrackEnabled ? 'mic' : 'mic_off'"
            :color="audioTrackEnabled ? 'white' : 'red'"
            size="35px"
            @click="audioEnableToggleHandler"/>
          <q-icon class="nenu-button"
            :name="videoTrackEnabled ? 'videocam' : 'videocam_off'"
            :color="videoTrackEnabled ? 'white' : 'red'"
            size="35px"
            @click="videoEnableToggleHandler"/>
          <q-icon class="nenu-button"
            :name="fullscreen ? 'fullscreen_exit' : 'fit_screen'"
            size="35px"
            @click="fullscreen = !fullscreen"/>
        </div>
      </div>
    </div>
  </div>
 </Teleport>
</template>

<script lang="ts">
import { IUser } from 'src/types/user';
import { defineComponent, PropType } from 'vue';
import { useSignalR } from '@quangdao/vue-signalr';
import { useUserStore } from 'stores/User'
import { mapState } from 'pinia'

interface IVideoCallData {
  localVideo: HTMLVideoElement | null
  remoteVideo: HTMLVideoElement | null
  localStream: MediaStream | null
  remoteStream: MediaStream
  pc: RTCPeerConnection | null
  servers: RTCConfiguration
  fullscreen: boolean
  audioTrackEnabled: boolean
  videoTrackEnabled: boolean
  recordEnabled: boolean
}

export default defineComponent({
  props:{
    userCall:{
      required: true,
      type: Object as PropType<IUser>
    },
    signalR: {
      required: true,
      type: Object as typeof useSignalR
    },
    incomeCall: {
      required: true,
      type: Boolean
    }
  },
  data: (): IVideoCallData => ({
    servers: {
        iceServers: [
          {
            urls: [
              "stun:stun1.l.google.com:19302",
            ],
          },
        ],
        iceCandidatePoolSize: 10,
      },
      localVideo: null,
      remoteVideo: null,
      localStream: null,
      remoteStream: new MediaStream(),
      pc: null,
      fullscreen: false,
      audioTrackEnabled: true,
      videoTrackEnabled: true,
      recordEnabled: false
  }),
  methods:{

    videoEnableToggleHandler(){
      this.videoTrackEnabled = !this.videoTrackEnabled
      this.localStream!.getVideoTracks()[0].enabled = !(this.localStream!.getVideoTracks()[0].enabled);
    },

    audioEnableToggleHandler(){
      this.audioTrackEnabled = !this.audioTrackEnabled
      this.localStream!.getAudioTracks()[0].enabled = !(this.localStream!.getAudioTracks()[0].enabled);
    },

    startWebCam(){
       navigator.mediaDevices.getUserMedia({
         video: true,
         audio: true,
       }).then((stream) => {
         this.localStream = stream

         this.remoteStream = new MediaStream();

         this.localStream!.getTracks().forEach((track) => {
           this.pc!.addTrack(track, this.localStream!);
         });

         this.pc!.ontrack = (event) => {
           event.streams[0].getTracks().forEach((track) => {
           this.remoteStream.addTrack(track);
         });
         };

         this.localVideo!.srcObject = this.localStream;
         this.remoteVideo!.srcObject = this.remoteStream;

         if(!this.incomeCall) {
            this.CreateVideoCall()
         }
       },
        error => console.log(error)
       )
     },

     async CreateVideoCall() {

        const OfferOptions : RTCOfferOptions = {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }

        this.pc!.onicecandidate = (event) => {
            this.signalR.invoke('SetOfferIceCandidate', {
            UserNickname: this.userCall.nickName,
            IceCandidate: JSON.stringify(event.candidate)
          })
        };

        const offerDescription = await this.pc!.createOffer(OfferOptions);
        await this.pc!.setLocalDescription(offerDescription);

        await this.signalR.invoke('CallToUser', {
          UserToCall: this.userCall.id,
          SignalData: offerDescription.sdp,
        })

      },

      async CallHandler(signal: string){

        this.pc!.onicecandidate = async(event) => {
          await this.signalR.invoke('SetAnswerIceCandidate', {
            UserNickname: this.userCall.nickName,
            IceCandidate: JSON.stringify(event.candidate)
          })
        };

        const offer : RTCSessionDescriptionInit= {
          type: 'offer',
          sdp: signal
        };

        const offerDescription = new RTCSessionDescription(offer)
        await this.pc!.setRemoteDescription(offerDescription);

        const answerDescription = await this.pc!.createAnswer();
        await this.pc!.setLocalDescription(answerDescription);

        await this.signalR.invoke('AnswerToUserCall', {
          Signal: answerDescription.sdp,
          UserNickname: this.userCall.nickName
        });

        this.signalR.on('OfferIceCandidate', (data) => {
          this.pc?.addIceCandidate(new RTCIceCandidate(JSON.parse(data as string)))
        })

      },

      async CreateUserCalling(signal: string){

        const answer: RTCSessionDescriptionInit = {
          sdp: signal,
          type: 'answer'
        }


        if (!this.pc!.currentRemoteDescription) {
          const answerDescription = new RTCSessionDescription(answer);
          this.pc!.setRemoteDescription(answerDescription);
        }

        this.signalR.on('AnswerIceCandidate', (data) => {
          this.pc?.addIceCandidate(new RTCIceCandidate(JSON.parse(data as string)))
          //console.log(JSON.parse(data))
        })

      },
  },
  computed:{
    ...mapState(useUserStore, ['user'])
  },
  mounted(){
    this.signalR.on('UserCalling', (signal: string) => {
      this.CallHandler(signal)
    })
    this.signalR.on('UserAnswerToCall', (signal: string) => {
      this.CreateUserCalling(signal)
    })
    this.pc = new RTCPeerConnection(this.servers);
    this.localVideo = this.$refs.localvideo as HTMLVideoElement
    this.remoteVideo = this.$refs.remotevideo as HTMLVideoElement
    this.startWebCam()
  },
  beforeUnmount() {
      this.pc?.close()
      this.pc = null
  },
})
</script>

<style scoped>

  .video-chat {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 99999;
    background: rgb(36, 35, 35);
  }
 .video-content {
    position: relative;
  }
  .video-local {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 100px;
    border: 2px solid grey;
    border-radius: 5px;
  }
  .video-remote {
    width: 100%;
    height: 100%;
  }

  .video-remote-full {
    width: 100%;
    height: 99vh;
  }

  .video-menu {
    position: absolute;
    left: 0;
    bottom: 15px;
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  .video-menu:hover .menu-buttons {
    translate: 0px 0px;
  }
  .menu-buttons {
    display: flex;
    gap: 20px;
    transition: all 0.4s ease;
    translate: 0px 80px;
  }

  .nenu-button {
    cursor: pointer;
    transition: all 0.5s ease;
  }

  .nenu-button:hover {
    scale: 1.1;
  }
</style>