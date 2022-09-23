import ContactChecker from "components/modals/UserContacts/ContactChecker.vue"
import MessageReaction from "components/modals/MessageModals/ReactionModalComponent.vue"
import AddImage from "components/modals/MessageModals/AddImagesToMessage.vue"
import ImageViewer from "components/modals/MediaComponents/ImagesViewer.vue"
import CodeEditor from "components/modals/MediaComponents/PrismCodeEditor.vue"
import Camera from "components/modals/MessageModals/CameraComponent.vue"
import AddContactToUser from "components/modals/UserContacts/AddContactToUser.vue"
import CreateContactGroup from "components/modals/UserContacts/CreateGroupModal.vue"
import AddNewStickersToUser from "components/modals/MessageModals/addNewStickers.modal.vue"
import EditContact from "components/modals/UserContacts/EditContact.vue"
import UserCall from "components/modals/UserCalling/CallToUser.vue"
import FileSend from "components/modals/FilesSend/FileSend.vue"
import Settings from "components/modals/UserSettings.vue"

export interface IModalsComponents {
  ContactChecker
  MessageReaction
  AddImage
  ImageViewer
  CodeEditor
  Camera
  AddContactToUser
  CreateContactGroup
  AddNewStickersToUser
  EditContact
  UserCall
  FileSend
  Settings
}


export const modals : IModalsComponents = {
    ContactChecker,
    MessageReaction,
    AddImage,
    ImageViewer,
    CodeEditor,
    Camera,
    AddContactToUser,
    CreateContactGroup,
    AddNewStickersToUser,
    EditContact,
    UserCall,
    FileSend,
    Settings
}