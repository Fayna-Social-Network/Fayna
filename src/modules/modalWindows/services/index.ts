import { useModalWindowStore } from "src/modules/modalWindows/store"
import { ModalWindows } from "src/modules/modalWindows/types/index"

export function Close(): void{
  const modals = useModalWindowStore()
  modals.setActiveModal('', null)
}

export function Open(modal: ModalWindows, data: any): void {
  const modals = useModalWindowStore()
   modals.setActiveModal(modal, data)
}