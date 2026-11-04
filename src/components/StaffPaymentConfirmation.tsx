import { Order, total } from '../lib/types';
import { amount, reference } from '../lib/facts';
import { useStore } from '../lib/store';
import Dialog from './Dialog';
export default function StaffPaymentConfirmation({ order, close }: { order: Order; close: () => void }) { const {orders,saveOrders,notify}=useStore();return <Dialog title="Confirm payment received" close={close}><p>Confirm only after you have received {amount(total(order.lines))} for {reference(order.id)}.</p><div className="notice"><strong>Order total · {amount(total(order.lines))}</strong><p>This records the payment received by your team.</p></div><button className="primary full" onClick={()=>{const saved=saveOrders(orders.map(o=>o.id===order.id?{...o,paid:true,payment:'staff'}:o));if(!saved){close();return;}notify('Payment confirmed for '+reference(order.id)+'.');close();}}>Payment received · {amount(total(order.lines))}</button><button className="secondary full" onClick={close}>Not yet</button></Dialog>;}
