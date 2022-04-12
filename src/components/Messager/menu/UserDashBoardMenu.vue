<template>
 <transition appear enter-active-class="animate__animated animate__backInDown" leave-active-class="animate__animated animate__backOutUp" mode="out-in">
 <div class="menu">
    <ul class="menu-list">
      <li class="menu-link"
        v-for="item in menu.menu"
        :key="item.id"
        @click="clickHandle(item)"
      >
        <span class="material-icons-outlined icon"
        :class="{'red': item.id === 4, 'danger': item.id === 3}"
        >{{item.icon}}</span>
        <span class="item-text">{{$translate(item.text)}}</span>
      </li>
    </ul>
 </div>
</transition>
</template>

<script lang="ts">
import { defineComponent} from "vue"
import { Menu, MenuActions } from 'src/menus/userDashboard.menu'
import { mapState } from "pinia"
import { useUserMessagesStore } from "stores/UserMessages"
import { useUserContactsStore } from "stores/UserContacts"

export default defineComponent({
  data: () => ({
    menu:{
      menu: Menu,
      menuActions: MenuActions
    }
  }),
  methods:{
    clickHandle(item){
      this.menu.menuActions[item.action](this.contact)
    }
  },
  computed:{
    ...mapState(useUserContactsStore, ['getContactById']),
    ...mapState(useUserMessagesStore, ['currentCorrespondenceId']),

    contact(){
      return this.getContactById(this.currentCorrespondenceId)
    }
  }
})
</script>

<style scoped>
.menu{
    position: absolute;
    top: 95px;
    right: 0;
    padding: 25px;
    background: var(--stickers-box-bg);
    text-align: left;
    text-transform: capitalize;
    border-radius: 10px;
    box-shadow: 5px 6px 15px -8px rgb(90, 89, 89);
    border: solid 1px grey
}
.menu-link{
  display: flex;
  align-items: center;
  cursor: pointer;
  margin-bottom: 10px;
}

.menu-link:last-child{
  margin-bottom: 0;
}

.menu-link:hover .item-text{
  color: blueviolet;
}

.red{
  color: red
}

.danger{
  color: rgb(255, 145, 0)
}

.item-text{
  font-size: 14px;
  line-height: 1.1;
  transition: all 0.3s ease;
}
.icon{
  margin-right: 10px;
}
</style>