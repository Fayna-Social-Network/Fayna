<template>
  <q-menu :offset="[-10, 30]"
    auto-close
    transition-show="flip-right"
    transition-hide="flip-left"
  >
    <q-list style="min-width: 100px">
      <q-item clickable
        v-for="item in menu.menu" :key="item.id"
        @click="menuClickHandle(item)"
      >
        <q-item-section>
          <div class="row" style="gap: 15px; align-items: center;">
            <q-icon :name="item.icon" size="25px" color="primary" />
                {{$t(item.text)}}
          </div>
        </q-item-section>
        </q-item>
        </q-list>
      </q-menu>
</template>

<script lang="ts">
import { MenuItem } from "src/types/menu";
import { defineComponent, PropType } from "vue";
import {Menu, MenuActions, IAction } from 'src/modules/MessageSender/constants/MessageSenderMenu'
import { IContact } from "src/modules/Users/types/contact";

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
          this.menu.menuActions[item.action as IAction](this.companion)
        }
    }
})
</script>

