import { Order } from './types';
// Apply only changed order fields, retaining updates received from another tab.
export function mergeOrders(before: Order[], requested: Order[], latest: Order[]): Order[] {
 const result=[...latest];
 for(const next of requested){
  const previous=before.find(o=>o.id===next.id);
  if(previous && JSON.stringify(previous)===JSON.stringify(next))continue;
  const index=result.findIndex(o=>o.id===next.id);
  if(!previous){const sameTable=result.findIndex(o=>o.tableId===next.tableId&&!o.paid);if(sameTable>=0){const current=result[sameTable];const batch=Math.max(0,...current.lines.map(l=>l.batch))+1;result[sameTable]={...current,lines:[...current.lines,...next.lines.map(l=>({...l,batch}))]};continue;}const id=index>=0?Math.max(10430,...result.map(o=>o.id))+1:next.id;result.push({...next,id});continue;}
  if(index<0){result.push(next);continue;}
  const current=result[index];
  const added=next.lines.filter(l=>!previous.lines.some(old=>old.id===l.id));
  if(current.paid&&added.length){result.push({...next,id:Math.max(10430,...result.map(o=>o.id))+1,lines:added.map(l=>({...l,batch:0})),paid:false,payment:'none'});continue;}
  const lines=[...current.lines];
  for(const line of next.lines){const old=previous.lines.find(l=>l.id===line.id);if(old&&JSON.stringify(old)===JSON.stringify(line))continue;const position=lines.findIndex(l=>l.id===line.id);if(position<0)lines.push(line);else lines[position]={...lines[position],...line};}
  result[index]={...current,lines,paid:next.paid!==previous.paid?next.paid:current.paid,payment:next.payment!==previous.payment?next.payment:current.payment,note:next.note!==previous.note?next.note:current.note};
 }
 return result;
}
