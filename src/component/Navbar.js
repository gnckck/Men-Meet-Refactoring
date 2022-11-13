import React from "react"
import './Navbar.css';
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import { loginState, userState } from './State';
import axios from "axios";


const Navbar = () => {

    const [login, setLogin] = useRecoilState(loginState);
    const [user, setUser] = useRecoilState(userState);
    
    const navigate = useNavigate();



    const handleLogout = (e) => {
        e.preventDefault();

        axios.post('http://52.79.209.184:8080/logout', {
        }, {
            headers : { "Content-Type": `application/json`, },
        })
        .then((res) => {
            console.log(res)
            if(res.data.isLogout === false){
                setLogin(true);
            }else{
                setLogin(false);
                setUser(null);
                localStorage.clear();
                alert('로그아웃 되었습니다.');
                navigate('/login');
            }
            
            
        }).catch((error) => {
            console.log(error.response);
        })
    }

    
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
                        {
                            login ? <Link className="nav-link-login" to="/login">로그인</Link> :
                            <Link onClick={handleLogout}>로그아웃</Link>
                        }   
                    </li>
                    <li className="nav-item-end">
                        {
                            login ? <Link className="nav-link-singup" to="/signup">회원가입</Link> :
                            <Link className="nav-link-mypage" to="/mypage">{user}님</Link>
                        
                        }
                        </li>
                </ul>
            </div>
            </nav> 
    
    )
}

export default Navbar;

