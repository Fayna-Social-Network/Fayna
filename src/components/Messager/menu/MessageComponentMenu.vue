<template>
    <div class="window">
        <ul class="menu-list">
            <li class="menu-link"
            v-for="item in menu.menu"
            :key="item.id"
            @click="menuClickHandle(item)"
            >
                <span class="material-icons-outlined">{{item.icon}}</span>
                <span class="link-text">{{$translate(item.text)}}</span>
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { MenuItem } from "@/types/menu";
import { defineComponent, PropType } from "vue";
import {Menu, MenuActions} from '../../../menus/messageComponent.menu'
import { IContact } from "../../../types/contact";

export default defineComponent({
    props:{
        companion:{
            required: true,
            type: Object as PropType<IContact>
        }
    },
    data: () => ({
        menu: {
          menu: Menu,
          menuActions: MenuActions
        }
    }),
    methods:{
        menuClickHandle(item: MenuItem){
          this.menu.menuActions[item.action](this.companion)
        }
    }
})
</script>

<style scoped>
.window{
    position: absolute;
    bottom: 115px;
    left: 118px;
    padding: 15px;
    z-index: 666;
    background: var(--stickers-box-bg);
    border-radius: 10px;
    transition: all 0.6s ease;
}

.window::before{
    content: "";
    position: absolute;
    width: 0;
    height: 0;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-top: 12px solid var(--stickers-box-bg);
    bottom: -12px;
    left: 40px;
    z-index: 1;
}
.menu-link{
    color: var(--text-color);
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    cursor: pointer;
    transition: all 0.5s ease;
}

.menu-link:last-child{
     padding-bottom: 0px;
}

.menu-link:hover {
    color: indigo;
}

.link-text{
    padding-left: 10px;
}
</style>