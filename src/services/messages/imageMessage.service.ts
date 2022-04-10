import CreateImageMessageDto from 'src/dtos/addImageMessage.dto';
import { api } from 'src/boot/axios';
import messageAlbum from 'src/types/messageAlbum';

interface ImageAlbumResponse{
    data: messageAlbum
}


export default class ImageMessage{

    static async Send(dto: CreateImageMessageDto){
       return await api.post('api/imagesmessage', dto)
    }

    static async Get(messageId: string): Promise<ImageAlbumResponse>{
        return await api.get(`api/imagesmessage/${messageId}`)
    }
}
