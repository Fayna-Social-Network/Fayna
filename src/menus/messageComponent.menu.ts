import { Open } from "src/functions/modals"
import { IContact } from "src/types/contact"
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

    // {
    //     id: 3,
    //     icon: 'contact_mail',
    //     text: 'MessageComponentMenu_Contact',
    //     action: ''
    // },

    // {
    //     id: 4,
    //     icon: 'place',
    //     text: 'MessageComponentMenu_Location',
    //     action: ''
    // },


    // {
    //     id: 5,
    //     icon: 'description',
    //     text:  'MessageComponentMenu_File',
    //     action: ''
    // }

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
  }

}