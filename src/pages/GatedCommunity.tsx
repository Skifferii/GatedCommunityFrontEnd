import { Route, Routes, Link } from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import RequestsPage from './RequestsPage/RequestsPage';
import OfferedServicesPage from './OfferedServicesPage/OfferedServicesPage';
import HomePage from './HomePage/HomePage';
import LoginPage from './LoginPage/LoginPage';
import RegisterPage from './RegisterPage/RegisterPage';
import './GatedCommunity.css'; // Подключаем стили
import AddressesPage from './AddressesPage/AddressesPage';

function GatedCommunity() {
    return (
        <div className="gated-community">
            <nav className="navigation">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/profile" className="nav-link">Профиль</Link>
                <Link to="/requests" className="nav-link">Requests</Link>
                <Link to="/services" className="nav-link">Service</Link>         
                <Link to="/Adreses" className="nav-link">Adreses</Link>         
            </nav>
            <div className="content">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/requests" element={<RequestsPage />} />
                    <Route path="/services" element={<OfferedServicesPage />} />
                    <Route path="/Adreses" element={<AddressesPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </div>
    );
}

export default GatedCommunity;


