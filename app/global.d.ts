interface Window {
  ethereum: ExternalProvider;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NEXT_PUBLIC_ALCHEMY_API: string;
  }
}
