import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useStore } from '../lib/store';
import { facts } from '../lib/facts';
import { canManage } from '../lib/permissions';
export default function StaffLayout({ children }: { children: ReactNode }) {
 const { session, signIn } = useStore();
 return <div className="workspace"><aside className="sidebar"><Link className="brand" to="/staff/orders">RestroQR</Link><div className="restaurant">{facts.restaurant}</div><nav aria-label="Workspace"><NavLink to="/staff/orders">Orders</NavLink>{canManage(session)&&<><NavLink to="/staff/menu">Menu</NavLink><NavLink to="/staff/tables">Tables & QR</NavLink></>}</nav><div className="sidebar-bottom"><small>{session?.role || 'Staff'} workspace</small><p>{session?.name || 'Maya Rahman'}</p><Link to="/">Customer menu ↗</Link>{session && <button className="text-button light" onClick={() => signIn(null)}>Sign out</button>}</div></aside><main className="workspace-main">{children}</main></div>;
}
