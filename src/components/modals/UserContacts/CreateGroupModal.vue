<template>
  <Overlay>
    <template #content>
      <div class="window">
        <CloseButton @closeModal="closeModal"/>
        <div class="content">
          <div class="name-field">
            <label for="name">{{$translate('Name')}}</label>
            <input type="text" id="name" v-model="groupName" @keydown.enter="addGroupHandle">
          </div>
          <button class="add-button" @click="addGroupHandle">{{$translate("Add")}}</button>
        </div>
      </div>
    </template>
  </Overlay>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { mapActions } from "pinia"
import { useUserStore } from "@/store/User"
import Overlay from "../OverlayComponent.vue"
import CloseButton from "@/components/UI/buttons/CloseModalButton.vue"
import { Close } from "@/functions/modals"
import ContactGroups from "@/services/users/contactGroupsService"
import { ContactGroup } from "@/types/ContactGroup"

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
        this.$alert(this.$translate('GroupSuccesAdd'), false)
       Close()
       return
      }
      this.$alert(this.$translate('NameOfGroupError'), true)
    },
    closeModal(){
      Close()
    }
  },
  components:{
    Overlay,
    CloseButton
  }
})
</script>

<style scoped>
.window{
  position: relative;
  width: 250px;
  background: var(--modal-window-bg);
  color: var(--text-color);
  border-radius: 10px;
}

.content{
  padding: 10px 10px 10px 10px;
}
button{
  margin-top: 5px;
  width: 100%;
  color: #fff;
  background: rgb(89, 163, 89);
  border: none;
  transition: all 0.5s ease;
  cursor: pointer;
}
button:hover{
  background: rgb(127, 182, 127);
}
input{
  width: 100%;
}
</style>