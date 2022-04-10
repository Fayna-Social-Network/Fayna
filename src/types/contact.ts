export interface IContact{
    contactId: string | any,
    userId: string,
    name: string,
    groupId: string,
    groupName: string,
    nickName: string,
    firstName: string | null,
    lastName: string | null,
    avatar: string | null,
    email: string,
    isOnline: boolean,
    hubConnectionId: string | null,
    userRegistrationDate: string
}