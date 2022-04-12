import MainNavBar from 'src/i18n/en-US/mainNavBar'
import leftSideBarHeader from './leftSideBarHeader';
import contactList from './contactList'
import userList from './userList';
import modalAddContact from './modalAddContact';
import userDashboard from './userDashboard';
import sendMessageComponent from './sendMessageComponent';
import common from './common';

export default {
  ...MainNavBar,
  ...leftSideBarHeader,
  ...contactList,
  ...userList,
  ...modalAddContact,
  ...userDashboard,
  ...sendMessageComponent,
  ...common
};
