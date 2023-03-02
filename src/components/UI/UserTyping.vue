<template>
  <q-chat-message :name="getContactNameById(activeContact!)"
    :avatar="getContactAvatar(activeContact!)">
    <q-spinner-dots size="2rem" />
  </q-chat-message>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapActions, mapState } from "pinia"
import { useUserContactsStore } from "src/modules/Users/store/UserContacts"
import { useMainStore } from "src/stores/Main"


export default defineComponent({
  computed: {
    ...mapState(useUserContactsStore, ['getContactAvatar', 'getContactNameById', 'activeContact'])
  },
  methods: {
    ...mapActions(useMainStore, ['setMessageTrigger'])
  },
  mounted() {
    setTimeout(() => {
      this.setMessageTrigger()
    }, 500);
  }
})
</script>