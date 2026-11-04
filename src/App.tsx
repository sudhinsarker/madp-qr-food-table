import { Route, Routes } from 'react-router-dom';
import { StoreProvider } from './lib/store';
import StaffAccess from './components/StaffAccess';
import SignInPage from './pages/SignInPage';
import StaffOrdersPage from './pages/StaffOrdersPage';
import TableOrderPage from './pages/TableOrderPage';
import ReviewExtrasPage from './pages/ReviewExtrasPage';
import PaymentChoicePage from './pages/PaymentChoicePage';
import PayStaffPage from './pages/PayStaffPage';
import PhonePaymentPage from './pages/PhonePaymentPage';
import ManageMenuPage from './pages/ManageMenuPage';
import ManageTablesPage from './pages/ManageTablesPage';
import BrowsePage from './pages/BrowsePage';
import HomePage from './pages/HomePage';
export default function App() { return <StoreProvider><Routes><Route path="/" element={<HomePage />} /><Route path="/table/:token/menu" element={<BrowsePage />} /><Route path="/table/:token/order" element={<TableOrderPage />} /><Route path="/table/:token/review" element={<ReviewExtrasPage />} /><Route path="/table/:token/pay" element={<PaymentChoicePage />} /><Route path="/table/:token/staff-payment" element={<PayStaffPage />} /><Route path="/table/:token/phone" element={<PhonePaymentPage />} /><Route path="/staff/sign-in" element={<SignInPage />} /><Route path="/staff/menu" element={<StaffAccess management><ManageMenuPage /></StaffAccess>} /><Route path="/staff/tables" element={<StaffAccess management><ManageTablesPage /></StaffAccess>} /><Route path="/staff/orders" element={<StaffAccess><StaffOrdersPage /></StaffAccess>} /><Route path="*" element={<HomePage />} /></Routes></StoreProvider>; }
