import Images from "./Images";

export default interface messageAlbum{
    id: string,
    header: string,
    description: string,
    messageId: string,
    imageMessages: Array<Images>
}