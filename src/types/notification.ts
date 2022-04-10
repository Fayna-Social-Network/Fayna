import { NotificationType } from "./types";

export interface INotification{
  type: NotificationType
  author: string
  message: string
  messageId: string
  isRead: boolean,
  timestamp: Date
}