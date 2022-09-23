import MainNavBar from 'src/i18n/en-US/mainNavBar'
import leftSideBarHeader from './leftSideBarHeader';
import contactList from './contactList'
import userList from './userList';
import modalAddContact from './modalAddContact';
import userDashboard from './userDashboard';
import sendMessageComponent from './sendMessageComponent';
import chat from './chat';
import contactGroupsModal from './createContactGroupModal'
import common from './common';
import modalEditContact from './modalEditContact';
import modalAddNewStickers from './modalAddNewStickers';
import notifications from './notifications'
import modalsCommon from './modalsCommon';
import settingsModal from './settingsModal';
import userCallsModal from './userCallsModal';

export default {
  ...MainNavBar,
  ...leftSideBarHeader,
  ...contactList,
  ...userList,
  ...modalAddContact,
  ...userDashboard,
  ...sendMessageComponent,
  ...common,
  ...contactGroupsModal,
  ...modalEditContact,
  ...modalAddNewStickers,
  ...chat,
  ...notifications,
  ...modalsCommon,
  ...settingsModal,
  ...userCallsModal
};
