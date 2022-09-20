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
          <div v-else-if="!acceptCall" class="calltouser">
            CallToUser
          </div>
          <div v-else class="media-content">
            <div class="audio" v-if="getCallSettings.typeCall === 'audio'">
              AUdio
            </div>
            <div class="video" v-else>
              <VideoCall :userCall="modalData" :signalR="SignalR" :incomeCall="income"/>
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
import VideoCall from './VideoCall.vue';
import { mapState, mapActions } from 'pinia';
import { useUserCallsStore } from 'src/stores/UserCalls';
import { useUserStore } from 'src/stores/User';
import { IUser } from 'src/types/user';
import { Close } from 'src/functions/modals';
import { useSignalR } from '@quangdao/vue-signalr';


interface ICallToUserData {
  acceptCall: boolean
  income: boolean
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
      acceptCall: false,
      income: false,
      SignalR: useSignalR()
    }),
    computed: {
      ...mapState(useUserCallsStore, ['getCallSettings']),
      ...mapState(useUserStore, ['user'])
    },
    methods: {
      ...mapActions(useUserCallsStore, ['resetCallSettings', 'setIncomeCall', 'setCallType']),

      askUserForCall(){
        this.SignalR.invoke('AskTheUserForCall', {
          MyNickname: this.user?.nickName,
          UserNickname: this.modalData.nickName,
          CallType: this.getCallSettings.typeCall
        })

        this.SignalR.on('CallConfirmed', () => {
          this.acceptCall = true
        })

      },

      acceptCallHandler(){
        this.SignalR.invoke('UserConfirmedCall', this.modalData.nickName)
        this.setIncomeCall(false)
        this.acceptCall = true
      },


      sendAnswer(desc){
          this.SignalR.invoke('AnswerToUserCall', {
            Signal: desc.sdp,
            UserNickname: this.modalData.nickName
          })
          this.setIncomeCall(false)
      },




      // CreateUserCalling(){
      //   const answer: RTCSessionDescriptionInit = {
      //     sdp: this.AnswerSignal as string,
      //     type: 'answer'
      //   }


      //   if (!this.pc!.currentRemoteDescription) {
      //     const answerDescription = new RTCSessionDescription(answer);
      //     this.pc!.setRemoteDescription(answerDescription);
      //   }

      //   this.SignalR.on('AnswerIceCandidate', (data) => {
      //     this.pc?.addIceCandidate(new RTCIceCandidate(JSON.parse(data)))
      //     //console.log(JSON.parse(data))
      //   })
      // },

      // async acceptCallHandler(){
      //   this.setIncomeCall(false)

      //   this.pc!.onicecandidate = (event) => {
      //       this.SignalR.invoke('SetAnswerIceCandidate', {
      //       UserNickname: this.modalData.nickName,
      //       IceCandidate: JSON.stringify(event.candidate)
      //     })
      //   };

      //   const offer : RTCSessionDescriptionInit= {
      //     type: 'offer',
      //     sdp: this.getCallSettings.SignalData as string
      //   };
      //   const offerDescription = new RTCSessionDescription(offer)
      //   await this.pc!.setRemoteDescription(offerDescription);

      //   const answerDescription = await this.pc!.createAnswer();
      //   await this.pc!.setLocalDescription(answerDescription);

      //   await this.SignalR.invoke('AnswerToUserCall', {
      //     Signal: answerDescription.sdp,
      //     UserNickname: this.modalData.nickName
      //   });

      //   this.SignalR.on('OfferIceCandidate', (data) => {
      //     this.pc?.addIceCandidate(new RTCIceCandidate(JSON.parse(data)))
      //   })

      // },

      closeHandler() {
        this.resetCallSettings()
        Close()
      }
    },
    mounted(){
      this.income = this.getCallSettings.IncomeCall
      if(!this.getCallSettings.IncomeCall){
        this.askUserForCall()
      }
      this.SignalR.on('UserCalling', (data) => {
        console.log(data)
      })
    },

    components:{
      DialogModal,
      VideoCall
    },
})
</script>

<style scoped>
  .calling-content {
    min-width: 300px;
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