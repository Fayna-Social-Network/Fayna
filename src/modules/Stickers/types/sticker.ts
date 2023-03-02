export interface ISticker{
    id: string,
    name: string,
    path: string,
}

export interface IStickerGroup{
  id: string
  name: string,
  stickers: Array<ISticker>
}