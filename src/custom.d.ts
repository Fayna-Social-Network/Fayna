import  mainOidc from 'src/oidc-client/settings';
import { IAsyncComponents } from 'components/AsyncComponents'

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
    $asyncComponents: IAsyncComponents
  }
}
