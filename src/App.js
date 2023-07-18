// import logo from './logo.svg';
import './App.css';
import Carousel from './components/Carousel';
import Navbar from './components/Navbar';
import Problemset from './components/Problemset';
// import Rating from './components/Rating';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpcomingContests from './components/UpcomingContests';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Signup from './components/Signup';

const DefaultPage = () => {
  return (
    <div>      
      <Carousel />
    </div>
  );
};

function App() {
  return (    
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Problemset" element={<Problemset />} />
        <Route path="/UpcomingContests" element={<UpcomingContests />} />
        <Route path="/UserProfile" element={<UserProfile name={localStorage.getItem('name')} handle={localStorage.getItem('handle')} />} />
      </Routes>
    </Router>
  );
};

export default App;

