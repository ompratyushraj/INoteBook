import React , { useEffect } from 'react'
import { Link } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  let location = useLocation();
  // useEffect(() => {
  //   console.log(location.pathname);
  // }, [location]);
  let navigate = useNavigate();
  const handleLogout= () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

return (
  <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
            <Link className="navbar-brand" to="/home">iNotebook</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item">
                <Link className={`nav-link  ${location.pathname=="/"? "active": ""}`} aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                <Link className={`nav-link ${location.pathname=="/about"? "active": ""}`} to="/about">About</Link>
                </li>
            </ul>
                {!localStorage.getItem('token')?<form className="d-flex">
                <Link className="btn btn-secondary me-2" role="button" to="/login">LogIn</Link>
                <Link className="btn btn-primary me-2" role="button" to="/signup">SignUp</Link>
                </form> : <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                }
            </div>
        </div>
    </nav>
    </>
  )
}

export default Navbar;
