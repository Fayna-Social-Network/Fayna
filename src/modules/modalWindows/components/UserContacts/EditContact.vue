<template>
  <DialogModal>
    <template #header-text>
      {{ $t('EditContact') }}
    </template>
    <template #body>
      <div class="content">
        <q-input v-model="contactName" :label="$t('ContactName')" />
        <q-select v-model="selectedGroupName" transition-show="jump-up" transition-hide="jump-up"
          :options="user!.contactGroups.map(g => g.groupName)" :label="$t('SelectContactGroup')" />
      </div>
    </template>
    <template #actions>
      <q-btn color="primary" :label="$t('Save')" @click="saveHandle" />
      <q-btn color="negative" :label="$t('Cancel')" @click="closeModalHandler" />
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import DialogModal from "src/modules/modalWindows/components/DialogModalTemplate.vue"
import { mapState, mapActions } from "pinia"
import { useUserContactsStore } from "src/modules/Users/store/UserContacts"
import { useUserStore } from "src/modules/Users/store/User"
import { IContact } from "src/modules/Users/types/contact"
import { Close } from "src/modules/modalWindows/services"
import Contacts from "src/modules/Users/services/contacts.service"

export default defineComponent({
  props: {
    modalData: {
      required: true,
      type: Object as PropType<IContact>
    }
  },
  data: () => ({
    selectedGroupName: '',
    contactName: ''
  }),
  methods: {
    ...mapActions(useUserContactsStore, ['updateContact']),

    closeModalHandler() {
      Close()
    },
    async saveHandle() {
      const selectedGroup = this.user?.contactGroups.find(g => g.groupName === this.selectedGroupName)
      if (selectedGroup) {
        await Contacts.UpdateUserContact({
          contactId: this.modalData.contactId,
          groupId: selectedGroup.id,
          contactName: this.contactName
        })
        const update = {
          contactId: this.modalData.contactId,
          groupId: selectedGroup.id,
          groupName: selectedGroup.groupName,
          name: this.contactName
        }
        this.updateContact(update)
        this.$q.notify({ message: this.$t('ContactUpdatedSuccessfully') })
        Close()
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['user'])
  },
  mounted() {
    this.contactName = this.modalData.name
    this.selectedGroupName = this.user!.contactGroups[0].groupName
  },
  components: {
    DialogModal
  }
})
</script>

<style scoped>
.content {
  width: 250px;
}
</style>


