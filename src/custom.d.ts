import  mainOidc from 'src/oidc-client/settings';


declare module '@vue/runtime-core' {


  interface ComponentCustomProperties {
    $refs: {
      audioPlayer: HTMLAudioElement,
      recorded: HTMLVideoElement,
      gumVideo: HTMLVideoElement,
      codecSelect: HTMLSelectElement,
      win: HTMLDivElement
      files: {
        files: File[]
      }
    },
    $oidc: typeof mainOidc,
    
  }
}
