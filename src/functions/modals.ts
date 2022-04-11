import { useModalWindowStore } from "stores/ModalWindow"
import { ModalWindows } from "src/types/types"

export function Close(): void{
  const modals = useModalWindowStore()
  modals.setActiveModal('', null)
}

export function Open(modal: ModalWindows, data: any): void {
  const modals = useModalWindowStore()
   modals.setActiveModal(modal, data)
}