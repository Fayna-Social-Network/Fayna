<template>
  <SuspenseVue>
    <template #component>
      <div class="del-mess-text"
      @click="delMessageTextHandler(message, currentCorrespondenceId as string)">
          {{$t('MessageDeleteByUser')}}
      </div>
    </template>
  </SuspenseVue>
</template>

<script lang="ts">
import { IMessage } from 'src/types/message'
import { defineComponent, PropType } from 'vue'
import { mapActions, mapState  } from 'pinia'
import { useUserMessagesStore } from 'stores/UserMessages'
import SuspenseVue from 'src/components/Suspense.vue'

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
  components: {
    SuspenseVue
  }
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