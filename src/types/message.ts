export interface IMessage{
    id: string,
    text: string,
    seller: string,
    isRead: boolean,
    timestamp: Date,
    userId: string
}