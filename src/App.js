// import logo from './logo.svg';
import './App.css';
import Carousel from './components/Carousel';
import Navbar from './components/Navbar';
import Problemset from './components/Problemset';
import Rating from './components/Rating';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const DefaultPage = () => {
  return (
    <div>
      <Navbar />
      <Carousel />
      <Rating />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/Problemset" element={<Problemset />} />
      </Routes>
    </Router>
  );
};

export default App;

