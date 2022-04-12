<template>
<Overlay>
  <template #content>
    <div class="window">
      <CloseButton @closeModal="closeModal"/>
      <div class="stickers-groups">
        <div class="header">{{$translate('AddStickers')}}</div>
        <div class="list-block">
          <ul class="groups-list">
            <li class="group-item"
             v-for="group in stikerGroup"
             :key="group.id"
             :class="{'checked': checkedId === group.id || isAdded(group.id), 'red': !isNormal}"
             @click="groupItemClickHandle(group.id)"
            >
            <div class="added" v-if="isAdded(group.id)">
              <span class="material-icons-outlined">verified</span>
            </div>
              <div class="item">
                <img :src="getFullPath(group.stickers[0].path)" alt="">
                <span>{{group.name}}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="add-button-block">
          <div class="button-add" @click="addGroupHandle" v-if="isNormal">
            <span class="material-icons-outlined">add</span>
            <span class="text-button">{{$translate('Add')}}</span>
          </div>
           <div class="button-del" @click="delGroupHandle" v-else>
            <span class="material-icons-outlined">delete</span>
            <span class="text-button">{{$translate('DeleteStickerGroup')}}</span>
          </div>
        </div>
      </div>
    </div>
  </template>
</Overlay>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import Overlay from "../OverlayComponent.vue"
import CloseButton from "@/components/UI/buttons/CloseModalButton.vue"
import Stickers from "@/services/messages/sticker.service"
import { Close } from "@/functions/modals"
import { IStickerGroup } from "@/types/sticker"
import { mapState, mapActions } from "pinia"
import { useUserStore } from '@/store/User'

interface NewStickerData{
  stikerGroup: Array<IStickerGroup> | null
  checkedId: string,
  isNormal: boolean
}

export default defineComponent({
  data:(): NewStickerData => ({
    stikerGroup: null,
    checkedId: '',
    isNormal: true
  }),
  methods:{
    ...mapActions(useUserStore, ['addStickerGroup']),

    getFullPath(path: string): string{
      return import.meta.env.VITE_APP_BACKEND_PATH + path
    },
    groupItemClickHandle(id: string){
      this.checkedId = id
        if(this.isAdded(this.checkedId)){
          this.isNormal = false
          return
        }
        this.isNormal = true
    },
   async addGroupHandle(){
      if(this.checkedId === ''){
        this.$alert(this.$translate('checkTheStickerGroup'), true)
        return
      }
       await Stickers.addStickerGroupToUser(this.checkedId)
       const group = this.stikerGroup?.find(g => g.id === this.checkedId)
       if(group){
         this.addStickerGroup(group)
         this.$alert(this.$translate('StikersIsAdd'), false) 
       }  
    },
    async delGroupHandle(){
      await Stickers.deleteStickersGroupFromUser(this.checkedId)
      this.$alert(this.$translate('StickersGroupDelete'), false)
      this.checkedId = ''
      this.isNormal = true
      const result = await Stickers.getAllGroups()
      this.stikerGroup = result.data.stickerGroups
    },
    closeModal(){
      Close() 
    },
    checkAdded(id: string): boolean{
      let temp = 0
      this.user!.userStickersGroups.forEach(group => {
        if(group.id === id){
          temp++
        }
      });
     if(temp > 0){
       return true
     }
     return false
    }
  },
  computed:{
    ...mapState(useUserStore, ['user']),

    isAdded(){
      return id => this.checkAdded(id)
    }
  },
  async mounted(){
    const result = await Stickers.getAllGroups()
    this.stikerGroup = result.data.stickerGroups
  },  
  components:{
    Overlay,
    CloseButton
}
})
</script>

<style scoped>
.window{
  position: relative;
  width: 400px;
  background: rgb(12, 11, 11);
  border-radius: 10px;
  padding: 20px;
}

.header{
  color: rgb(141, 141, 141);
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 10px;
}
.list-block{
  width: 100%;
  height: 200px;
  border: solid 1px grey;
  padding: 10px;
}

.groups-list{
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  overflow-y: auto;
}

.group-item{
  position: relative;
  height: fit-content;
  cursor: pointer;
  padding: 0px 5px 0px 5px;
}

.red{
  background: red !important;
}
.added{
  position: absolute;
  top: 0;
  right: 0;
  color: rgb(151, 214, 57);
}
.checked{
  background: grey;
  border-radius: 20%;
}
.item{
  height: 70px;
  display: flex;
  flex-direction: column;
  justify-content:flex-end;
  align-items: center;
  color: aliceblue;
}
img{
  width: 50px;
}

.button-add{
  background: rgb(18, 160, 18);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;
  padding: 5px 0px 5px 0px;
  transition: all 0.5s ease;
}

.button-del{
  background: rgb(160, 18, 18);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;
  padding: 5px 0px 5px 0px;
  transition: all 0.5s ease; 
}

.button-del:hover{
  background: rgb(163, 86, 86);
}
.button-add:hover{
   background: rgb(133, 201, 133);
}
.text-button{
  margin-left: 10px;
}
</style>