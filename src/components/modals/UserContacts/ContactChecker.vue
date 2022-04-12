<template>
    <Modal
    @closeModal="closeModal"
    >
        <template #header>
           <span>{{$translate('ContactsCheckerHeader')}}</span> 
        </template>
        <template #content>
            <Contact v-for="contact in listContacts" 
            :key="contact.contactId"
            :user='contact'
            @checkUser='checkUser'/>
        </template>
        <template #footer>
         <button @click="sendHandler">{{$translate('Send')}}</button>
        </template>
    </Modal>
</template>


<script lang="ts">
import { defineComponent } from "vue";
import Modal from '../ModalWindowTemplate.vue'
import Contact from '../../ContactsComponents/ContactChecker.vue'
import { v4 as uuid } from 'uuid';
import { mapState, mapActions } from "pinia";
import { useUserContactsStore } from "@/store/UserContacts";
import { useModalWindowStore } from "@/store/ModalWindow";
import { useUserMessagesStore } from "@/store/UserMessages";
import { IContact } from "@/types/contact";
import {forwardMessage} from '@/functions/messager'
import { Close } from "@/functions/modals";

export default defineComponent({
    data: () =>({
        contactsChecked: Array<IContact>(),

    }),
    methods:{
      ...mapActions(useUserMessagesStore, ['addMessageToCorrespondence']),

        checkUser(value){
          
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
                    seller: message.seller,
                    text: message.text,
                    timestamp: new Date(),
                    userId: this.contactsChecked[i].userId
                }
                const res = await forwardMessage(mess, message.id)
                mess.id = res
                this.addMessageToCorrespondence(
                     {message: mess, contactId: this.contactsChecked[i].contactId})
              }
              this.$alert(this.$translate('MessageResend'), false)
              this.closeModal()
            }else{
              this.$alert(this.$translate('NoOneToSend'), true)
            }  
      }
    },
    computed:{
        ...mapState(useUserContactsStore, ['contacts']),
        ...mapState(useModalWindowStore, ['modalData']),

        listContacts(){
            return this.contacts.filter(c => c.contactId != this.modalData.contactId)
        },
    },
    components:{
        Modal,
        Contact
    }
})
</script>


<style scoped>
span{
    font-size: 16px;
}
button{
    width: 100%;
    cursor: pointer;
}
</style>