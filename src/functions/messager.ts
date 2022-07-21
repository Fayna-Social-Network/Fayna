import ImagesToImagesPathArray from "src/mappers/ImagesToImagesPathArray"
import AudioMessage from "src/services/messages/audioMessage.service"
import ImageMessage from "src/services/messages/imageMessage.service"
import VideoMessage from "src/services/messages/videoMessage.service"
import Message from "src/services/messages/message.service"
import { IMessage } from "src/types/message"
import moment from "moment"


let diff = 0
let dateIsShow = ''

export function isDisplayDate(date: Date): boolean{
  const messageDate = moment(date)
  const nowDate = moment.utc()
  if(messageDate.diff(nowDate, 'days') <= 0){
    if(diff != messageDate.diff(nowDate, 'days')
          && dateIsShow != moment(messageDate).format("D.MM.yyyy")){
      diff = messageDate.diff(nowDate, 'days')
      dateIsShow = moment(messageDate).format("D.MM.yyyy")
      return true
    }
  }

  return false
}

export async function forwardMessage(message: IMessage, origonalMessageId: string){
  let result
  switch (message.text) {
    case '[:audio_message:]':
       const audioMessage = await AudioMessage.Get(origonalMessageId)
       result = await AudioMessage.Send({Path: audioMessage.data.path, UserId: message.userId})
      break;

    case '[:image_message:]':
      const imageMessage = await ImageMessage.Get(origonalMessageId)
      result = await ImageMessage.Send({
        sellerId: message.seller,
        userId: message.userId,
        header: imageMessage.data.header,
        description: imageMessage.data.description,
        dbImagePath: ImagesToImagesPathArray(imageMessage.data.imageMessages)
      })
      break;
    case '[:video_message:]':
      const videoMessage = await VideoMessage.Get(origonalMessageId)
      result = await VideoMessage.Send({
        videoPath: videoMessage.data.path,
        title: videoMessage.data.title,
        contactId: message.userId
      })
      break;
    default:
     await Message.Send(message)
     result = {data: message.id}
     break;
  }
  return result.data
}


export function getFullPath(path: string): string{
  return import.meta.env.VITE_APP_BACKEND_PATH + path
}

