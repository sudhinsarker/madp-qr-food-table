import { Navigate } from 'react-router-dom';
import { useStore } from '../lib/store';
import { Link } from 'react-router-dom';
export default function HomePage(){const {tables}=useStore();const table=tables.find(t=>t.id==='t12') || tables[0];return table?<Navigate replace to={'/table/'+table.token+'/menu'}/>:<main className="customer"><header className="customer-header"><small>Olive & Ember</small><h1>Welcome to our table.</h1></header><div className="customer-body"><div className="notice"><strong>Our tables are being set up</strong><p>Please ask a member of our team for help.</p></div><Link className="secondary full" to="/staff/sign-in">Staff sign in</Link></div></main>;}
