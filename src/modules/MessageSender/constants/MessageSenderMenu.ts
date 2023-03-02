import { Open } from "src/modules/modalWindows/services"
import { IContact } from "src/modules/Users/types/contact"
import { MenuItem } from "src/types/menu"

export type IAction = 'addImage' | 'openCamera' | 'openCodeEditor'

export const Menu: Array<MenuItem> = [
    {
        id: 0,
        icon: 'image',
        text:  'MessageComponentMenu_Image',
        action: 'addImage'
    },

    {
        id: 1,
        icon: 'photo_camera',
        text:  'MessageComponentMenu_Camera',
        action: 'openCamera'
    },

    {
        id: 2,
        icon: 'code',
        text:  'MessageComponentMenu_CodeSnippets',
        action: 'openCodeEditor'
    },

    {
        id: 3,
        icon: 'description',
        text:  'MessageComponentMenu_File',
        action: 'openSendFile'
    },

    {
        id: 4,
        icon: 'theaters',
        text: 'MessageComponentMenu_Multimedia',
        action: ''
    },

    // {
    //     id: 4,
    //     icon: 'place',
    //     text: 'MessageComponentMenu_Location',
    //     action: ''
    // },




]

export const MenuActions = {

  addImage(contact: IContact){
    Open('AddImage', contact)
  },

  openCamera(contact: IContact){
    Open('Camera', contact)
  },

  openCodeEditor(contact: IContact){
    Open('CodeEditor', contact)
  },

  openSendFile(contact: IContact){
    Open('FileSend', contact)
  }

}