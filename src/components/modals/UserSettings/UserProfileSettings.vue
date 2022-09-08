<template>
  <div class="row justify-center">
    <p class="text-weight-bolder text-h6">Nickname:<span>{{' @' + user?.nickName}}</span></p>
  </div>
   <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="firstname"
        label="Your name *"
        hint="Please enter your name"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        filled
        v-model="lastname"
        label="Your lastname *"
        hint="Please enter your lastname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
      />
      <q-input
        v-model="(avatar as string)"
        filled
        accept="image/png, image/gif, image/jpeg"
        type="file"
        hint="Please choose the photo"
      >
        <template v-slot:before>
          <q-avatar size="60px">
            <img :src="avatarPath!">
          </q-avatar>
        </template>
      </q-input>
      <div>
        <q-btn :label="$t('Save')" type="submit" color="primary"/>
        <q-btn :label="$t('Reset')" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { useUserStore } from "src/stores/User"
import { mapState, mapActions } from "pinia"
import UserService from 'src/services/users/user.service'
import FileService from 'src/services/files.service'


interface IUserSettingsData {
  firstname: null | string
  lastname: null | string
  avatarFile: null | Blob
  avatar: null | string | File[],
  avatarPath: any
}

export default defineComponent({
  data:() : IUserSettingsData => ({
    firstname: null,
    lastname: null,
    avatarFile: null,
    avatar: null,
    avatarPath: null
  }),
  methods:{
    ...mapActions(useUserStore, ['setUser']),

    async onSubmit(){
      let Avatar : string | null
      
      if(this.avatarFile){
        const result = await FileService.upload(this.avatarFile as File, 'avatar')
        Avatar = result.data
      } else{
        Avatar = null
      }
      await UserService.updateUser({
        id: this.user?.id as string,
        firstName: this.firstname,
        lastName: this.lastname,
        avatar: Avatar
      })
      const userUpdate = await UserService.getUserByNickname(this.user?.nickName!)
      this.setUser(userUpdate)
      this.$q.notify({message: this.$t('UserUpdateSuccessfully')})
    },
    onReset(){
      this.firstname = null
      this.lastname = null
      this.avatarFile = null
      this.avatar = null
      this.avatarPath = this.getUserAvatar
    },
    updateAvatarHandle(val: File[]){
      this.avatarPath = URL.createObjectURL(val[0])
      this.avatarFile = val[0]
    }
  },
  computed: {
    ...mapState(useUserStore, ['user', 'getUserAvatar'])
  },
  watch: {
    avatar(){
      this.updateAvatarHandle(this.avatar as File[])
    }
  },
  mounted(){
    if(this.user?.firstName){
      this.firstname = this.user.firstName
    }
    if(this.user?.lastName){
      this.lastname = this.user.lastName
    }
    this.avatarPath = this.getUserAvatar
  }

})
</script>