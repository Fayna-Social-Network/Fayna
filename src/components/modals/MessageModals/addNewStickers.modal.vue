<template>
<DialogModal>
  <template #header-text>
    {{$t('StickersStore')}}
  </template>
  <template #body>
     <div class="stickers-groups" @click="bodyClickHandle()">
        <div class="list-block">
          <ul class="groups-list">
            <li class="group-item"
             v-for="group in stikerGroup"
             :key="group.id"
             :class="{'checked': checkedId === group.id || isAdded(group.id), 'red': !isNormal}"
             @click.stop="groupItemClickHandle(group.id)"
            >
            <div class="added" v-if="isAdded(group.id)">
              <q-icon name="verified" size="20px" />
            </div>
              <div class="item">
                <q-img :src="getFullPath(group.stickers[0].path)" loading="lazy"/>
                <span>{{group.name}}</span>
              </div>
            </li>
          </ul>
        </div>
       </div>
  </template>
  <template #actions>
    <q-btn color="primary" icon="add"
    :label="$t('Add')"  v-if="isNormal"
     @click="addGroupHandle"
    />
    <q-btn color="negative" icon="delete"
    :label="$t('DeleteStickerGroup')" v-else
    @click="delGroupHandle"
    />
    <q-btn color="negative" :label="$t('Cancel')" @click="closeModal"/>
  </template>
</DialogModal>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import DialogModal from "../DialogModalTemplate.vue"
import Stickers from "src/services/messages/sticker.service"
import { Close } from "src/functions/modals"
import { IStickerGroup } from "src/types/sticker"
import { mapState, mapActions } from "pinia"
import { useUserStore } from 'stores/User'

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
    bodyClickHandle(){
      this.checkedId = ''
      if(this.isAdded(this.checkedId)){
          this.isNormal = false
          return
        }
      this.isNormal = true
    },
   async addGroupHandle(){
      if(this.checkedId === ''){
        this.$q.notify({type: 'negative', message: this.$t('checkTheStickerGroup')})
        return
      }
       await Stickers.addStickerGroupToUser(this.checkedId)
       const group = this.stikerGroup?.find(g => g.id === this.checkedId)
       if(group){
         this.addStickerGroup(group)
         this.$q.notify({message: this.$t('StikersIsAdd')})
       }
    },
    async delGroupHandle(){
      await Stickers.deleteStickersGroupFromUser(this.checkedId)
      this.$q.notify({message: this.$t('StickersGroupDelete')})
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
      return (id: string) => this.checkAdded(id)
    }
  },
  async mounted(){
    const result = await Stickers.getAllGroups()
    this.stikerGroup = result.data.stickerGroups
  },
  components:{
    DialogModal
  }
})
</script>

<style scoped>
.stickers-groups{
  width: 300px;
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
  width: 50px;
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