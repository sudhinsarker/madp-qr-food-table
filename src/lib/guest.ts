import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStore } from './store';
import { readStored, writeStored } from './storage';
export function useGuest() { const { token } = useParams(); const store = useStore(); const table = store.tables.find(t=>t.token===token); const order = table ? [...store.orders].reverse().find(o=>o.tableId===table.id) : undefined; return { ...store, table, order, base: '/table/'+(table?.token || 'unknown') }; }
export function useCart(token: string) { const [carts,setCarts] = useState<Record<string,Record<string,number>>>(()=>readStored('cart',{})); const cart = carts[token] || {}; const { notify } = useStore(); const change = (id: string, quantity: number) => { const next = {...carts,[token]:{...cart,[id]:Math.max(0,Math.min(30,quantity))}};setCarts(next);if(!writeStored('cart',next))notify('Your choices are kept in this tab. Browser storage is unavailable.'); }; const clear = () => {const next = {...carts,[token]:{}};setCarts(next);writeStored('cart',next);}; return {cart,change,clear}; }
