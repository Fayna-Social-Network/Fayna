<template>
  <div class="nav-bar">
    <div class="nav-bar-content">
      <div class="nav-bar-logo">
          <q-img :src='logo' style="width: 50px;"/>
      </div>
      <div class="user-avatar">
        <q-avatar size="57px">
          <img :src="getUserAvatar">
        </q-avatar>
      </div>
      <ul class="menu-list">
        <li class="menu-item"
          v-for="item in menuList"
          :key="item.id"
        >
        <q-btn round
        :color="isActive === item.id ? 'blue-7' : 'blue-grey-12'"
         :size="iconSize"
        :icon="item.icon"
        @click.stop="menuClickHandler(item.id)"
        :class="{'active': isActive === item.id}"
        >
        <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
          transition-show="flip-right"
          transition-hide="flip-left"
        >
          {{$t(item.title)}}
        </q-tooltip>
        </q-btn>
        <NotifyRedIcon v-if="item.isNotify"/>
        </li>
      </ul>
    </div>
    <div class="nav-bar-content">
      <ul class="menu-list">
        <li class="menu-item">
          <q-btn round  :size="iconSize"
          :icon="$q.dark.isActive ? 'wb_sunny' : 'nightlight'"
          color="grey-7"
          @click.stop="themeChangeHandler()"
          >
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
            >
                {{$t('Theme')}}
            </q-tooltip>
          </q-btn>
        </li>
        <li class="menu-item">
          <q-btn round :size="iconSize"
          icon="settings"
          color="orange-8"
          @click.stop="setupMenuHandle()"
          >
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              {{$t('Settings')}}
             </q-tooltip>
          </q-btn>
        </li>
         <li class="menu-item">
          <q-btn round  :size="iconSize"
          icon="power_settings_new"
          color="red-8"
          @click.stop="$oidc.signOut()"
          >
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              {{$t('LogOut')}}
            </q-tooltip>
          </q-btn>
        </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "stores/User"
import { useUserMessagesStore } from "stores/UserMessages"
import { useUserNotificationsStore } from "stores/UserNotification"
import { useMainStore } from "stores/Main"
import { Menu } from 'src/menus/leftNavBar.menu'
import logo from 'src/assets/image/logo-icon.png'
import NotifyRedIcon from "components/UI/badges/NotifyRedIcon.vue"
import { Open } from 'src/functions/modals'

export default defineComponent({
    data:()=>{
        return{
            menuList: Menu,
            isActive: 0,
            userAvatar: '',
            logo,
            iconSize: '16px'

        }
    },

   computed:{
       ...mapState(useUserStore, ['user', 'getUserAvatar']),
       ...mapState(useUserMessagesStore, ['Correspondences']),
       ...mapState(useUserNotificationsStore, ['Notifications']),

        checkUnreadMessage(){
          let unread = 0
          this.Correspondences.forEach(corr => {
            corr.messages.correspondences.forEach(mess =>{
             if(!mess.isRead && mess.seller != this.user!.id){
                unread++
             }
            })
          })
         return unread
        },

        checkNotifications(){
          return this.Notifications.length
        }


   },
   watch:{
     checkUnreadMessage(count){
      if(count > 0){
        this.menuList[0].isNotify = true
      }else{
         this.menuList[0].isNotify = false
      }
     },

     checkNotifications(count){
       if(count > 0){
        this.menuList[4].isNotify = true
      }else{
         this.menuList[4].isNotify = false
      }
     }
   },
    methods: {
      ...mapActions(useMainStore, ['setMainMenuNumber']),

        menuClickHandler(id: number){
            this.isActive = id
            this.$router.push({name: 'Start'})
            this.setMainMenuNumber(id)
        },

        themeChangeHandler(){
          this.$q.dark.toggle()
          if(this.$q.dark.isActive){
            localStorage.setItem('darkTheme', 'true')
          }else{
            localStorage.setItem('darkTheme', 'false')
          }
        },

       setupMenuHandle(){
          Open('Settings', {})
       },


        getImgUrl(): string{
           const path = this.user!.avatar
           if(path != null){

           return import.meta.env.VITE_APP_BACKEND_PATH + path

           }else{
               return import.meta.env.VITE_APP_BACKEND_PATH + 'Resources/Images/user-profile.png'
           }

       }

    },
    mounted(){
      if(this.checkUnreadMessage > 0){
         this.menuList[0].isNotify = true
      }
      if(this.checkNotifications > 0){
        this.menuList[4].isNotify = true
      }
      if(this.$q.platform.is.mobile){
        this.iconSize = '13px'
      }
    },
    components:{
      NotifyRedIcon
    }


  })
</script>

<style scoped lang="scss">
.nav-bar{
  height: 100%;
  display: flex;
  flex-direction: column;

}
.nav-bar-content{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.nav-bar-logo{
   padding: 20px 0px 20px 0px;
   border-bottom: 1px solid $border;
}

.user-avatar{
  margin-top: 20px;
}

img{
  border: 3px solid #019DE2;
}

.menu-list{
  margin-top: 20px;
}

.menu-item{
  padding-top: 25px;
  position: relative;
}
.active{
  box-shadow: 0 0 3px 2px #eff1f2;
}

@media screen and (max-height: 750px){
  .menu-item{
    padding-top: 15px;

  }

  .nav-bar-logo{
   padding: 10px 0px 10px 0px;

  }
}
</style>