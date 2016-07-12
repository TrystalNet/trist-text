import {Chain, Node, ChainIM} from '@trystal/interfaces'
import {chainify, collapseAll} from '@trystal/trist'

type IdFactory = (n:number) => string
type Splitted = {id:string, leader:string} 

const fnLeaderLen    = (leader:string) => leader.replace(/\t/g,"    ").length
const fnMatchToSplit = (id:string,leader:string,trystup:string) => ({id,leader,trystup})  
const fnSplitOne     = (str:string,idFactory:IdFactory,index:number) => {
  const id = idFactory(index)
  const match = str.match(/^(\s*)(.*$)/)
  if(!match) return fnMatchToSplit(id, '', '')
  const [,leader,trystup] = match
  return fnMatchToSplit(id, leader, trystup) 
}

const fnLevelKeys    = (leaders:string[]) => _.uniq(leaders).sort((a,b) => fnLeaderLen(a)-fnLeaderLen(b))

const fnLevels       = (splitted:Splitted[], levelKeys:string[]) => splitted.reduce((accum, item) => {
  const {id, leader} = item  
  accum[id] = levelKeys.indexOf(leader)
  return accum 
},{})

export function textToChain(text:string, fnNextId:(index:number)=>string) : ChainIM {
  const strs      = text.split(/[\r\n]+/).filter(str => str.length)             
  const splitted  = _.map(strs,(str,index) => fnSplitOne(str, fnNextId, index)) 
  const levelKeys = fnLevelKeys(splitted.map(item => item.leader))              // ["", "  ", "    "]
  const levels    = fnLevels(splitted, levelKeys)                               // [1,0,...]
  const payloads  = splitted.map(({id,trystup}) => ({id,trystup}))              // [{id,trystup},{id,trystup},...]
  const chain     = chainify(payloads, (id:string) => levels[id])         // [{id,next,prev,NV,PV,rlevel},{...},...]
  return collapseAll(chain, id => levels[id])  // {N1:{id,prev,next,PV,NV,rlevel},N2:{...},...}
}

