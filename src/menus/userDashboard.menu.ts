import { MenuItem } from "src/types/menu";
import { IContact } from 'src/types/contact';
import router from 'src/router'
import Contacts from 'src/services/users/contacts.service';
import User from 'src/services/users/user.service';
import { Notify } from "quasar";
// import { saveCorrespondenceToPDF } from "@/functions/pdf.functions";
// import { Open } from "@/functions/modals";


export const Menu: Array<MenuItem> = [
  {
    id: 0,
    icon: 'account_circle',
    text: 'Profile',
    action: 'getUserProfile'
  },

  {
    id: 1,
    icon: 'edit',
    text: 'Edit',
    action: 'editContact'
  },

  {
    id: 2,
    icon: 'save',
    text: 'SaveCorrespondence',
    action: 'saveCorrespondences'
  },

  {
    id: 3,
    icon: 'person_remove',
    text: 'DeleteContact',
    action: 'deleteContact'
  },

  {
    id: 4,
    icon: 'block',
    text: 'BlockUser',
    action: 'blockUser'
  },
]


// export const MenuActions = {

//   getUserProfile(contact :IContact){
//     router.push({name: 'userProfile', params:{id: contact.userId}})
//   },

//   editContact(contact :IContact){
//     Open('EditContact', contact)
//   },

//   saveCorrespondences(contact: IContact){
//     saveCorrespondenceToPDF(contact)
//   },

//   async deleteContact(contact: IContact){
//     router.push({name: 'Start'})
//     await Contacts.delContactFromUser(contact.contactId)
//   },

//   blockUser(contact: IContact){
//     router.push({name: 'Start'})
//     User.blockUser(contact.userId)
//     $alert($translate('UserSuccessBlocked'), false)
//   }
//  }