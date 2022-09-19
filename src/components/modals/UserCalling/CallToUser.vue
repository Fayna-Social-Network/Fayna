<template>
  <DialogModal>
    <template #header-text>
      {{getCallSettings.typeCall === 'audio' ? $t('audioUserCall') : $t('videoUserCall')}}
    </template>
    <template #body>
      <div class="calling-content">
        <div class="user-offline" v-if="!modalData.isOnline">
            <q-icon name="person_off" size="130px" />
            <span>{{$t('UserIsOffline')}}</span>
        </div>
        <div class="user-online" v-else>
          <div v-if="getCallSettings.IncomeCall">
            IncomeCall
            <q-btn color="green" glossy label="Answer" @click="acceptCallHandler"/>
          </div>
          <div class="audio" v-else-if="getCallSettings.typeCall === 'audio'">
            AUdio
          </div>
          <div class="video">
            <div class="video-content">
              <video ref="localvideo" class="video-local" playsinline autoplay muted></video>
              <video ref="remotevideo" class="video-remote" playsinline autoplay></video>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template #actions>
      <q-btn color="red" glossy label="Cansel" @click="closeHandler"/>
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DialogModal from '../DialogModalTemplate.vue';
import { mapState, mapActions } from 'pinia';
import { useUserCallsStore } from 'src/stores/UserCalls';
import { useUserStore } from 'src/stores/User';
import { IUser } from 'src/types/user';
import { Close } from 'src/functions/modals';
import { useSignalR } from '@quangdao/vue-signalr';

interface ICallToUserData {
  localVideo: HTMLVideoElement | null
  remoteVideo: HTMLVideoElement | null
  localStream: MediaStream | null
  remoteStream: MediaStream
  pc: RTCPeerConnection | null
  servers: RTCConfiguration
  SignalR: any
}

  export default defineComponent({
    props: {
      modalData : {
        required: true,
        type: Object as PropType<IUser>
      }
    },
    data: (): ICallToUserData => ({
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
      SignalR: useSignalR()
    }),
    computed: {
      ...mapState(useUserCallsStore, ['getCallSettings', 'UserAnswer', 'AnswerSignal']),
      ...mapState(useUserStore, ['user'])
    },
    methods: {
      ...mapActions(useUserCallsStore, ['resetCallSettings', 'setIncomeCall']),

      async startWebCam(){
        this.localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        })

        this.remoteStream = new MediaStream();


        this.localStream!.getTracks().forEach((track) => {
          this.pc!.addTrack(track, this.localStream!);
        });


        this.pc!.ontrack = (event) => {
          console.log(event)
        event.streams[0].getTracks().forEach((track) => {
          this.remoteStream.addTrack(track);
        });
      };

        this.localVideo!.srcObject = this.localStream;
        this.remoteVideo!.srcObject = this.remoteStream;
      },

      sendAnswer(desc){
          this.SignalR.invoke('AnswerToUserCall', {
            Signal: desc.sdp,
            UserNickname: this.modalData.nickName
          })
          this.setIncomeCall(false)
      },

      CreateAudioCall() {

      },

      async CreateVideoCall() {

        const OfferOptions : RTCOfferOptions = {
          offerToReceiveAudio: true,
          offerToReceiveVideo: true
        }

        this.pc!.onicecandidate = async(event) => {
          await this.SignalR.invoke('SetOfferIceCandidate', {
            UserNickname: this.modalData.nickName,
            IceCandidate: JSON.stringify(event.candidate)
          })
        };

        const offerDescription = await this.pc!.createOffer(OfferOptions);
        await this.pc!.setLocalDescription(offerDescription);

        await this.SignalR.invoke('CallToUser', {
          UserToCall: this.modalData.id,
          SignalData: offerDescription.sdp,
          FromUserNickname: this.user?.nickName,
          CallType: 'video'
        })

      },

      CreateUserCalling(){
        const answer: RTCSessionDescriptionInit = {
          sdp: this.AnswerSignal as string,
          type: 'answer'
        }


        if (!this.pc!.currentRemoteDescription) {
          const answerDescription = new RTCSessionDescription(answer);
          this.pc!.setRemoteDescription(answerDescription);
        }

        this.SignalR.on('AnswerIceCandidate', (data) => {
          this.pc?.addIceCandidate(new RTCIceCandidate(JSON.parse(data)))
          //console.log(JSON.parse(data))
        })
      },

      async acceptCallHandler(){
        this.setIncomeCall(false)

        this.pc!.onicecandidate = async(event) => {
          await this.SignalR.invoke('SetAnswerIceCandidate', {
            UserNickname: this.modalData.nickName,
            IceCandidate: JSON.stringify(event.candidate)
          })
        };

        const offer : RTCSessionDescriptionInit= {
          type: 'offer',
          sdp: this.getCallSettings.SignalData as string
        };
        const offerDescription = new RTCSessionDescription(offer)
        await this.pc!.setRemoteDescription(offerDescription);

        const answerDescription = await this.pc!.createAnswer();
        await this.pc!.setLocalDescription(answerDescription);

        await this.SignalR.invoke('AnswerToUserCall', {
          Signal: answerDescription.sdp,
          UserNickname: this.modalData.nickName
        });

        this.SignalR.on('OfferIceCandidate', (data) => {
          this.pc?.addIceCandidate(new RTCIceCandidate(JSON.parse(data)))
        })



      },

      closeHandler() {
        this.resetCallSettings()
        Close()
      }
    },
    watch:{
      UserAnswer(){
        if(this.UserAnswer === 'answer') {
          this.CreateUserCalling()
        }
      }
    },
    mounted(){
      this.pc = new RTCPeerConnection(this.servers);
      this.localVideo = this.$refs.localvideo as HTMLVideoElement
      this.remoteVideo = this.$refs.remotevideo as HTMLVideoElement
     if(!this.getCallSettings.IncomeCall){
      if(this.modalData.isOnline) {
        if(this.getCallSettings.typeCall === 'audio'){
          this.CreateAudioCall()
          return
        }
        this.CreateVideoCall()
      }
      return
     }
    //  this.CreateUserCalling()
    },

    async created(){
      await this.startWebCam()
    },
    components:{
      DialogModal
    },
  })
</script>

<style scoped>
  .calling-content {
    min-width: 300px;
  }
  .video-content {
    position: relative;
  }
  .video-local {
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    border: 2px solid grey;
    border-radius: 5px;
  }
  .video-remote {
    width: 100%;
    height: 100%;
  }

  .user-offline {
    display: flex;
    width: 100%;
    height: 300px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>