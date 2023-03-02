<template>
  <DialogModal>
    <template #header-text>
      {{ $t('CreateContactGroup') }}
    </template>
    <template #body>
      <div class="content">
        <q-input v-model="groupName" :label="$t('ContactGroupName')" @keydown.enter="addGroupHandle" />
      </div>
    </template>
    <template #actions>
      <q-btn color="primary" :label="$t('Add')" @click="addGroupHandle" />
      <q-btn color="negative" :label="$t('Cancel')" @click="closeModal" />
    </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DialogModal from "src/modules/modalWindows/components/DialogModalTemplate.vue"
import { Close } from "src/modules/modalWindows/services"
import ContactGroups from "src/modules/Users/services/contactGroups.service"

export default defineComponent({
  data: () => ({
    groupName: ''
  }),
  methods: {
    async addGroupHandle() {

      if (this.groupName.trim() != '') {

        await ContactGroups.CreateContactGroup(this.groupName)

        Close()

        return
      }
      this.$q.notify({ message: this.$t('NameOfGroupError'), type: 'negative' })
    },

    closeModal() {
      Close()
    }
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

