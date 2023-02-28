import { IMessage } from "./message"

export interface IChat {
  id: string
  chatMessages: Array<IMessage>
}

export interface IContact {
    contactId: string | any,
    userId: string,
    name: string,
    groupId: string,
    chatId: string,
    isMuted: boolean,
    favorite: boolean,
    contactBackGroundImage: string,
    groupName: string,
    nickName: string,
    firstName: string | null,
    lastName: string | null,
    avatar: string | null,
    email: string,
    isOnline: boolean,
    hubConnectionId: string | null,
    userRegistrationDate: string,
    chat: IChat
}