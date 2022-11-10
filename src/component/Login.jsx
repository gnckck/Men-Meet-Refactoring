import React from "react";
import './Login.css';
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useSetRecoilState } from "recoil";
import { loginState, userState} from './State';



export default function Login() {


    const navigate = useNavigate();

    const [idVaild,setIdValid] = useState(false);
    const [pwVaild,setPwValid] = useState(false);
    const [userId,setUserId] = useState('');
    const [userPassword,setUserPassword] = useState("");

    const setLogin = useSetRecoilState(loginState);
    const setUser = useSetRecoilState(userState);



    

    const [popupStyle, showPopup] = useState("hide");
    const [allowLogin,setAllowLogin] = useState(true);


    



    useEffect(() => {
        if(idVaild && pwVaild) {
            setAllowLogin(false);
            return;
        }
    setAllowLogin(true);
    },[idVaild,pwVaild]);



    



    const handleId = (e) => {
        setUserId(e.target.value);
        if(setUserId.value < 0) {
            setIdValid(false);
        }else{
            setIdValid(true);
        }
    }

    const handlePw = (e) => {
        setUserPassword(e.target.value);
        if(setUserPassword.value < 0) {
            setPwValid(false);
        }else{
            setPwValid(true);
        }
    }
    

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://52.79.209.184:8080/login', {
            userId : userId,
            userPassword : userPassword
        }, {
            headers : { "Content-Type": `application/json`, },
        })
        .then((res) => {
            console.log(res)
            if(res.data.isLoginConfirmed === true){
            setLogin(true);
            setUser(res.data.userName);
            alert((res.data.userName) + `님 Men-Meet에 어서오세용~!`)
            navigate("/");}
            else{
                setLogin(false);
                setTimeout(()=> showPopup("hide"),1000)
                showPopup("loginFail-popup")
            }
        }).catch((error) => {
            console.log('로그인 실패,',error.response);
        })
    }

    

    return (
        <div className="pageLogin">
            <div style={{textAlign:"center"}}className="titleLogin">
                <h1>Login</h1>
            </div>

            <div className = "contentLogin">
                
                <div className="inputLoginWrap">
                    <input type="text" className="inputLogin" placeholder="ID"
                            value={userId}
                            onChange={handleId}/>
                </div>
                <br /><br />

                <div className="inputLoginWrap">
                    <input type="password" className="inputLogin" placeholder="PASSWORD"
                            value={userPassword}
                            onChange={handlePw} />
                    </div>
            </div>
                <div>
                    <button onClick={handleLogin} className="btnLogin"  disabled={allowLogin} >Login</button>
                </div>
                <Link to="/signUp" className="linkSignUpPage">Sign Up</Link>

                <div className={popupStyle}>
                <h3>일치하는 회원정보가 없습니다.</h3>
                </div>

        </div>
       
    );
}