<template>
  <Overlay>
    <template #content>
      <div class="window">
        <CloseModal @closeModal="closeModalHandler"/>
        <div class="header">
          <div class="header-text">{{$translate('Edit')}}</div>
        </div>
        <div class="name-contact group">
          <label for="name">{{$translate('Name')}}</label>
          <input type="text" id="name" v-model="contactName">
        </div>
        <div class="select-group group">
          <label for="group">{{$translate('ChangeContactGroup')}}</label>
          <select name="group" id="group" v-model="selectedGroup">
            <option 
              v-for="group in user!.contactGroups"
              :key="group.id"
              :value="group"
              >{{group.groupName}}</option>
          </select>
        </div>
        <div class="button" @click="saveHandle">
          {{$translate("Save")}}
        </div> 
      </div>
    </template>
  </Overlay>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue"
import Overlay from "../OverlayComponent.vue"
import CloseModal from "@/components/UI/buttons/CloseModalButton.vue"
import { mapState, mapActions } from "pinia"
import { useUserContactsStore } from "@/store/UserContacts"
import { useUserStore } from "@/store/User"
import { IContact } from "@/types/contact"
import { Close } from "@/functions/modals"
import Contacts from "@/services/users/ContactsService"
import { ContactGroup } from "@/types/ContactGroup"

export default defineComponent({
  props:{
    modalData:{
      required: true,
      type: Object as PropType<IContact>
    }
  },
  data:() => ({
    selectedGroup: {} as ContactGroup,
    contactName: ''
  }),
  methods:{
    ...mapActions(useUserContactsStore, ['updateContact']),

    closeModalHandler(){
      Close()
    },
    async saveHandle(){
      await Contacts.UpdateUserContact({
        contactId: this.modalData.contactId,
        groupId: this.selectedGroup.id,
        contactName: this.contactName
      })
      const update = {
        contactId: this.modalData.contactId,
        groupId: this.selectedGroup.id,
        groupName: this.selectedGroup.groupName,
        name: this.contactName
      }
      this.updateContact(update)
      this.$alert(this.$translate('ContactUpdatedSuccessfully'), false)
      Close()
    }
  },
  computed:{
    ...mapState(useUserStore, ['user'])
  },
  mounted(){
    this.contactName = this.modalData.name
    this.selectedGroup = this.user!.contactGroups[0]
  },
  components:{
    Overlay,
    CloseModal
  }
})
</script>

<style scoped>
.window{
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20px;
  background: rgb(8, 8, 8);
  border-radius: 20px;
}

.header{
  color: antiquewhite;
  font-size: 21px;
  font-weight: bold;
  border-bottom: solid 1px;
}

.group{
  display: flex;
  margin-top: 10px;
  flex-direction: column;
  color: #fff;
}

.button{
  display: flex;
  background: rgb(21, 155, 21);
  color: #fff;
  justify-content: center;
  padding: 5px 0px 5px 0px;
  margin-top: 10px;
  transition: all 0.5s ease;
}

.button:hover{
  background: rgb(89, 185, 89);
  cursor: pointer;
}

</style>
