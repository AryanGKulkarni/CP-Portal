import React from 'react'
import { Link } from 'react-router-dom'
import {useNavigate} from 'react-router-dom';

export default function Navbar() {
    let navigate = useNavigate();
    const handleLogout = ()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('handle');
      navigate("/login");
    }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" style={{Color: 'red'}}>
        <div className="container-fluid">
            <a className="navbar-brand" href="/">CP-Portal</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/">Home</a>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/Problemset">Problems</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/UpcomingContests">Upcoming Contests</Link>
                    </li>                    
                    <li className="nav-item">
                    <Link className="nav-link" to="/UserProfile">Profile</Link>
                    </li>
                </ul>
                {!localStorage.getItem('token')?<form className="d-flex">
                <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                <Link className="btn btn-primary mx-2" to="/signup" role="button">SignUp</Link>
                </form>: <button onClick={handleLogout} className="btn btn-primary mx-2">Logout</button>}
            </div>
        </div>
    </nav>
  )
}
