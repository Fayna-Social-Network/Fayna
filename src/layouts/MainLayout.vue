<template>
  <q-layout view="lHh Lpr lFf">
    <q-drawer
      show-if-above
      bordered
      :width="leftDriwerWidth"
    >
    <div class="drawer-body">
       <transition
          appear
          enter-active-class="animated fadeInLeft"
          leave-active-class="animated fadeOutLeft"
        >
        <div class="nav-menu" v-show="navMenuVisible">
          <NavBar />
        </div>
      </transition>
      <div class="left-side-bar">
        <LeftSideBar />
      </div>
    </div>
      <div class="absolute" style="top: 15px; right: -17px" v-if="navBarToggleButtonVisible">
          <q-btn
            dense
            round
            unelevated
            color="accent"
            :icon="navMenuVisible ? 'chevron_left' : 'chevron_right'"
            @click="navMenuVisible = !navMenuVisible"
          />
        </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

     <q-drawer
      show-if-above
      bordered
      :width="80"
      side="right"
    >
    <AppsNav />
    </q-drawer>
  </q-layout>
</template>

<script lang="ts">
import { InitializeResponseSignalRCommands, signalrRegisterUserOnline } from 'src/signalr/signalR';
import { defineComponent } from 'vue';
import { useSignalR } from '@quangdao/vue-signalr';
import { mapState } from 'pinia';
import { useUserContactsStore } from 'src/stores/UserContacts';
import NavBar from 'components/MainLayout/NavBar.component.vue'
import AppsNav from 'components/MainLayout/AppsNavBar.component.vue'
import LeftSideBar from 'components/MainLayout/LeftSideBar.component.vue'

export default defineComponent({
  name: 'MainLayout',

 data:() => ({
   leftDriwerWidth: 380,
   navMenuVisible: true,
   navBarToggleButtonVisible: false,

 }),

 methods:{
   setTheme(){
     if(localStorage.getItem('darkTheme') === 'true'){
       if(!this.$q.dark.isActive){
         this.$q.dark.toggle()
       }
     }
   }
 },

 computed:{
   ...mapState(useUserContactsStore, ['contacts'])
 },

  mounted(){
    this.setTheme()

    if(window.innerWidth < 1024){
      this.leftDriwerWidth = 300
      this.navMenuVisible = false
      this.navBarToggleButtonVisible = true
    }else{
      this.leftDriwerWidth = 380
      this.navMenuVisible = true
      this.navBarToggleButtonVisible = false
    }

    window.addEventListener('resize', () =>{
      if(window.innerWidth < 1024){
          this.leftDriwerWidth = 300
          this.navMenuVisible = false
          this.navBarToggleButtonVisible = true
      }else{
          this.leftDriwerWidth = 380
          this.navMenuVisible = true
          this.navBarToggleButtonVisible = false
      }
    })

    signalrRegisterUserOnline(this.$oidc.userProfile.name as string,
        useSignalR())

  },
  created(){
    InitializeResponseSignalRCommands(this.contacts,
        this.$oidc.userProfile.name as string, useSignalR())
  },
  components:{
    NavBar,
    AppsNav,
    LeftSideBar
  }
});
</script>

<style lang="scss" scoped>
  .nav-menu{
    height: 100vh;
    width: 80px;
    border-right: 1px solid $border;
  }

  .drawer-body{
    display: flex;
  }

  .left-side-bar{
    overflow-y: auto;
    width: 300px;
  }

  @media screen and (max-widht: 1024px){
    .nav-menu{
      position: absolute;
      top: 0;
      left: 0;
    }

  }
</style>
