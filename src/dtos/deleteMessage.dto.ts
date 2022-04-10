import { IMessage } from "../types/message";


export class DeleteMessageDto{
    readonly message: IMessage;
    readonly contactId: string;

    constructor(message: IMessage, contactId: string){
            this.message = message
            this.contactId = contactId
    }
}