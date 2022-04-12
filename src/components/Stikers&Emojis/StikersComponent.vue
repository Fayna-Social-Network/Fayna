<template>
   <div class="stickers">
    <div class="content">
      <div class="strikers-groups">
        <ul class="sticker-group-list">
          <li class="group-item"
          v-for="group in stickerGroups"
          :key="group.id"
          :class="{'active': selectedGroupId === group.id}"
          @click="groupItemClickHandle(group.id)"
          >
            <q-img class="group-image" :src="getFullPath(group.stickers[0].path)" />
          </li>
        </ul>
        <q-btn round size="10px"
          icon="add"
          color="orange-8"
          @click="addGroupHandle()"
          >
        </q-btn>
      </div>
      <div class="stickers-items">
        <ul class="sticker-list" v-if="stickerGroups.length > 0">
                <li v-for="sticker in getStickers" :key="sticker.id"
                 class="sticker"
                 @click="stickerClick(sticker.id)"
                 >
                    <q-img :src="getFullPath(sticker.path)" />
                 </li>
            </ul>
         <div class="no-stickers" v-else>{{$t('NoStickers')}}</div>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Open } from "src/functions/modals";
import { ISticker, IStickerGroup } from "src/types/sticker";
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { useUserStore } from "stores/User";

export default defineComponent({
  data:() => ({
    selectedGroupId: '',
  }),
    methods:{
     stickerClick(name: string){
         const stickerName = '$[]:'+name
         this.$emit('stickerClickHandle', stickerName)
     },
     addGroupHandle(){
       Open('AddNewStickersToUser', {})
     },
      getFullPath(path: string): string{
        return import.meta.env.VITE_APP_BACKEND_PATH + path
      },
      groupItemClickHandle(id: string){
       this.selectedGroupId = id
      },


 },
    computed:{
    ...mapState(useUserStore, ['user']),

    stickerGroups(): Array<IStickerGroup>{
      return this.user!.userStickersGroups
    },

    getStickers(): Array<ISticker>{
      if(this.stickerGroups.length > 0){
        return this.stickerGroups.find(g => g.id === this.selectedGroupId)!.stickers
      }
      this.selectedGroupId = ''
      return []
    },

   },
   created(){
     if(this.stickerGroups.length > 0){
       this.selectedGroupId = this.stickerGroups[0].id
     }
   }

})
</script>


<style scoped lang="scss">
.stickers{
    height: 100%;
    width: 350px;
}

.content{
  /* height: 400px; */
  display: grid;
  grid-template-columns: 65px 1fr;
}

.strikers-groups{
  border-right: solid 1px $border;
}

.group-item{
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.5s ease;
}

.group-item:first-child{
  margin-top: 5px;
}

.group-image{
  width: 50px;
}
.sticker-list{
    height: 390px;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
}

.sticker-group-list{
  height: 360px;
  /* overflow-y: auto; */
}

.no-stickers{
  padding-top: 10px;
  color: grey;
  font-style: italic;
  line-height: 1.1;
  text-align: center;
  font-size: 12px;
}
.button-add{
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: var(--text-color);
  transition: all 0.5s ease;
}

.button-add:hover{
  color:rgba(0, 4, 255, 0.582);
}
.active{
  position: relative;
  border-left: solid 3px #1C9DEA;
  border-bottom: solid 3px #1C9DEA;
  border-top:  solid 3px #1C9DEA;
  /* box-shadow: -2px 0px 3px 2px #5373EC; */
  border-right: solid 2px var(--stickers-box-bg);
}

.active::before{
    content: '';
    position: absolute;
    height: 47px;
    width: 10px;
    background: var(--stickers-box-bg);
    top: 0;
    right: -12px;
}

.sticker{
 padding: 5px;
 width: 60px;
 cursor: pointer;
 border-radius: 10px;
 transition: all 0.3s ease;

}
.sticker:hover{
    background: grey;
}
</style>