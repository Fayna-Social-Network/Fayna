<template>
   <q-chat-message
      :name="getContactNameById(currentCorrespondenceId)"
      :avatar="getContactAvatar(currentCorrespondenceId)"
   >
      <q-spinner-dots size="2rem"/>
    </q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapActions, mapState } from "pinia"
import { useUserContactsStore } from "src/stores/UserContacts"
import { useUserMessagesStore } from "src/stores/UserMessages"
import { useMainStore } from "src/stores/Main"
import { v4 as uuid } from "uuid"

export default defineComponent({
  computed:{
    ...mapState(useUserMessagesStore, ['currentCorrespondenceId']),
    ...mapState(useUserContactsStore, ['getContactAvatar', 'getContactNameById'])
  },
  methods:{
    ...mapActions(useMainStore, ['setMessageTrigger'])
  },
  mounted(){
    setTimeout(() => {
      this.setMessageTrigger(uuid())
    }, 500);
  }
})
</script>