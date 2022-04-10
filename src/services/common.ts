import { api } from 'src/boot/axios'

interface UrlString{
  url: string
}

export async function openGraphScrap(url: UrlString){
  return await api.post('api/common/openGraphScrap', url)
}
