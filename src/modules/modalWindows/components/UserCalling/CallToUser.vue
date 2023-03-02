<template>
  <DialogModal>
    <template #header-text>
      {{ getCallSettings.typeCall === 'audio' ? $t('audioUserCall') : $t('videoUserCall') }}
    </template>
    <template #body>
      <div class="calling-content" v-if="!canselCall">
        <div class="user-offline" v-if="!modalData.isOnline">
          <q-icon name="person_off" size="130px" />
          <span>{{ $t('UserIsOffline') }}</span>
        </div>
        <div class="user-online" v-else>
          <div v-if="getCallSettings.IncomeCall" class="calltouser">
            <q-img :src="callImage" spinner-color="white" style="height: 140px; max-width: 150px" />
            <div class="calling-to">{{ $t('UserCallingYou') }} @{{ modalData.nickName }}</div>
            <q-btn color="green" glossy :label="$t('AnswerToCallButton')" icon="phone" @click="acceptCallHandler" />
            <audio ref="audioUserCalling" :src="audioUserCallingFile" loop></audio>
          </div>
          <div v-else-if="!acceptCall" class="calltouser">
            <q-img :src="callImage" spinner-color="white" style="height: 140px; max-width: 150px" />
            <div class="calling-to">{{ $t('UserCallingTo') }} @{{ modalData.nickName }}</div>
            <audio ref="audioCall" :src="audioCallFile" loop></audio>
          </div>
          <div v-else class="media-content">
            <div class="audio" v-if="getCallSettings.typeCall === 'audio'">
              <VideoCall :userCall="modalData" :signalR="SignalR" :incomeCall="income" :videoEnabled="false" />
            </div>
            <div class="video" v-else>
              <VideoCall :userCall="modalData" :signalR="SignalR" :incomeCall="income" />
            </div>
          </div>
        </div>
      </div>
      <div v-else class="cansel-call">
        <q-icon name="phone_disabled" color="red" size="130px" />
        <div class="cansel-call-text">{{ $t('CallCanseledByUser') }}</div>
        <audio ref="audioEndCall" :src="audioEndCallFile" loop></audio>
      </div>
    </template>
    <template #actions>
      <q-btn color="red" glossy :label="$t('CanselCall')" @click="closeHandler" icon="call_end" />
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import DialogModal from 'src/modules/modalWindows/components/DialogModalTemplate.vue';
import VideoCall from './VideoCall.vue';
import { mapState, mapActions } from 'pinia';
import { useUserCallsStore } from 'src/modules/Chat/store/UserCalls';
import { useUserStore } from 'src/modules/Users/store/User';
import { IUser } from 'src/modules/Users/types/user';
import { Close } from 'src/modules/modalWindows/services';
import { useSignalR } from '@quangdao/vue-signalr';
import callImage from 'src/assets/image/Man_on_phone.gif'
import audioCallFile from 'src/assets/sound/gudki.mp3'
import audioUserCallingFile from 'src/assets/sound/zvonok.mp3'
import audioEndCallFile from 'src/assets/sound/endcall.mp3'

interface ICallToUserData {
  acceptCall: boolean
  income: boolean
  callImage,
  canselCall: boolean,
  SignalR: any,
  AudioCallSignalElement: HTMLAudioElement | null
  audioCallFile
  audioUserCallingFile
  audioEndCallFile
  AudioCallingUserElement: HTMLAudioElement | null
  AudioEndCallElement: HTMLAudioElement | null
}

export default defineComponent({
  props: {
    modalData: {
      required: true,
      type: Object as PropType<IUser>
    }
  },
  data: (): ICallToUserData => ({
    acceptCall: false,
    income: false,
    callImage,
    canselCall: false,
    SignalR: useSignalR(),
    AudioCallSignalElement: null,
    AudioCallingUserElement: null,
    AudioEndCallElement: null,
    audioCallFile,
    audioUserCallingFile,
    audioEndCallFile
  }),
  computed: {
    ...mapState(useUserCallsStore, ['getCallSettings']),
    ...mapState(useUserStore, ['user'])
  },
  methods: {
    ...mapActions(useUserCallsStore, ['resetCallSettings', 'setIncomeCall', 'setCallType']),

    askUserForCall() {
      this.AudioCallSignalElement?.play()
      this.SignalR.invoke('AskTheUserForCall', {
        MyNickname: this.user?.nickName,
        UserNickname: this.modalData.nickName,
        CallType: this.getCallSettings.typeCall
      })

      this.SignalR.on('CallConfirmed', () => {
        this.AudioCallSignalElement?.pause()
        this.acceptCall = true
      })

    },

    acceptCallHandler() {
      this.AudioCallingUserElement?.pause()
      this.SignalR.invoke('UserConfirmedCall', this.modalData.nickName)
      this.setIncomeCall(false)
      this.acceptCall = true
    },

    closeHandler() {
      this.SignalR.invoke('UserCancelCall', this.modalData.nickName)
      this.resetCallSettings()
      this.AudioEndCallElement?.pause()
      Close()
    }
  },
  mounted() {
    this.AudioCallSignalElement = this.$refs.audioCall as HTMLAudioElement
    this.AudioCallingUserElement = this.$refs.audioUserCalling as HTMLAudioElement
    this.AudioEndCallElement = this.$refs.audioEndCall as HTMLAudioElement

    this.income = this.getCallSettings.IncomeCall
    if (!this.getCallSettings.IncomeCall) {
      this.askUserForCall()
    } else {
      this.AudioCallingUserElement.play()
    }
    this.SignalR.on('CanselingCall', () => {
      this.AudioEndCallElement?.play()
      this.canselCall = true
    })
  },

  components: {
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

.calltouser {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.calling-to {
  margin-top: 10px;
  margin-bottom: 10px;
  font-size: 18px;
}

.cansel-call {
  min-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cansel-call-text {
  margin: 10px 0px 10px 0px;
  font-size: 17px;
}
</style>