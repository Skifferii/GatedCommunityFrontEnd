import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ProfilePage from './ProfilePage/ProfilePage';
import RequestsPage from './RequestsPage/RequestsPage';


//import HomePage from './components/HomePage/HomePage';
function GatedCommunity () {
    
  return (
    <Router>
      <div className="GatedCommunity">
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/requests">Заявки</Link>
        </nav>
        <Routes>
         {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/requests" element={<RequestsPage />} />
        </Routes>
      </div>
        
    </Router>
  );

}
export default GatedCommunity;