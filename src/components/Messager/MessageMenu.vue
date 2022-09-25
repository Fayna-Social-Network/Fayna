<template>
         <div class="menu-button"
                :class="{'friend-menu': message.seller != user?.id}"
                @mouseleave="fabMenu = false"
                >
                  <q-fab
                    v-model="fabMenu"
                    :label="$t('MessageContextMenu')"
                    label-position="top"
                    external-label
                    color="positive"
                    :icon="message.seller != user?.id ? 'keyboard_arrow_left' : 'keyboard_arrow_right'"
                    :direction="message.seller != user?.id ? 'left' : 'right'"
                    padding="2px"
                  >
                    <q-fab-action v-for="(menuItem, i) in Menu"
                    :key="menuItem.id"
                    padding="5px"
                    :color="`blue-${9 - i}`"
                    :icon="menuItem.icon"
                    @click.stop="menuItemClickHandle(menuItem, message!)"
                    />

                  </q-fab>
                </div>
</template>

<script lang="ts">
  import { IMessage } from "src/types/message";
  import { defineComponent, PropType }  from "vue"
  import { Menu, MenuActions} from 'src/menus/messageContext.menu'
  import { MenuItem } from "src/types/menu"
  import { IUser } from "src/types/user";

  interface IMessageMenuData {
    fabMenu: boolean
    Menu: Array<MenuItem>
    MenuActions: typeof MenuActions
  }

  export default defineComponent({
    props: {
      message:{
        required: true,
        type: Object as PropType<IMessage>
      },
      correspondenseId:{
        required: true,
        type: String
      },
      user: {
        required: true,
        type: Object as PropType<IUser>
      }
    },

    data: (): IMessageMenuData => ({
      fabMenu: false,
      Menu,
      MenuActions,
    }),

    methods: {
      menuItemClickHandle(item : MenuItem, message: IMessage){
        this.MenuActions[item.action]({
          message,
          contactId: this.correspondenseId
        })
      },
    },

  })
</script>

<style scoped>
.menu-button{
  position: absolute;
  top: -42px;
  left: -15px;
  opacity: 0;
  transition: all 400ms ease;
}

.friend-menu{
  left: unset;
  right: -15px;
}
</style>