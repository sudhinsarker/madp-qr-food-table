import { ReactNode } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useStore } from '../lib/store';
import { canManage, canReceiveOrders } from '../lib/permissions';
import StaffLayout from './StaffLayout';
export default function StaffAccess({ children, management=false }: { children: ReactNode; management?: boolean }) {const {session}=useStore();if(!canReceiveOrders(session))return <Navigate replace to="/staff/sign-in"/>;return <StaffLayout>{management&&!canManage(session)?<><h1>Manager access required</h1><div className="panel"><p>You don’t have permission to change menus or tables. Ask your manager for access.</p><Link className="primary" to="/staff/orders">Return to orders</Link></div></>:children}</StaffLayout>;}
