<template>
  <div class="sidebar-header">
    <div class="theme-title">
      <div class="header" >
        <div class="header-text">
          <div class="header-title">{{$t(header!.headerText)}}</div>
          <div class="header-desc">{{$t(header!.headerDesc)}}</div>
        </div>
        <div class="header-button">
           <q-btn round color="primary" icon="search"
            @click.stop="searchActivateHandler(true)"
           >
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]"
              transition-show="flip-right"
              transition-hide="flip-left"
            >
              {{$t('SearchUsers')}}
            </q-tooltip>
           </q-btn>
        </div>
      </div>
      <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zooOut"
      >
      <div v-show="activeSearch" class="search-form">
        <q-input v-model="searchInputText"
         :placeholder="$t('SearchPlaceholder')" input-style="color: white;">
          <template v-slot:append>
            <q-icon name="close" @click.stop="searchActivateHandler(false)"
             style="cursor: pointer;"/>
          </template>
        </q-input>
      </div>
      </transition>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent} from "vue"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "stores/User"
import { useMainStore } from "stores/Main"
import _ from 'lodash'
import { leftSideBarHeaders } from "src/constants/leftSideBarHeaders"
import User from 'src/services/users/user.service'

export default defineComponent({
    data:() =>{
        return{
            activeSearch: false,
            searchInputText: '',
            onSearchUsers: ()=>{}
        }
    },

    methods: {
      ...mapActions(useUserStore, ['setSearchUsers']),
      ...mapActions(useMainStore, ['setSearchIsOpenLeftNav']),

      async searchActivateHandler(bool : boolean){
            this.activeSearch = bool
            this.searchInputText = ''
            if(this.activeSearch){
                this.$router.push({name: 'Start'})
                 const res = await User.getUsersByCountAndPage(20, 1)
                 this.setSearchUsers(res.data)

            }
            this.setSearchIsOpenLeftNav(bool)
      },

        inputSearchChange(){

           this.onSearchUsers()
        },

     async searchUser(){

          if(this.searchInputText != ''){
            const res = await User.findByNickName(this.searchInputText)
            this.setSearchUsers(res.data)
          }else{
              const res = await User.getUsersByCountAndPage(20, 1)
              this.setSearchUsers(res.data)
          }
      }

    },
    computed:{
        ...mapState(useMainStore, ['mainMenuNumber']),

        header(){
          return leftSideBarHeaders.find(h => h.id === this.mainMenuNumber)
        }
    },
    watch:{
      searchInputText(){
        this.inputSearchChange()
      }
    },

    created(){
       this.onSearchUsers = _.debounce(this.searchUser, 500)
    }
})
</script>


<style scoped lang="scss">
.theme-title{
  position: relative;

}
.header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.header-text{
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
}
.header-title{
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
}

.search-form{
  position: absolute;
  top: 10px;
  left: 6px;
  width: 96%;
  padding: 10px;
  background: $primary;
  border-radius: 10px;
}

</style>