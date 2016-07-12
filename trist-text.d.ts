declare module "@trystal/trist-text" {
  import {ChainIM} from '@trystal/interfaces'
  export function textToChain(text: string, fnNextId: (index: number) => string): ChainIM;
}
