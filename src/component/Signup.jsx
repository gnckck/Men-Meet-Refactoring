import './SignUp.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [userId,setUserId] = useState("");
    const [userName,setUserName] = useState("");
    const [userPassword,setUserPassword] = useState("");
    const [userPasswordConfirm,setUserPasswordConfirm] = useState("");
    const [idVaild,setIdValid] = useState(false);
    const [nameVaild,setNameValid] = useState(false);
    const [pwVaild,setPwValid] = useState(false);
    const [pwConfirmVaild,setPwConfirmValid] = useState(false);
    const [allowLogin,setAllowLogin] = useState(true);
    const [isCheckIdFirst, setIsCheckIdFirst] = useState(false);
    const [isCheckNameFirst, setIsCheckNameFirst] = useState(false);
    const [isDuplicateId, setIsDuplicateId] = useState(true);
    const [isDuplicateName, setIsDuplicateName] = useState(true);




    const navigate = useNavigate();


        const handleOnKeyId = () => {
            setIsCheckIdFirst(false)
            setIsDuplicateId(true)

        }

        const handleOnKeyName = () => {
            setIsCheckNameFirst(false)
            setIsDuplicateName(true)

        }



        const handleId = (e) => {
                setUserId(e.target.value);
                const idRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{5,20}$/;
                if(idRegex.test(e.target.value)) {
                    setIdValid(true);
                }else{
                    setIdValid(false);
                }
            }



            const handleName = (e) => {
                setUserName(e.target.value);
                const idRegex = /^().{2,10}$/;
                if(idRegex.test(e.target.value)) {
                    setNameValid(true);
                }else{
                    setNameValid(false);
                }
            }

        

        
        const handlePw = (e) => {
            setUserPassword(e.target.value);
            const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
            if(pwRegex.test(e.target.value)) {
                setPwValid(true);
            }else{
                setPwValid(false);
                
            }
        }

        const handlePwConfirm = (e) => {
            setUserPasswordConfirm(e.target.value);
            if(e.target.value === userPassword) {
                setPwConfirmValid(true);
            }else{
                setPwConfirmValid(false);
            }
        }


        useEffect(() => {
            if(idVaild && pwVaild && pwConfirmVaild && nameVaild)  {
                setAllowLogin(false);
                return;
            }
            setAllowLogin(true);
    
        },[idVaild,pwVaild,pwConfirmVaild,nameVaild]);





        const checkDuplicateId = (e) => {
            e.preventDefault();
            

            axios.get('http://52.79.209.184:8080/signup/checkDuplicateId',  {
                params : {userId : userId}
            },{
                headers : {
                    "Content-Type": `application/json`,
                        },
            })
            .then((res) => {
                if(res.data.isDuplicated === true){ // 아이디가 중복이면
                    setIsCheckIdFirst(false);
                    setIsDuplicateId(false);
                
                } else {
                    setIsCheckIdFirst(true);
                    setIsDuplicateId(true);
                }
            })
        }


        



        const checkDuplicateName = (e) => {
            e.preventDefault();

            axios.get('http://52.79.209.184:8080/signup/checkDuplicateName',  {
                params : {userName : userName}
            },{
                headers : {
                    "Content-Type": `application/json`,
                        },
            })
            .then((res) => {
                if(res.data.isDuplicated === true){ // 닉네임이 중복이면
                    setIsCheckNameFirst(false); 
                    setIsDuplicateName(false);
                    
                } else {
                    setIsCheckNameFirst(true);
                    setIsDuplicateName(true);
                    
                }
                
            })
    }


    

       




        const submitHandler = (e) => {
            e.preventDefault();

            if (isCheckIdFirst && isCheckNameFirst){
            axios.post('http://52.79.209.184:8080/signup',{
                    userId : userId,
                    userPassword : userPassword,
                    userName : userName,
                }
            , {
                    headers : { "Content-Type": `application/json`,
                                },
            }
        )
            .then((response) => {
                    console.log(response);

                    console.log("회원가입에 성공했습니다.");
                    alert("회원가입에 성공했습니다.");
                    navigate("/login")
            }).catch((error) => {
                console.log('회원가입에 실패했습니다.',error.response);
                alert("회원가입에 실패했습니다. 다시 시도해주세요.");
            })
            }else if(isCheckIdFirst === false){
                alert('아이디 중복확인을 해주세요.');
            }else if(isCheckNameFirst === false){
                alert('닉네임 중복확인을 해주세요.');
            }
        }
        


  return (

    <Form className="formSignUp" >
        <Form.Label className="titleSignUp">Sign Up</Form.Label>
      <Form.Group className="mb-4" controlId="formUserId">
        <Form.Label>아이디</Form.Label>
        <button className='btnDuplicateId' onClick={checkDuplicateId}>중복확인</button>
        


        <Form.Control className="inputSignUp"
            type="text"
            placeholder ="영문,숫자 포함 5자 이상 입력해주세요"
            value={userId}
            maxLength="19"
            onChange={handleId}
            onKeyUp={handleOnKeyId}
            onKeyDown={handleOnKeyId}
            />

            
            <div className='errorSignUp'>
                {
                    !idVaild && userId.length > 0 ? <p>영문,숫자 포함 5자 이상 입력해주세요</p> : 
                    !isDuplicateId && !isCheckIdFirst ? <p> 이미 사용중인 아이디 입니다.</p> :
                    isDuplicateId && isCheckIdFirst ? <p style={{color:'green'}}>사용 가능한 아이디 입니다.</p> :
	                null
                }
            </div>

            
      </Form.Group>




      <Form.Group className="mb-4" controlId="formUserName">
        <Form.Label>닉네임</Form.Label>
        <button className='btnDuplicateName' onClick={checkDuplicateName} >중복확인</button>
        <Form.Control className="inputSignUp"
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={userName}
            maxLength="9"
            onChange={handleName}
            onKeyDown={handleOnKeyName}
            onKeyUp={handleOnKeyName} />
            
            <div className='errorSignUp'>
                {
                    !nameVaild && ( userName.length > 0 ) ? <p>2자 이상 입력해주세요.</p> :
                    !isCheckNameFirst && !isDuplicateName ? <p> 이미 사용중인 닉네임 입니다.</p> :
                    isCheckNameFirst && isDuplicateName ? <p style={{color:'green'}}>사용 가능한 닉네임 입니다.</p> :
	                null
                }
            </div>



      </Form.Group>

      <Form.Group className="mb-4" controlId="formUserPassword">
        <Form.Label>비밀번호</Form.Label>
        <Form.Control className="inputSignUp"
            type="password"
            placeholder="영문,숫자,특수문자 포함 8자 이상 입력해주세요."
            value={userPassword}
            
            onChange={handlePw}/>
            <div className="errorSignUp">
                 {
                   !pwVaild && userPassword.length > 0 && (
                     <div>영문,숫자,특수문자 포함 8자 이상 입력해주세요.</div>
                 )
                }
                        </div>
      </Form.Group>
      <Form.Group className="mb-4" controlId="SignUp">
        <Form.Label>비밀번호 확인</Form.Label>
        <Form.Control className="inputSignUp"
            type="password"
            placeholder="비밀번호 확인을 위해 한번 더 입력해주세요."
            value={userPasswordConfirm}
            
            onChange={handlePwConfirm}/>
            <div className="errorSignUp">
                 {
                    !pwConfirmVaild && userPasswordConfirm.length > 0 && userPassword !== userPasswordConfirm &&(
                     <div>비밀번호가 맞지않습니다.</div>
                 )
                }
                        </div>
      </Form.Group>
      <Button className="btnSignUp" variant="primary" type="submit" disabled={allowLogin}
            onClick={submitHandler}> Sign Up </Button>
    </Form>
  );
}

export default Signup;