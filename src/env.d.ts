/* eslint-disable */
/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_APP_BACKEND_PATH          : string
  readonly VITE_APP_IDENTITY_SERVER_PATH  : string 
  readonly VITE_APP_PATH                  : string
  readonly VITE_SERVER_HUB_URL            : string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: 'hash' | 'history' | 'abstract' | undefined;
    VUE_ROUTER_BASE: string | undefined;
  }
}
