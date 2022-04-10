export class AddReactionDto{
    readonly MessageId: string;
    readonly ReactionName: string;

    constructor(MessageId: string, Reaction: string){
            this.MessageId = MessageId
            this.ReactionName = Reaction
    }
}