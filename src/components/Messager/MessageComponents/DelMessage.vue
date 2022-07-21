<template>
      <div class="del-mess-text"
      @click="delMessageTextHandler(message, currentCorrespondenceId as string)">
          {{$t('MessageDeleteByUser')}}
      </div>
</template>

<script lang="ts">
import { IMessage } from 'src/types/message'
import { defineComponent, PropType } from 'vue'
import { mapActions, mapState  } from 'pinia'
import { useUserMessagesStore } from 'stores/UserMessages'


export default defineComponent({
  props:{
    message: {
      required: true,
      type: Object as PropType<IMessage>
    }
  },
  methods:{
    ...mapActions(useUserMessagesStore, ['delMessageFromCorrespondence']),

    delMessageTextHandler(message: IMessage, contactId: string){
        this.delMessageFromCorrespondence({contactId: contactId, message: message})
    },
  },
  computed:{
    ...mapState(useUserMessagesStore, ['currentCorrespondenceId'])
  },
})
</script>

<style scoped lang="scss">
.del-mess-text{
  border: 1px dashed $border;
  font-style: italic;
  line-height: 1.1;
  padding: 16px 20px;
  color: #494d52;
  cursor: pointer;
}
</style>