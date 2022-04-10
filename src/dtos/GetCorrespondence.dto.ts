export class GetCorrespondenceDto{
    readonly Owner: string;
    readonly withWho: string;

    constructor(contact: string, userId: string){
            this.Owner = contact
            this.withWho = userId
    }
}