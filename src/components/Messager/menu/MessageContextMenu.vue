<template>
    <div class="context-menu"
     :class="{'right': user!.id == mess.seller}"
    >
        <ul class="menu-list">
            <li class="menu-link"
            v-for="item in menu.menuItems"
            :key="item.id"
            @click="menuItemClickHandler(item)"
            ><span class="material-icons-outlined">{{item.icon}}</span>{{$translate(item.text)}}</li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useUserStore } from "@/store/User";
import { useUserMessagesStore } from "@/store/UserMessages"; 
import {Menu, MenuActions} from '@/menus/messageContext.menu'


export default defineComponent({
    props: ['mess'],
    data:() => ({
        menu: {
          menuItems: Menu,
          menuFunctions: MenuActions
        }

    }),
    methods:{
        menuItemClickHandler(item){
          this.menu.menuFunctions[item.action]({message: this.mess, 
              contactId: this.currentCorrespondenceId})
        }
    },
    computed:{
        ...mapState(useUserStore, ['user']),
        ...mapState(useUserMessagesStore, ['currentCorrespondenceId'])
    }
})
</script>

<style scoped>
.context-menu{
    position: absolute;
    background: var(--context-menu-bg);
    color: var(--context-menu-text);
    z-index: 999;
    padding: 10px;
    border-radius: 10px;
    top: 0px;
    left: 30px;
    /* opacity: 0; */
}
.menu-link{
    display: flex;
    transition: all 0.3s ease;
}

.menu-link:hover{
   color: var(--context-menu-text-hover)
}

.menu-link span{
padding-right: 10px;
}

.right{
    left: unset;
    right: 30px;
}
</style>