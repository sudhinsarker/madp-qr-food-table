import { Session } from './types';
export const canManage = (session: Session | null) => session?.role === 'owner' || session?.role === 'manager';
export const canReceiveOrders = (session: Session | null) => !!session && ['owner','manager','staff'].includes(session.role);
