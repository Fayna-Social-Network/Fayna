export type NotificationType = 'message' | 'mail' | 'AddUserToContact' | 'addUserToGroup'

export interface INotification{
  id: string
  type: NotificationType
  author: string
  message: string
  messageId: string
  isRead: boolean,
  timestamp: Date
  userId: string
}