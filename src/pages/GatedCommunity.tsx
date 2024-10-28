import { Route, Routes, Link } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import RequestsPage from './RequestsPage/RequestsPage';
import OfferedServicesPage from './OfferedServicesPage/OfferedServicesPage';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import AddressesPage from './AddressesPage/AddressesPage';
import AdminRoute from '../components/AdminRoute/AdminRoute';
import './GatedCommunity.css'; // Подключаем стили
import getUserRole from '../components/getUserRole/getUserRole';


function GatedCommunity() {
    const isAdmin = getUserRole() === 'admin';

    return (
        <div className="gated-community">
            <nav className="navigation">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/profile" className="nav-link">Профиль</Link>
                <Link to="/requests" className="nav-link">Requests</Link>                              
                {/* Показывать ссылку "Addresses services" только если пользователь администратор */}
                {isAdmin && <Link to="/services" className="nav-link">Service</Link>}
                {isAdmin && <Link to="/Adreses" className="nav-link">Addresses</Link>} 
                             </nav>
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/requests" element={<RequestsPage />} />
                    <Route path="/services" element={<OfferedServicesPage />} />
                    <Route 
                        path="/Adreses" 
                        element={
                            <AdminRoute isAdmin={isAdmin}>
                                <AddressesPage />
                            </AdminRoute>
                        } 
                    />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default GatedCommunity;
