declare module "trist-text" {
  import {Chain} from 'trist'
  export function textToChain(text: string, fnNextId: (index: number) => string): Chain;
}
