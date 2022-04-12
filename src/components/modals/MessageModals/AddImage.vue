<template>
    <Modal
    @closeModal="closeModal"
    >
     <div class="upload-files" v-if="loading">
                    <Loader />
                </div>
     <template #header>
            {{$translate('AddImages')}}
        </template>
        <template #content>
            <div class="content">
                <div class="upload-files" v-if="loading">
                    <Loader />
                </div>
                <div class="main-image-block">
                    <img v-if="mainImageSrc != ''" class="main-image" :src="mainImageSrc" alt="mainImage">
                    <div v-else class="img-text">{{$translate('NoImages')}}</div>
                </div>
                <div class="images" v-if="files.length > 0">
                   <ul class="image-list">
                   <transition-group name="list" >
                       <li class="image-link" v-for="file in getPagePicture" :key="file.name">
                       <div class="image-div" @click.prevent="imageClickHandle(file)">
                         <img class="image" :src=" getFileSource(file)" alt="">
                         <div class="hover-image">
                            <span class="material-icons-outlined image-delete-icon"
                            @click.stop="deleteImage(file)"
                            >delete</span>
                        </div>
                       </div>
                        
                       </li>
                    </transition-group>  
                   </ul>
                   <div v-if="currentPage != pageCount" 
                   class="arrow-right"
                   @click="nextPage"
                   >
                   <span class="material-icons-outlined">chevron_right</span>
                   </div>
                   <div v-if="currentPage > 1" 
                   class="arrow-left"
                   @click="prevPage"
                   >
                    <span class="material-icons-outlined">chevron_left</span>
                    </div>
                </div>
                <div class="additionally" v-if="files.length > 0">
                <div class="controls">
                    <div class="item-control">
                        <input type="checkbox" id="addHeader" v-model="headerInput">
                         <label for="addHeader" class="label-control">{{$translate('AddHeaderToAlbum')}}</label>
                    </div>
                    <div class="item-control">                     
                        <input type="checkbox" id="addDescription" v-model="descriptionInput">
                        <label for="addDescription" class="label-control">{{$translate('AddDescriptionToAlbum')}}</label>
                    </div>                   
                </div>
                <div v-if="headerInput" class="image-text">
                    <input type="text" class="text-header" v-model="headerText">
                  </div>
                  <div v-if="descriptionInput" class="image-text">
                   <textarea class="text-area" v-model="descText"></textarea>
                   </div>
                </div>
            </div>
        </template>
    <template #footer>
    <div class="footer-buttons" v-if="!loading">
        <div class="add-button">
            <label for="files" class="upload-label">
            <input type="file" id="files" 
            class="upload" multiple 
            @change="handleFileUploads($event)"
            accept=".png,.jpg,.jpeg,.gif"
            />
                {{$translate("Add")}} </label>
        </div>
        <div class="send-button">
            <button class="send-button" :disabled="files.length == 0 && !loading"
            @click="sendHandler()"
            >{{$translate('SendTo')}}</button>
        </div>
    </div>
    </template>
    </Modal>
</template>


<script lang="ts">
import { defineComponent, PropType } from "vue"
import Modal from '../ModalWindowTemplate.vue'
import _ from 'lodash'
import { v4 as uuid } from 'uuid';
import Loader from '../../UI/Loader.vue'
import Files from '@/services/FilesService'
import { IContact } from "@/types/contact"
import { mapState, mapActions } from "pinia"
import { useUserStore } from "@/store/User";
import { useMainStore } from "@/store/Main";
import { useUserMessagesStore } from "@/store/UserMessages";
import ImageService from '@/services/messages/imageMessageService'
import { IMessage } from "@/types/message"
import { Close } from "@/functions/modals";

interface AddImageComponentData{
    allImg: any[],
    pageCount: number,
    countImg: number, 
    headerInput: boolean,
    descriptionInput: boolean,
    files: Array<File>,
    mainImageSrc: string,
    pageImg: any[],
    currentPage: number,
    headerText: string,
    descText: string,
    loading: boolean
}



