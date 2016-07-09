declare module "@trystal/trist-text" {
  import {Chain} from '@trystal/trist'
  export function textToChain(text: string, fnNextId: (index: number) => string): Chain;
}
