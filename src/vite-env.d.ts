/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_POCKETBASE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
