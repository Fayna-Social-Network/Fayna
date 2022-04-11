<template>
    <Contact>
        <template #profile>
             <img
                class="bg-img"
                :src="avatar"
                alt="Avatar"
                />
            <div v-if="isOnline" class="user-online"></div>
        </template>
        <template #details>
            <h4>{{nickName}}</h4>
            <h5>{{username}}</h5>
        </template>
        <template #content>
        <div class="check-box">
             <Check  @isCheck='isUserChecked'/>
        </div>
        </template>
    </Contact>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Contact from './ContactTemplate.vue'


export default defineComponent({
    props: ['user'],
    data: () => ({
        nickName: '',
        username: '',
        isOnline: false,

    }),
    methods:{
        isUserChecked(value: boolean){
            this.$emit('checkUser', {user: this.user, checked: value})
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
    components:{
        Contact,

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

.check-box{
    position: absolute;
    right: 0;
    top: 8px;
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

</style>