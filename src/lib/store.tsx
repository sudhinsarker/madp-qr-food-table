import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import menuData from '../data/menu.json';
import tableData from '../data/tables.json';
import orderData from '../data/orders.json';
import { MenuItem, Table, Order, Session, total } from './types';
import { readStored, writeStored } from './storage';
import { canManage } from './permissions';
import { mergeOrders } from './mergeOrders';
type Store = { menu: MenuItem[]; tables: Table[]; orders: Order[]; session: Session | null; notice: string; notify: (text: string) => void; saveMenu: (items: MenuItem[]) => void; saveTables: (tables: Table[]) => void; saveOrders: (orders: Order[]) => boolean; signIn: (session: Session | null) => void };
const Context = createContext<Store | null>(null);
export function StoreProvider({ children }: { children: ReactNode }) {
 const [menu, setMenu] = useState<MenuItem[]>(() => readStored('menu', menuData));
 const [tables, setTables] = useState<Table[]>(() => readStored('tables', tableData));
 const [orders, setOrders] = useState<Order[]>(() => readStored('orders', orderData as Order[]));
 const [session, setSession] = useState<Session | null>(() => readStored('session', null));
 const [notice, notify] = useState('');
 const [storageIssue,setStorageIssue] = useState(false);
 useEffect(()=>{if(!notice)return;const timeout=window.setTimeout(()=>notify(''),6000);return ()=>window.clearTimeout(timeout);},[notice]);
 const persist = (key: string, data: unknown) => { if (!writeStored(key, data)) setStorageIssue(true); };
 const saveMenu = (items: MenuItem[]) => { if(!canManage(session)){notify('Manager access required.');return;} setMenu(items); persist('menu', items); };
 const saveTables = (items: Table[]) => { if(!canManage(session)){notify('Manager access required.');return;} setTables(items); persist('tables', items); };
 const saveOrders = (items: Order[]) => { const latest=readStored<Order[]>('orders',orders); if(items.some(next=>next.paid&&!orders.find(o=>o.id===next.id)?.paid&&latest.some(o=>o.id===next.id&&total(o.lines)!==total(next.lines)))){setOrders(latest);notify('The order changed. Review the updated total before confirming payment.');return false;} const merged=mergeOrders(orders,items,latest); setOrders(merged); persist('orders', merged); return true; };
 useEffect(()=>{const sync=()=>{setMenu(current=>readStored('menu',current));setTables(current=>readStored('tables',current));setOrders(current=>readStored('orders',current));};window.addEventListener('storage',sync);window.addEventListener('focus',sync);return ()=>{window.removeEventListener('storage',sync);window.removeEventListener('focus',sync);};},[]);
 const signIn = (value: Session | null) => { setSession(value); persist('session', value); };
 return <Context.Provider value={{menu,tables,orders,session,notice,notify,saveMenu,saveTables,saveOrders,signIn}}>{storageIssue&&<div className="storage-warning" role="alert">Your changes are only available in this tab. Keep this page open; your browser could not save them.</div>}{children}{notice && <div className="toast" role="status"><span>{notice}</span><button aria-label="Dismiss notification" onClick={() => notify('')}>×</button></div>}</Context.Provider>;
}
export function useStore() { const store = useContext(Context); if (!store) throw new Error('Store is required'); return store; }
