<template>
  <DialogModal>
    <template #header-text>
      {{$t('CreateContactGroup')}}
    </template>
    <template #body>
        <div class="content">
          <q-input v-model="groupName" :label="$t('ContactGroupName')" @keydown.enter="addGroupHandle"/>
        </div>
    </template>
      <template #actions>
        <q-btn color="primary" :label="$t('Add')"  @click="addGroupHandle"/>
        <q-btn color="negative" :label="$t('Cancel')"  @click="closeModal"/>
      </template>
  </DialogModal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DialogModal from "../DialogModalTemplate.vue"
import { mapActions } from "pinia"
import { useUserStore } from "stores/User"
import { Close } from "src/functions/modals"
import ContactGroups from "src/services/users/contactGroups.service"
import { ContactGroup } from "src/types/ContactGroup"

export default defineComponent({
  data:() => ({
    groupName: ''
  }),
  methods:{
    ...mapActions(useUserStore, ['addContactGroupToUser']),

    async addGroupHandle(){
      if(this.groupName.trim() != ''){
        const result = await ContactGroups.CreateContactGroup(this.groupName)
        const Group : ContactGroup = {
          id : result.data,
          groupName: this.groupName
        }
        this.addContactGroupToUser(Group)
        this.$q.notify({message: this.$t('ContactGroupSuccessAdd')})
       Close()
       return
      }
      this.$q.notify({message: this.$t('NameOfGroupError'), type: 'negative'})
    },
    closeModal(){
      Close()
    }
  },
  components:{
    DialogModal
  }
})
</script>

<style scoped>
.content{
  width: 250px;
}
</style>

