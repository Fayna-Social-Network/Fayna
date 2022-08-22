import { markRaw, defineAsyncComponent } from "vue"
import Loader from 'components/UI/Loader.vue'


interface IModals {
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
  Settings
}

interface IChat {
  UserDashboard
  SendMessageComponent
  Chat
}

interface IMainLayout {
  NavBar
  AppsNav
  LeftSideBar
  MainLayotModals
}

export interface IAsyncComponents {
  modals : IModals
  chat : IChat
  MainLayout :IMainLayout
}

export const AsyncComponents : IAsyncComponents = {
    modals : { 
      ContactChecker: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/UserContacts/ContactChecker.vue")),
        loadingComponent: Loader
      }), 
      MessageReaction: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/MessageModals/ReactionModalComponent.vue")),
        loadingComponent: Loader
      }),
      AddImage: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/MessageModals/AddImagesToMessage.vue")),
        loadingComponent: Loader
      }),
      ImageViewer:defineAsyncComponent({
        loader: () => markRaw(import("components/modals/MediaComponents/ImagesViewer.vue")),
        loadingComponent: Loader
      }),
      CodeEditor: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/MediaComponents/PrismCodeEditor.vue")),
        loadingComponent: Loader
      }),
      Camera: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/MessageModals/CameraComponent.vue")),
        loadingComponent: Loader
      }),
      AddContactToUser: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/UserContacts/AddContactToUser.vue")),
        loadingComponent: Loader
      }),
      CreateContactGroup: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/UserContacts/CreateGroupModal.vue")),
        loadingComponent: Loader
      }),
      AddNewStickersToUser: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/MessageModals/addNewStickers.modal.vue")),
        loadingComponent: Loader
      }),
      EditContact: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/UserContacts/EditContact.vue")),
        loadingComponent: Loader
      }),
      Settings: defineAsyncComponent({
        loader: () => markRaw(import("components/modals/UserSettings.vue")),
        loadingComponent: Loader
      }),
    },

    chat: {
        UserDashboard : defineAsyncComponent({
            loader: () => import('components/Messager/UserDashboard.component.vue'),
            loadingComponent: Loader
        }),
        SendMessageComponent : defineAsyncComponent({
            loader: () => markRaw(import('components/Messager/SendMessage.component.vue')),
            loadingComponent: Loader
        }),
        Chat : defineAsyncComponent({
            loader: () => markRaw(import('components/Messager/Chat.vue')),
            loadingComponent: Loader
        }),
            
    },

    MainLayout: {
      NavBar: defineAsyncComponent({
        loader: () => markRaw(import('components/MainLayout/NavBar.component.vue')),
        loadingComponent: Loader
      }),
      AppsNav: defineAsyncComponent({
        loader: () => markRaw(import('components/MainLayout/AppsNavBar.component.vue')),
        loadingComponent: Loader
      }),
      LeftSideBar : defineAsyncComponent({
        loader: () => import('components/MainLayout/LeftSideBar.component.vue'),
        loadingComponent: Loader
      }),
      MainLayotModals : defineAsyncComponent({
        loader: () => markRaw(import('src/components/modals/MainLayoutModals.vue')),
        loadingComponent: Loader
      })
    }
} 