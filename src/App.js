// import logo from './logo.svg';
import './App.css';
import Carousel from './components/Carousel';
import Navbar from './components/Navbar';
import Problemset from './components/Problemset';
// import Rating from './components/Rating';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpcomingContests from './components/UpcomingContests';
import UserProfile from './components/UserProfile';

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
        <Route path="/Problemset" element={<Problemset />} />
        <Route path="/UpcomingContests" element={<UpcomingContests />} />
        <Route path="/UserProfile" element={<UserProfile name="Aryan Kulkarni" handle="ishaan" />} />
      </Routes>
    </Router>
  );
};

export default App;

