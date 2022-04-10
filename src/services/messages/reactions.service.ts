import { AddReactionDto } from 'src/dtos/addReaction.dto';
import { api } from 'src/boot/axios';
import { IReaction } from 'src/types/Reaction';

export default class Reaction{
    static async Add(reaction :AddReactionDto) :Promise<void>{
        await api.post('api/reactions', reaction)
    }

    static async Get(messageId: string){
        return await api.get(`api/reactions/${messageId}`)
    }
}
