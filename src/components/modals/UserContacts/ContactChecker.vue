<template>
    <DialogModal>
        <template #header-text>
          {{$t('ContactsCheckerHeader')}}
        </template>
        <template #body>
          <q-list>
            <q-item v-ripple v-for="contact in listContacts"
            :key="contact.contactId"
            >
              <q-item-section>
                 <Contact
                  :user='contact'
                  @checkUser='checkUser'/>
              </q-item-section>
            </q-item>
          </q-list>
        </template>
        <template #actions>
          <q-btn color="primary" :label="$t('Send')" @click="sendHandler" />
          <q-btn color="negative" :label="$t('Cancel')" @click="closeModal" />
        </template>
    </DialogModal>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import DialogModal from "../DialogModalTemplate.vue";
import Contact from 'components/UserAndContacts/ContactChecker.vue'
import { v4 as uuid } from 'uuid';
import { mapState, mapActions } from "pinia";
import { useUserContactsStore } from "stores/UserContacts";
import { useModalWindowStore } from "stores/ModalWindow";
import { useUserMessagesStore } from "stores/UserMessages";
import { useUserStore } from "src/stores/User";
import { IContact } from "src/types/contact"
import {forwardMessage} from 'src/functions/messager'
import { Close } from "src/functions/modals";


interface ICheckedUser{
  user: IContact
  checked: boolean
}

export default defineComponent({
    data: () =>({
        contactsChecked: Array<IContact>(),

    }),
    methods:{
      ...mapActions(useUserMessagesStore, ['addMessageToCorrespondence']),

        checkUser(value: ICheckedUser){

            if(value.checked){
                if(this.contactsChecked.find(c => c.contactId === value.user.contactId) === undefined){
                    this.contactsChecked.push(value.user)

                }
            }else{
                if(this.contactsChecked.find(c => c.contactId === value.user.contactId)){
                    this.contactsChecked = this.contactsChecked.filter(c => c.contactId != value.user.contactId)
                }

            }
        },
        closeModal(){
            Close()
        },
      async sendHandler(){
           let message = this.modalData.message
            if(this.contactsChecked.length != 0){
              for(let i = 0; i < this.contactsChecked.length; i++){
                 const mess ={
                    id: uuid(),
                    isRead: false,
                    seller: this.user?.id as string,
                    text: message.text,
                    timestamp: new Date(),
                    userId: this.contactsChecked[i].userId
                }
                const res = await forwardMessage(mess, message.id)
                mess.id = res
                this.addMessageToCorrespondence(
                     {message: mess, contactId: this.contactsChecked[i].contactId})
              }
              this.$q.notify({message: this.$t('MessageResend')})
              this.closeModal()
            }else{
              this.$q.notify({type: 'negative', message: this.$t('NoOneToSend')})
            }
      }
    },
    computed:{
        ...mapState(useUserContactsStore, ['contacts']),
        ...mapState(useModalWindowStore, ['modalData']),
        ...mapState(useUserStore, ['user'] ),

        listContacts(){
            return this.contacts.filter(c => c.contactId != this.modalData.contactId)
        },
    },
    components:{
        DialogModal,
        Contact
    }
})
</script>
