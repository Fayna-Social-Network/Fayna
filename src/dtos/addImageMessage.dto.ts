export default interface CreateImageMessageDto{
    sellerId: string,
    userId: string,
    header: string,
    description: string,
    dbImagePath: Array<string>
}