import { MenuItem } from "src/types/menu";
import { IContact } from 'src/modules/Users/types/contact';
import { Router } from 'src/router/index'
import Contacts from 'src/modules/Users/services/contacts.service';
import User from 'src/modules/Users/services/user.service';
import { Notify } from "quasar";
import { saveCorrespondenceToPDF } from "src/functions/pdf.functions";
import { Open } from "src/modules/modalWindows/services";


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

export type IActions = 'blockUser' | 'deleteContact' | 'saveCorrespondences' |
                        'editContact' | 'getUserProfile'

export const MenuActions = {

  getUserProfile(contact :IContact){
    Router.push({name: 'userProfile', params:{id: contact.userId}})
  },

  editContact(contact :IContact){
    Open('EditContact', contact)
  },

  saveCorrespondences(contact: IContact){
    saveCorrespondenceToPDF(contact)
  },

  async deleteContact(contact: IContact){
    Router.push({name: 'Start'})
    await Contacts.delContactFromUser(contact.contactId)
  },

  blockUser(contact: IContact){
    Router.push({name: 'Start'})
    User.blockUser(contact.userId)
    Notify.create({message: 'User Success Blocked'})
  }
 }