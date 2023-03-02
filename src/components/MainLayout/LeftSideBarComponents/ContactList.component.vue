<template>
  <Loader v-if="isLoading" />
  <div v-else class="chat-main">
    <q-list v-if="isSearchisOpen" class="search-users">
      <q-item clickable v-for="userItem in getSearchUsers" :key="userItem.id" @click="clickToUserHandle(userItem.id)"
        class="list-item" :class="{ 'active': activeContact == userItem.id }">
        <UserComponent @userClick='userClick' :userItem='userItem' />
      </q-item>
    </q-list>

    <div v-else>
      <div class="contact-groups">
        <ContactGroups />
      </div>
      <q-list class="contact-list">
        <q-item clickable v-for="contact in getSortedContacts" :key="contact.contactId"
          @click="clickToContactHandle(contact.userId)" class="list-item"
          :class="{ 'active': activeContact == contact.userId }">
          <Contact @contactClick='contactClick' :contact='contact' />
        </q-item>
      </q-list>
    </div>

    <div v-if="contacts.length == 0 && !isSearchisOpen" class="no-contacts">
      {{ $t('NoFoundContactsMain') }}
      <p>{{ $t('NoFoundContacts') }}</p>
    </div>
    <div class="no-search" v-if="isSearchisOpen && getSearchUsers.length === 0">
      {{ $t('NoResult') }}
    </div>
  </div>
</template>


<script lang="ts">
import Contact from 'src/modules/Users/components/UserAndContacts/ContactComponent.vue'
import Loader from 'components/UI/Loader.vue'
import UserComponent from 'src/modules/Users/components/UserAndContacts/UserComponent.vue'
import { defineComponent } from 'vue'
import { mapState, mapActions } from 'pinia'
import { useUserContactsStore } from 'src/modules/Users/store/UserContacts'
import { useMainStore } from 'stores/Main'
import { useUserStore } from 'src/modules/Users/store/User'
import ContactGroups from 'src/modules/Users/components/UserAndContacts/ContactGroups.vue'

export default defineComponent({
  data: () => ({
    activeContact: '',
    isLoading: false
  }),

  methods: {
    ...mapActions(useUserContactsStore, ['setActiveContactChat']),

    clickToContactHandle(id: string) {
      this.activeContact = id
    },

    clickToUserHandle(id: string) {
      this.activeContact = id
    },

    userClick(id: string) {
      this.$router.push({ name: 'userProfile' })
    },

    contactClick(id: string) {
      this.setActiveContactChat(id)
      this.$router.push({ name: 'chat' })
    }
  },

  computed: {
    ...mapState(useUserContactsStore, ['sortedContacts', 'contacts']),
    ...mapState(useMainStore, ['mainLayout']),
    ...mapState(useUserStore, ['searchUsers', 'user']),

    isSearchisOpen() {
      return this.mainLayout.isSearchOpenInLeftNav
    },

    getSortedContacts() {
      return this.sortedContacts
    },

    getSearchUsers() {
      const users = this.searchUsers.users
      return users.filter(u => u.id != this.user?.id)
    }
  },


  components: {
    Contact,
    Loader,
    UserComponent,
    ContactGroups
  }
})
</script>



<style scoped lang="scss">
.contact-groups {
  margin-left: 5px;
}

.search-users {
  margin-top: 30px;
}

.contact-list {
  margin-top: 20px;
}


.list-item {
  padding: 10px 0px 10px 0px;
}

.active {
  background-color: rgba($color: #000000, $alpha: 0.3);
  border-left: 4px solid $primary;
  transition: all 0.3s ease;
}



.no-contacts {
  padding: 5px;
  text-align: center;
  line-height: 1.2;
  color: var(--sub-text-color);
  font-style: italic;
}

.no-contacts p {
  font-size: 10px;
}

.no-search {
  padding: 5px;
  text-align: center;
  line-height: 1.2;
  color: var(--sub-text-color);
  font-style: italic;
}
</style>
