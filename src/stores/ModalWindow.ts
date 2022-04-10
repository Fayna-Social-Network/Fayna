import { ModalWindows } from "src/types/types";
import { defineStore } from "pinia";

interface ModalWindowState{
  activeModal: ModalWindows | '',
  modalData: any
}

export const useModalWindowStore = defineStore('modalWindow', {

  state: (): ModalWindowState => ({
    activeModal: '',
    modalData: null
  }),

  actions:{

    setActiveModal(modalName: ModalWindows | '', data: any){
      this.activeModal = modalName
      this.modalData = data
    }

  }

})
