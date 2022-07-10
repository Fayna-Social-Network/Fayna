<template>
  <Contact
    @click="contactClickHandle"
  >
    <template #profile>
    <div class="profile-content">
      <q-avatar rounded size="50px">
        <img :src="getContactAvatar(contact.contactId)">
      </q-avatar>
      <isOnlineBadge v-if="getContactIsOnline(contact.contactId)"/>
      <Typing class="user-typing" v-if="typingMessage && contact.userId == typingMessage" />
    </div>
    </template>
    <template #details>
      <div class="username">{{getContactNameById(contact.contactId)}}</div>
      <div class="message">{{getLastContactMessage(contact.contactId).substr(0, 25)}}...</div>
    </template>
    <template #content>
      <CountBadge :number='getNumberOfUnreadMessage(contact)'/>
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
import Typing from 'components/UI/badges/Typing.vue'
import { IContact } from 'src/types/contact'
import isOnlineBadge from 'components/UI/badges/IsOnline.vue'
import CountBadge from 'components/UI/badges/CountBadge.vue'

export default defineComponent({
 props: {
   contact:{
     type: Object as PropType<IContact>,
     required: true
   }
 },

  methods: {
    contactClickHandle(){
      this.$emit('contactClick', this.contact.contactId)
    }
  },

 computed: {
   ...mapState(useMainStore, ['typingMessage']),
   ...mapState(useUserContactsStore, ['getContactNameById',
        'getContactIsOnline', 'getContactAvatar']),
   ...mapState(useUserMessagesStore, ['getNumberOfUnreadMessage',
         'getLastContactMessage']),

},
   components:{
     Typing,
     Contact,
     isOnlineBadge,
     CountBadge
   }

})
</script>


<style scoped lang="scss">
.username{
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 400;
  font-size: 18px;
}

.message{
  font-family: 'Roboto', sans-serif;
  font-style: italic;
  font-size: 12px;
  color: rgb(100, 95, 95);
}
.user-typing{
  position: absolute;
  right: -10px;
  bottom: -10px;
}

.profile-content{
  position: relative;
}

</style>