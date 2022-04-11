<template>
  <Contact
    @click="contactClickHandle"
  >
  <template #profile>
      <img
        class="bg-img"
        :src="avatar"
        alt="Avatar"
         />
     <div v-if="isOnline" class="user-online"></div>
       <Typing class="user-typing" v-if="typingMessage && contact.userId == typingMessage" />
    </template>
    <template #details>
       <h4>{{username}}</h4>
       <h5 v-if="!showPicture">{{lastMessage.substr(0, 30)}}...</h5>
    </template>
    <template #content>

    <div
     class="message-badge"
     :class="{'numberMessActive': numberOfUnreadMessage != 0}"
     ><span>{{numberOfUnreadMessage}}</span></div>

    </template>

  </Contact>
</template>

<script lang="ts">


import { defineComponent, PropType } from 'vue'
import Contact from './ContactTemplate.vue'
import { useMainStore } from 'stores/Main'
import { mapState } from 'pinia'
import { useUserMessagesStore } from 'stores/UserMessages'
import { useUserContactsStore } from 'stores/UserContacts'
import Typing from 'components/UI/Typing.vue'
import { IContact } from 'src/types/contact'



export default defineComponent({
 props: {
   contact:{
     type: Object as PropType<IContact>,
     required: true
   }
 },

  data:()=>({
    showPicture: false,
  }),
  methods: {
    contactClickHandle(){
      this.$emit('contactClick', this.contact.contactId)
    }
  },

 computed: {
   ...mapState(useMainStore, ['typingMessage']),
   ...mapState(useUserContactsStore, ['getContactById']),
   ...mapState(useUserMessagesStore, ['getCorrespondence']),

    username(){
     return this.getContactById(this.contact.contactId)!.name
    },

    isOnline(){
      return this.getContactById(this.contact.contactId)!.isOnline
    },

    numberOfUnreadMessage(){
      return this.getCorrespondence(this.contact.contactId)!
          .filter(c => c.seller === this.contact.userId && c.isRead === false).length
    },

    lastMessage(){
      const len = this.getCorrespondence(this.contact.contactId)!.length

       if(len > 0){
         const text = this.getCorrespondence(this.contact.contactId)![len - 1].text
         if(text.startsWith('$[]:')){
           this.showPicture = true
           return ''
         }else if(text == '[:audio_message:]'){
           return ''
         }else if(text == '[:image_message:]'){
           return ''
         }else if(text.startsWith('<code>')){
           return '</code>'
         }
         else{
           this.showPicture = false
           return text
         }

      }else{
        return this.$t('NoMessage')
      }

    },

    avatar(){
      const contact = this.getContactById(this.contact.contactId)
      if(contact){
        if(contact.avatar){
          return import.meta.env.VITE_APP_BACKEND_PATH + contact.avatar
        } else{
            return import.meta.env.VITE_APP_BACKEND_PATH +
              'Resources/Images/user-profile.png'
        }
      }
    }

   },
   components:{
     Typing,
     Contact
   }

})
</script>


<style scoped>
h5{
 font-family: 'Roboto, sans serif';
}

.bg-img{
  width: 60px;

}

.user-typing{
  position: absolute;
    top: 33px;
    left: 33px;
}

.message-badge{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  font-size: 13px;
  position: absolute;
  right: 0;
  bottom: 0;
  border-radius: 100%;
  background: var(--contact-message-badge-bg);
  color: var(--contact-message-badge-text-color);
  transform: scale(0);
  transition: all 0.6s ease;
}

.pictures{
  width: 30px;
}
.user-online{
  position: absolute;
  width: 15px;
  height: 15px;
  top: 0;
  left: 0;
  border-radius: 100%;
  background: var(--user-online-badge-bg);
   box-shadow: 0 0 0 0 var(--user-online-badge-bg-shadow);
  animation: pl1 1s infinite;
}

@keyframes pl1 {
    100% {box-shadow: 0 0 0 10px #0000}
}

.numberMessActive{
 transform: scale(1);
}
</style>