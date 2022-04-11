<template>
    <Loader v-if="isLoading" />
  <div v-else class="chat-main">
    <ul v-if="isSearchisOpen">
        <li v-for="userlist in getSearchUsers"
          :key="userlist.id"
          @click="clickToUserHandle(userlist.id)"
          :class="{'active': activeContact == userlist.id}"
        >
        <UserComponent
          @userClick='userClick'
          :userlist='userlist'/>
        </li>
    </ul>
    <div v-else>
      <div class="contact-groups">
        <ContactGroups />
      </div>
      <ul>
            <li v-for="contact in getSortedContacts"
              :key="contact.contactId"
              @click="clickToContactHandle(contact.userId)"
              :class="{'active': activeContact == contact.userId}"
              >
                <Contact
                @contactClick='contactClick'
                :contact = 'contact'  />
            </li>
      </ul>
    </div>

 <div v-if="contacts.length == 0 && !isSearchisOpen" class="no-contacts">
 {{$t('NoFoundContactsMain')}}
 <p>{{$t('NoFoundContacts')}}</p>
 </div>
 <div class="no-search"
 v-if="isSearchisOpen && getSearchUsers.length === 0">

 {{$t('NoResult')}}

 </div>

</div>
</template>


<script lang="ts">
import Contact from 'components/UserAndContacts/ContactComponent.vue'
import Loader from 'components/UI/Loader.vue'
import UserComponent from 'components/UserAndContacts/UserComponent.vue'
import { defineComponent } from 'vue'
import { mapState } from 'pinia'
import { useUserContactsStore } from 'stores/UserContacts'
import { useMainStore } from 'stores/Main'
import { useUserStore } from 'stores/User'
import { useUserMessagesStore } from 'stores/UserMessages'
import ContactGroups from 'components/UserAndContacts/ContactGroups.vue'

export default defineComponent({
  data:() =>({
    activeContact: '' ,
    isLoading: false
  }),

  methods: {
    clickToContactHandle(id: string){
      this.activeContact = id
    },

    clickToUserHandle(id: string){
       this.activeContact = id
    },

    userClick(id: string){
       this.$router.push({name: 'userProfile'})
    },

    contactClick(id: string){
      const message = useUserMessagesStore()
      message.setCurrentCorrespondenceId(id)
      this.$router.push({name: 'Correspondence'})
    }
  },

  computed: {
      ...mapState(useUserContactsStore, ['sortedContacts', 'contacts']),
      ...mapState(useMainStore, ['mainLayout']),
      ...mapState(useUserStore, ['searchUsers']),

      isSearchisOpen(){
        return this.mainLayout.isSearchOpenInLeftNav
      },

      getSortedContacts(){
        return this.sortedContacts
      },

      getSearchUsers(){
        return this.searchUsers.users
      }
  },


    components:{
        Contact,
        Loader,
        UserComponent,
        ContactGroups
    }
})
</script>



<style scoped>
.contact-groups{
  margin-left: 5px;

}

ul{
  padding: 0;
}

li{
    padding: 1px 3px 0px 5px;
    height: 80px;
}

.active{
    background-color: var(--contact-list-active-bg);
    border-left: 4px solid var(--contact-list-active-border);

    transition: all 0.3s ease;
}

.no-contacts{
  padding: 5px;
  text-align: center;
  line-height: 1.2;
  color: var(--sub-text-color);
  font-style: italic;
}

.no-contacts p{
  font-size: 10px;
}
.no-search{
   padding: 5px;
  text-align: center;
  line-height: 1.2;
  color: var(--sub-text-color);
  font-style: italic;
}
</style>
