import { api } from 'src/boot/axios';
import { AddAudioMessageDto } from 'src/dtos/addAudioMessage.dto';

export default class AudioMessage{

    static async Send(dto: AddAudioMessageDto){
       return await api.post('api/audiomessage', dto)
    }

    static async Get(messageId: string){
        return await api.get(`api/audiomessage/${messageId}`)
    }
}
