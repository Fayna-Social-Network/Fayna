<template>
  <DialogModal>
    <template #header-text>
      {{ $t('Add_Contact') }}
    </template>
    <template #body>
      <div class="content">
        <q-input color="primary" filled v-model="contactName" :label="$t('ContactName')">
          <template v-slot:prepend>
            <q-icon name="person" />
          </template>
        </q-input>
        <q-select :label="$t('Group')" transition-show="jump-up" transition-hide="jump-up" filled v-model="selectedGroup"
          :options="user!.contactGroups.map(g => g.groupName)" style="width: 250px" />
      </div>
    </template>
    <template #actions>
      <q-btn color="primary" :label="$t('Add')" @click="addContactHandle" />
      <q-btn color="negative" :label="$t('Cancel')" @click="closeHandle" />
    </template>
  </DialogModal>
</template>


<script lang="ts">
import { IUser } from "src/modules/Users/types/user"
import { defineComponent, PropType } from "vue"
import { mapState } from "pinia"
import { useUserStore } from "src/modules/Users/store/User"
import DialogModal from "src/modules/modalWindows/components/DialogModalTemplate.vue"
import { Close } from "src/modules/modalWindows/services"
import { AddUserToContactDto } from "src/dtos/addUserToContact.dto"
import Contacts from "src/modules/Users/services/contacts.service"

export default defineComponent({
  props: {
    modalData: {
      required: true,
      type: Object as PropType<IUser>
    }
  },
  data: () => ({
    contactName: '',
    selectedGroup: ''
  }),
  computed: {
    ...mapState(useUserStore, ['user']),

  },
  methods: {

    async addContactHandle() {
      if (this.contactName.trim() == '') {
        this.$q.notify({ type: 'negative', message: this.$t('NameIsEmpty') })
        return
      }
      const group = this.user?.contactGroups.find(g => g.groupName === this.selectedGroup)
      if (group) {
        const dto = new AddUserToContactDto(
          this.modalData.id,
          this.user!.id,
          this.contactName,
          group.id)

          await Contacts.addContactToUser(dto)

        Close()
      }
    },
    closeHandle() {
      Close()
    }
  },
  mounted() {
    if (this.modalData.firstName || this.modalData.lastName) {
      this.contactName = this.modalData.firstName + ' ' + this.modalData.lastName
    } else {
      this.contactName = this.modalData.nickName
    }
    this.selectedGroup = this.user!.contactGroups[0].groupName
  },
  components: {
    DialogModal
  }
})
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 250px;
}
</style>