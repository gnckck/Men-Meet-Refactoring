import React from "react";
import './Login.css';
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const User = {
    id: 'mentoss1',
    pw: 'mentoss1!'
}


export default function Login() {

    const [idVaild,setIdValid] = useState(false);
    const [pwVaild,setPwValid] = useState(false);
    const [id,setId] = useState('');
    const [pw,setPw] = useState("");


    const [popupStyle, showPopup] = useState("hide");
    const [allowLogin,setAllowLogin] = useState(true);




    useEffect(() => {
        if(idVaild && pwVaild) {
            setAllowLogin(false);
            return;
        }
    setAllowLogin(true);
    },[idVaild,pwVaild]);



    const popup = () => {
        showPopup("login-popup")
        setTimeout(()=> showPopup("hide"),1000)
        if(id === User.id && pw === User.pw) {
            alert("로그인에 성공했습니다.");
        }else{
            showPopup("loginFail-popup")
        }
    }



    const handleId = (e) => {
        setId(e.target.value);
        if(setId.value < 0) {
            setIdValid(false);
        }else{
            setIdValid(true);
        }
    }

    const handlePw = (e) => {
        setPw(e.target.value);
        if(setPw.value < 0) {
            setPwValid(false);
        }else{
            setPwValid(true);
        }
    }
    

    

    return (
        <div className="pageLogin">
            <div style={{textAlign:"center"}}className="titleLogin">
                <h1>Login</h1>
            </div>

            <div className = "contentLogin">
                
                <div className="inputLoginWrap">
                    <input type="text" className="inputLogin" placeholder="ID"
                            value={id}
                            onChange={handleId}/>
                </div>
                <br /><br />

                <div className="inputLoginWrap">
                    <input type="password" className="inputLogin" placeholder="PASSWORD"
                            value={pw}
                            onChange={handlePw} />
                    </div>
            </div>
                <div>
                    <button onClick={popup} className="btnLogin"  disabled={allowLogin} >Login</button>
                </div>
                <Link to="/signUp" className="linkSignUpPage">Sign Up</Link>

                <div className={popupStyle}>
                <h3>일치하는 회원정보가 없습니다.</h3>
        </div>
            
        </div>
    );
}