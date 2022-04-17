<template>
  <div class="main"
    :class="{'main-dark': $q.dark.isActive}"
  >
    <div class="user">
      <div class="user-avatar">
        <q-avatar rounded size="50px">
           <img :src="getContactAvatar(currentCorrespondenceId)">
        </q-avatar>
      </div>
      <div class="details">
        <div class="username">{{getContactNameById(currentCorrespondenceId)}}</div>
        <div class="status" :class="{'online': status == 'Online'}">
          <span>{{status}}</span>
        </div>
      </div>
    </div>
    <div class="action-panel">
      <ul class="option-group">
       <li><q-btn round color="primary" icon="volume_up" :size="iconSize">
              <q-tooltip anchor="bottom middle" self="bottom middle" :offset="[10, 30]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('DisableNotification')}}
              </q-tooltip>
           </q-btn></li>
       <li><q-btn round color="primary" icon="search" :size="iconSize">
           <q-tooltip anchor="bottom middle" self="bottom middle" :offset="[10, 30]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('Search')}}
              </q-tooltip>
       </q-btn></li>
      </ul>
        <ul class="option-group">
          <li><q-btn round color="primary" icon="call" :size="iconSize">
               <q-tooltip anchor="bottom middle" self="bottom middle" :offset="[10, 30]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('CallUser')}}
              </q-tooltip>
          </q-btn></li>
          <li><q-btn round color="primary" icon="video_camera_front" :size="iconSize">
             <q-tooltip anchor="bottom middle" self="bottom middle" :offset="[10, 30]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                {{$t('VideoCall')}}
              </q-tooltip>
          </q-btn></li>
          <li>
            <q-btn round color="primary" icon="more_vert" :size="iconSize">
              <q-menu :offset="[-10, 10]"
                auto-close
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <q-list style="min-width: 100px">
                  <q-item clickable
                    v-for="item in menu" :key="item.id"
                    @click="menuClickHandle(item)"
                  >
                    <q-item-section>
                      <div class="row" style="gap: 15px; align-items: center;">
                        <q-icon :name="item.icon" size="25px"
                        :color="item.id > 2 ? 'negative' : 'secondary' "/>
                        {{$t(item.text)}}
                      </div>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </li>
      </ul>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from "vue"
import { mapState } from "pinia"
import { useUserContactsStore } from "stores/UserContacts"
import { useUserMessagesStore } from "stores/UserMessages"
import IsOnlineBadge from "components/UI/badges/IsOnline.vue"
import { Menu, MenuActions, IActions } from 'src/menus/userDashboard.menu'
import { MenuItem } from "src/types/menu"
import { IContact } from "src/types/contact"


export default defineComponent({
    data:() => ({
      isMenuActive: false,
      menu: Menu,
      actions: MenuActions,
      iconSize: '14px'
    }),
    methods:{
      menuClickHandle(item: MenuItem){
        this.actions[item.action as IActions](this.getContactById(this.currentCorrespondenceId!) as IContact)
      }
    },
    computed:{
        ...mapState(useUserContactsStore, ['getContactById', 'getContactAvatar', 'getContactNameById']),
        ...mapState(useUserMessagesStore, ['currentCorrespondenceId']),

        status(){
            if(this.getContactById(this.currentCorrespondenceId!)!.isOnline){
                return 'Online'
            }else{
                return 'Offline'
            }
        },


    },
    mounted(){
      if(this.$q.platform.is.mobile){
        this.iconSize = '12px'
      }
    },
    components:{
      IsOnlineBadge
    }
})
</script>



<style scoped lang="scss">
.main{
  display: flex;
  padding: 20px;
  background: $primary;
  color: white;
}

.main-dark{
  background: $dark;
}

.user{
  display: flex;
  border-right: 1px solid $border;
}

.user-avatar{
  margin-right: 10px;
}

.details{
  padding-right: 40px;
}

.username{
  font-family: 'Yanone Kaffeesatz', sans-serif;
  font-weight: 400;
  font-size: 18px;
  width: 100px;
}

.status{
  font-family: 'Roboto', sans-serif;
  font-size: 12px;
  background: grey;
  padding: 1px 10px 1px 10px;
  border-radius: 20px;
  display: inline;
}

.online{
  background: $positive;
}

.action-panel{
  margin-left: 20px;
  margin-right: 20px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.option-group{
  display: flex;
  gap: 10px;

}

@media screen and (max-width: 570px){
  .details{
    display: none;
  }

  .main{
    padding: 20px 10px 20px 10px
  }

  .action-panel{
     margin-right: 0px;
  }
}

</style>