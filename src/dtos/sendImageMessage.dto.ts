export class AddUserToContactDto{
    readonly sellerId: string;
    readonly userId: string;
    readonly header: string;
    readonly description: string;
    readonly dbImagePath: Array<string>  

    constructor(sellerId: string, userId: string, header: string,
        description: string, dbImagePath: Array<string>){
            this.sellerId = sellerId
            this.userId = userId
            this.header = header
            this.description = description
            this.dbImagePath = dbImagePath
    }
}