<template>
  <div class="contact-checker">
    <div class="contact-info">
      <div class="contact-avatar">
        <q-avatar rounded>
          <img :src="avatar">
        </q-avatar>
      </div>
      <div class="contact-details">
        <div class="nickname">{{nickName}}</div>
        <div class="username">{{username}}</div>
      </div>
    </div>

    <div class="contact-check">
       <q-checkbox v-model="checked" @click="isUserChecked"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: ['user'],
    data: () => ({
        nickName: '',
        username: '',
        isOnline: false,
        checked: false

    }),
    methods:{
        isUserChecked(){
            this.$emit('checkUser', {user: this.user, checked: this.checked})
        }
    },
    computed:{
    avatar(){
        if(this.user.avatar){
         return  import.meta.env.VITE_APP_BACKEND_PATH +
            this.user.avatar
      }else{
         return import.meta.env.VITE_APP_BACKEND_PATH +
              'Resources/Images/user-profile.png'
      }
    },
    },
      mounted() {
        if(this.user.firstName || this.user.lastName){
            this.username =  this.user.firstName+' '
                 +this.user.lastName
        }
         this.nickName =  '@' +  this.user.nickName

   },
})
</script>

<style scoped lang="scss">
.contact-checker{
  display: flex;
  justify-content: space-between;
  width: 250px;
}

.contact-info{
  display: flex;
  gap: 10px;
}

.contact-details{
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.contact-check{
  display: flex;
  align-items: center;
}

.nickname{
  font-family: $yanone;
  font-size: 18px;
}

</style>