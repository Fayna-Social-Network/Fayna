<template>
  <div class="content">
    <ul class="grups-list">
      <li class="group-item"
      :class="{'active': group.groupName == activeGroup}"
      v-for="group in user!.contactGroups"
      @click="groupClickHandle(group)"
      >{{group.groupName}}
      <div class="delete" v-if="group.groupName != 'All'">
        <div class="del-button" @click="delGroupHandle(group.id)">
          <span>x</span>
        </div>
      </div>
      </li>
    </ul>
    <div class="add-group" @click="addGroupHandle">
      <q-icon name='add' size='25px'/>
    </div>
  </div>
</template>

<script lang="ts">
import { Open } from "src/functions/modals"
import { ContactGroup } from "src/types/ContactGroup"
import { defineComponent } from "vue"
import { mapActions, mapState } from "pinia"
import { useUserStore } from "stores/User"
import { useUserContactsStore } from "stores/UserContacts"
import ContactGroups from "src/services/users/contactGroups.service"

export default defineComponent({
  data:() => ({
    activeGroup: 'All'

  }),
  methods:{
    ...mapActions(useUserStore, ['delContactGroupFromUser']),
    ...mapActions(useUserContactsStore, ['contactsSort' ,
            'resetContactsSort' , 'resetGroupInContact']),

    groupClickHandle(item : ContactGroup){
      this.activeGroup = item.groupName
      if(item.groupName == 'All'){
        this.resetContactsSort()
        return
      }
      this.contactsSort(item.id)
    },
    addGroupHandle(){
      Open('CreateContactGroup', null)
    },
   async delGroupHandle(id: string){
     await ContactGroups.DeleteContactGroup(id)
     this.delContactGroupFromUser(id)
     this.resetGroupInContact(id)
    }
  },
  computed:{
    ...mapState(useUserStore, ['user']),
  }
})
</script>

<style scoped>

.delete{
  position: relative;
}
.del-button{
  position: absolute;
  top: -28px;
  right: -18px;
  background: rgb(75, 69, 69);
  color: #fff;
  padding: 0px 5px 0px 5px;
  border-radius: 50%;
  border: 1px solid #fff;
  transform: scale(0);
  transition: all 1s ease;
}

.del-button:hover{
  transform: scale(1.1);
}
.content{
  position: relative;
}
.grups-list{
  display: flex;
  flex-wrap: wrap;
  padding-top: 5px;
}

.group-item{
  color: rgb(58, 58, 58);
  font-size: 13px;
  margin: 5px 3px 5px 3px;
  padding: 0px 10px 0px 10px;
  border-radius: 20px;
  cursor: pointer;
  background: #eff1f2;
  transition: all 0.5s ease;
}

.group-item:hover{
  background: rgb(126, 126, 212);

}

.group-item:hover .del-button{
  transform: scale(1);
}

.active{
   color: white;
   background: #1c9dea;
   box-shadow: -1px 10px 16px -10px #1c9dea;
}

.add-group{
  position: absolute;
  color: var(--text-color);
  cursor: pointer;
  top: 0;
  right: 5px;
  opacity: 0;
  transition: all 0.5s ease;
}

.content:hover .add-group{
  opacity: .7;
}

</style>