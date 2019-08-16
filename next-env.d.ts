/// <reference types="next" />
/// <reference types="next/types/global" />

declare module 'console' {
  export = typeof import('console')
}
