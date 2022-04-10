import { api } from "src/boot/axios";

interface createVideoMessageDto{
  videoPath: string
  title: string
  contactId: string
}

export default class VideoMessage{

  static async Send(dto : createVideoMessageDto){
    return await api.post('api/videomessage', dto)
  }

  static async Get(messageId: string){
    return await api.get(`api/videomessage/${messageId}`)
  }
}
