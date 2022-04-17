<template>
    <q-btn
     @mousedown="micEnableHandle"
     @mouseup="micDisableHandler"
     :class="{'mic-pressed': record}" icon="mic" round color="primary" :size="size" />


</template>


<script lang="ts">
import { defineComponent, PropType } from "vue";
import { v4 as uuid } from 'uuid';
import { IMessage } from "src/types/message";
import AudioMessage from "src/services/messages/audioMessage.service";
import File from 'src/services/files.service'
import Recorder from 'src/lib/recorder/recorder'
import { mapState, mapActions  } from "pinia";
import { useUserStore } from "stores/User";
import { useUserMessagesStore } from "stores/UserMessages";
import { useMainStore } from "stores/Main";
import { IContact } from "src/types/contact";

export default defineComponent({
    props: {
      companion: {
        required: true,
        type: Object as PropType<IContact>
      },
      size: {
        type: String,
        default: '14px'
      }
    },
    data: () => ({
       recorder: new Recorder,
       record: false,

    }),
    methods:{
      ...mapActions(useUserMessagesStore, ['addMessageToCorrespondence']),
      ...mapActions(useMainStore, ['setMessageTrigger']),

        micEnableHandle(){
            this.recorder.start()
            this.record = true
        },
        micDisableHandler(){
             this.recorder.stop()
             this.record = false
        },
         _initRecorder () {
        return new Recorder({
        //   beforeRecording : this.callback,
          afterRecording  : this.afterRecord,
        //   pauseRecording  : this.callback,
        //   micFailed       : this.callback,
          bitRate         : 128,
          sampleRate      : 44100,
          format          : 'wav'
        })
      },
     async afterRecord(data: any){
        const result = await File.upload(data.blob, 'audiomessage')
        const messId = await AudioMessage.Send({Path: result.data,
                 UserId: this.companion.userId})
        const newMess: IMessage = {
            id: messId.data,
            text: '[:audio_message:]',
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.companion.userId
        }

        this.addMessageToCorrespondence({message: newMess, contactId: this.companion.contactId})
              setTimeout(() => {
                this.setMessageTrigger(uuid())
              }, 200);

      }
    },
    computed:{
        ...mapState(useUserStore, ['user'])
    },
     mounted(){
      this.recorder = this._initRecorder()
    },
})
</script>

<style scoped lang="scss">
.icon-btn {
    height: 41px;
    width: 41px;
    cursor: pointer;
    border-radius: 100%;
    font-weight: 800;
    align-items: center;
    justify-content: center;
    display: inline-flex;
    background: $primary;
    transition: all 0.6s ease;
    color: white;
}

.mic-pressed{
    background: red !important;
    color: white;
    animation: anim 2s infinite;
}

@keyframes anim {
    0%{
        transform: scale(1);
    }
    50%{
        transform: scale(1.2);
    }
    100%{
        transform: scale(1);
    }
}

</style>