export class AddUserToContactDto{
    readonly contact: string;
    readonly userId: string;
    readonly name: string;
    readonly groupId: string;

    constructor(contact: string, userId: string, name: string, groupId: string){
            this.contact = contact
            this.userId = userId
            this.name = name
            this.groupId = groupId 
    }
}