export default defineComponent({
    props:{
      modalData:{
           required: true,
           type: Object as PropType<IContact>     
      }
    },
    data:() :AddImageComponentData => ({
        headerInput: false,
        descriptionInput: false,
        files: [],
        mainImageSrc: '',
        allImg: [],
        pageCount: 1,
        countImg: 4,
        currentPage: 1,
        pageImg: [],
        headerText: '',
        descText: '',
        loading: false
    }),

    methods:{
      ...mapActions(useUserMessagesStore, ['addMessageToCorrespondence']),
      ...mapActions(useMainStore, ['setMessageTrigger']),

      closeModal(){
           Close()
      },

      handleFileUploads(event){
        this.files = Array.from(event.target.files)
        if(this.files.length > 0){
          this.mainImageSrc = URL.createObjectURL(this.files[0])
          this.setupImagePagination()
                 
        }
      },

      getFileSource(file){
        return URL.createObjectURL(file)
      },

      setupImagePagination(){
        this.allImg = _.chunk(this.files, this.countImg)
        this.pageCount = _.size(this.allImg)
        this.pageImg = this.allImg[0]    
      },

       nextPage(){
          this.currentPage =  this.currentPage + 1
          this.pageImg = this.allImg[this.currentPage - 1]
       },

       prevPage(){
           this.currentPage =  this.currentPage - 1
           this.pageImg = this.allImg[this.currentPage - 1]
       },

       imageClickHandle(file){
           this.mainImageSrc = URL.createObjectURL(file)
       },

       deleteImage(file){
           this.files = this.files.filter(f => f.name != file.name)
           this.setupImagePagination()
           this.currentPage = 1
           if(this.files.length == 0){
            this.mainImageSrc = ''
           }
       },

       async sendHandler(){
         this.loading = true
         const imagesPath: string[] = []
            for(let file of this.files){
             let imagePath = await Files.upload(file, 'images')
             imagesPath.push(imagePath.data)
     
            }
      
       
        const result =  await ImageService.Send({
          sellerId: this.user!.id,
          userId: this.modalData.userId,
          header: this.headerText,
          description: this.descText,
          dbImagePath: imagesPath
        })

        
         const newMess: IMessage = {

            id: result.data,         
            text: '[:image_message:]',
            isRead: false,
            timestamp: new Date(),
            seller: this.user!.id,
            userId: this.modalData.userId

         }

        this.addMessageToCorrespondence({message: newMess,
           contactId: this.modalData.contactId})
        this.setMessageTrigger(uuid())        
        Close()

       }
    },  
       computed: {
           ...mapState(useUserStore, ['user']),
           getPagePicture(){
               return this.pageImg
           }
       },
       watch:{
           headerInput(){
               if(this.headerInput == false){
                   this.headerText = ''
               }
           },
           descriptionInput(){
               if(this.descriptionInput == false){
                   this.descText = ''
               }
           }
       },
    
    components:{
        Modal,
        Loader
       
    }
})
</script>

<style scoped>
.content{
    position: relative;
}

.upload-files{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99999;
}
.upload-label {
	display: block;
	width: 105px;
	background-color: slateblue;
	border-radius: 2px;
	font-size: 1em;
	line-height: 2.5em;
	text-align: center;
    color:aliceblue;
}

.upload-label:hover {
	background-color: cornflowerblue;
    cursor: pointer;
}

.upload-label:active {
	background-color: mediumaquamarine;
}

.footer-buttons{
    padding: 10px;
}
.upload{
	border: 0;
    clip: rect(1px, 1px, 1px, 1px);
    height: 1px; 
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.footer-buttons{
    display: flex;
    justify-content: space-between;
}

.controls{
    border: solid 1px rgb(175, 175, 175);
    padding: 5px;
    border-radius: 5px;
}

.label-control{
    font-size: 14px;
    padding-left: 5px;
}

.label-control:hover{
    cursor: pointer;
}

.send-button{
    width: 105px;
	background-color: var(--modal-window-close-bg);
	font-size: 1em;
	line-height: 2.5em;  
    color: whitesmoke;
    border: none;
    border-radius: 2px;
    cursor: pointer;
}

.send-button:hover{
    background-color: var(--modal-window-close-hover);
}

.main-image-block{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 200px;
    padding: 3px;
    margin-bottom: 10px;
    overflow: hidden;
    border: dashed 1px dimgrey;
}
.main-image{
    width: 100%;
}

.img-text{
    color: grey;
    font-size: 14px;
    font-style: italic;
   
}

.images{
    position: relative;
    /* border: dashed 1px darkslategray; */
    height: 60px;
    margin-bottom: 10px;
    display: flex;
}
.image-list{
    display: flex;
    justify-content: center;
    align-items: center;
}

.image-link{
    padding-right: 5px;
   
}
.image-link:last-child{
    padding-right: 0;
}
.image{
   max-height: 60px;
   width: 63px;
}
.arrow-right{
    position: absolute;
    top: 15px;
    right: -18px;
    color: var(--text-color);
    cursor: pointer; 
    transition: all 0.5s ease;
}
.arrow-left{
    position: absolute;
    top: 15px;
    left: -18px;
    color: var(--text-color);
    cursor: pointer; 
    transition: all 0.5s ease;
}

.arrow-right:hover{
    transform: scale(1.2);
} 

.item-control{
    display: flex;
    align-items: center;  
}
.item-control:hover{
    cursor: pointer;
}
.arrow-left:hover{
    transform: scale(1.2);
} 

.image-div{
    position: relative;
    cursor: pointer;
}

.image-div:hover .hover-image{
    opacity: 1;
}
.hover-image{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: all 0.5s ease;
}

.image-delete-icon{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    font-size: 18px;
    transition: all 0.5s ease;
}

.text-header{
    background: var(--send-message-component-input-bg);
    color: var(--text-color);
    border-radius: 10px;
    border: none;
    width: 100%;
    padding: 5px;
    font-size: 15px;
}

.text-area{
    background: var(--send-message-component-input-bg);
    color: var(--text-color);
    border-radius: 10px;
    border: none;
    max-width: 100%;
    min-width: 100%;
    padding: 5px;
    font-size: 15px;
}
.image-text{
    padding-top: 10px;
}

.image-delete-icon:hover{
    transform: scale(1.1);
}

button:disabled,
button[disabled]{
  /* border: 1px solid #999999; */
  background-color: #cccccc;
  color: #666666;
}

button:disabled,
button[disabled]:hover{
  /* border: 1px solid #999999; */
  background-color: #cccccc;
  color: #666666;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>