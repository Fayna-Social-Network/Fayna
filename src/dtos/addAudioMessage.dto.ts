export class AddAudioMessageDto{
    readonly Path: string;
    readonly UserId: string;

    constructor(Path: string, UserId: string){
            this.Path = Path
            this.UserId = UserId
    }
}