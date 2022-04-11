import { jsPDF } from "jspdf"
import { IMessage } from 'src/types/message';
import { IContact } from "src/types/contact";
import { useUserMessagesStore } from "stores/UserMessages";
import { useUserStore } from "stores/User";
import Roboto from 'src/assets/fonts/Roboto-Regular.ttf'

export function saveCorrespondenceToPDF(contact: IContact){
  const userMessagesStore = useUserMessagesStore()
  const userStore = useUserStore()

  const messages = userMessagesStore.getCorrespondence(contact.contactId)
  const user  = userStore.user
  const doc = new jsPDF();
    doc.addFont(Roboto, "Roboto", "normal");
    doc.setFont("Roboto"); // set font

    const padding = 5
    let br = 10

    const textConfig = {
      start: 10,
      align: "left",
      username: ""
    }

  messages?.forEach(message => {
    doc.setFontSize(12)
    if(message.seller === user?.id){
      textConfig.align = "right"
      textConfig.start = 200
      textConfig.username = '@' + user.nickName
    }else{
      textConfig.align = "left"
      textConfig.start = 10
      textConfig.username = '@' + contact.nickName
    }

    doc.text(textConfig.username, textConfig.start, br, null, null, textConfig.align)
    br += 7

    doc.setFontSize(10);
    if(message.text.length > 40){
      const text = message.text.match(/.{1,40}/g)
      text?.forEach(t => {
        doc.text(t, textConfig.start, br, null, null, textConfig.align);
        br += padding
      })
    }else{
      doc.text(message.text, textConfig.start, br, null, null, textConfig.align);

    }
    if(br < 240){
      br += 10
    }else{
      doc.addPage()
      br = 10
    }

  })



  doc.save(`chat${Date.now()}`)
}


