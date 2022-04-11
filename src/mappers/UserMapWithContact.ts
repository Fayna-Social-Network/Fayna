import { ContactGroup } from '@/types/ContactGroup';
import { IContact } from '../types/contact';
import {IUser} from '../types/user'

export default function (contactId: string, user: IUser, 
      contactName :string, Group: ContactGroup): IContact {
    const Contact: IContact = {
        contactId: contactId,
        userId: user.id,
        name: contactName,
        groupId: Group.id,
        groupName: Group.groupName,
        nickName: user.nickName,
        avatar: user.avatar,
        isOnline: user.isOnline,
        hubConnectionId: user.hubConnectionId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userRegistrationDate: user.userRegistrationDate
    }

    return Contact
}