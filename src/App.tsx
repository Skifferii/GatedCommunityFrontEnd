
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import ProfilePage from './components/ProfilePage/ProfilePage';
//import HomePage from './components/HomePage/HomePage';
//import RequestsPage from './components/RequestsPage/RequestsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/">Главная</Link>
          <Link to="/profile">Профиль</Link>
          <Link to="/requests">Заявки</Link>
        </nav>
        <Routes>
         {/* <Route path="/" element={<HomePage />} /> */}
          <Route path="/profile" element={<ProfilePage />} />
          {/* <Route path="/requests" element={<RequestsPage />} /> */}
        </Routes>
      </div>
        
    </Router>
  );
}

export default App;