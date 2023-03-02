import { IMessage } from "src/modules/Chat/types/message";
import { useUserContactsStore } from "src/modules/Users/store/UserContacts";
import { api } from 'src/boot/axios';

export async function  setChatMessageIsRead(message: IMessage) {
  const contacts = useUserContactsStore()

  contacts.setChatMessageIsRead(message)
  await api.put(`api/message/isRead/${message.id}`)

}

export function getMessagesByCountAndPage(messages: IMessage[], count: number, page:number) {

  const totalPages = Math.ceil(messages.length / count)
  const startIndex = (page - 1) * count;
  const endIndex = startIndex + count

  const pageMessages = messages.slice(startIndex, endIndex)

  return { pageCount: totalPages, items: pageMessages }
}

export async function addMessageToChat(message: IMessage) {
  const contacts = useUserContactsStore()

  const data = await api.post<string>('/api/Message', message)
  message.id = data.data
  contacts.addMessageToChat(message)

}