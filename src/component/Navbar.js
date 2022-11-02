import React from "react"
import './Navbar.css';
import { Link } from "react-router-dom";


const Navbar = () => {
    return (

        <nav className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Men-Meet</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="nav justify-content-center" id="navbarNav">
                <ul className="navbar-nav">

                    <li className="nav-item">
                    <Link className="nav-link" to="/program">Program</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/mentoring">Mentoring</Link>
                    </li>
                    <li className="nav-item">
                    <Link className="nav-link" to="/mypage">MyPage</Link>
                    </li>
                </ul>
                </div>
                <ul className="nav justify-content-end">
                    <li className="nav-item-end">
                        <Link className="nav-link-login" to="/login">로그인</Link>
                    </li>
                    <li className="nav-item-end">
                        <Link className="nav-link-singup" to="/signup">회원가입</Link>
                    </li>
                </ul>
            </div>
            </nav> 
    
    )
};

export default Navbar;

