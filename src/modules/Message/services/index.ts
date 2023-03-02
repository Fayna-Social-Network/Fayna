import isURL from 'validator/es/lib/isUrl'

export function GetTypeOfMessage(message :string){
    if(message.startsWith('$[]:')){
       return "StickerMessage"
    }
    if(message === '[:audio_message:]'){
      return 'AudioMessage'
    }
    if(message === '[:image_message:]'){
      return 'ImagesMessage'
    }
    if(message.startsWith('<code>')){
      return 'CodeMessage'
    }
    if(isURL(message)){
      return 'OpenGraphMessage'
    }
    if(message === '[message_delete]'){
      return 'DelMessage'
    }
    if(message === '[:video_message:]'){
      return 'VideoMessage'
    }
   return 'TextMessage'

}