import { ContactGroup } from "./ContactGroup";
import { IStickerGroup } from "./sticker";

export interface IUser{
    id: string,
    nickName: string,
    firstName: string | null,
    lastName: string | null,
    avatar: string | null,
    email: string,
    isOnline: boolean,
    hubConnectionId: string | null,
    userRegistrationDate: string,
    userBlackLists: Array<BlockUser>
    contactGroups: Array<ContactGroup>
    userStickersGroups: Array<IStickerGroup>
}

export interface BlockUser{
  blockedUser: string
  id: string
}