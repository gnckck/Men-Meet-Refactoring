import  {FcSurvey} from 'react-icons/fc';
import  { useState,useEffect } from 'react';
import './DropUserModal.css';
import  { useRecoilValue, useSetRecoilState } from 'recoil';
import  { ChangePwModalState, IdState, loginState } from '../State';
import axios from 'axios';

function ChangePwModal() {


    const [userPassword,setUserPassword] = useState("");
    const setCloseModal = useSetRecoilState(ChangePwModalState);
    const setLoginState = useSetRecoilState(loginState);
    const [allowWritePwd, setAllowWritePwd] = useState(false); // 비밀번호 확인 후 작성하지 못함
    const userId = useRecoilValue(IdState);
    const [changePwVaild,setChangePwValid] = useState(false);
    const [pwConfirmFirst, setPwConfirmFirst] = useState(false); // 변경하기 버튼 클릭시 기존 비밀번호 확인을 했는지 검사
    const [userChangePwd, setUserChangePwd] = useState(""); //변경하려는 비밀번호
    const [allowChange, setAllowChange] = useState(true);


    const handlePw = (e) => {
        e.preventDefault();
        setUserPassword(e.target.value);
        }

        
        
    const handleChangePw = (e) => {
        e.preventDefault();
        setUserChangePwd(e.target.value);
        const pwRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,20}$/;
            if(pwRegex.test(e.target.value)) {
                setChangePwValid(true);
                
            }else{
                setChangePwValid(false);
                
            }
        }


    const isModal = () => {
        setCloseModal(false);
    }


    const rightPassword =() => {
    axios.post(`http://52.79.209.184:8080/myPage/checkPassword`,{
        userId : userId,
        userPassword : userPassword,
    },{
        headers : { "Content-Type": `application/json`, },
    }).then((res)=>{
        if(res.data.isRightPassword === true ){
        alert('비밀번호가 확인되었습니다.');
        setPwConfirmFirst(true);
        setAllowWritePwd(true);
        }else{
        alert('비밀번호를 다시 확인해주세요.');
        setPwConfirmFirst(false);
        setAllowWritePwd(false);
        }
    })
    };


    const handlePwChange =() => {
        axios.post(`http://52.79.209.184:8080/myPage/changePassword`,{
            userId : userId,
            userPassword : userChangePwd,
        },{
            headers : { "Content-Type": `application/json`, },
        }).then((res)=>{
            if(res.data.isChanged === true ){
            alert('비밀번호가 변경되었습니다. 다시 로그인해주세요.');
            setLoginState(false);
            }
        })
    };


    useEffect((e) => {
        if(changePwVaild && pwConfirmFirst === true && userPassword !== userChangePwd)  {
            setAllowChange(false);
            return;
        }
        setAllowChange(true);

    },[changePwVaild,pwConfirmFirst,userPassword,userChangePwd]);




    return(
        <div className="dropModal" onClick={isModal}>
          <div className="changeModalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <p className="dropWrite" >< FcSurvey size="30" /> 비밀번호 변경</p><br />
            <input className='change_pw'
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handlePw}
                disabled={allowWritePwd}
            >
            </input><button className='pwConfirm' onClick={rightPassword} type="submit">확인</button>
            
            <input className='change_pwConfirm'
                type="password"
                placeholder="새 비밀번호를 입력해주세요."
                onChange={handleChangePw}
            >
            </input>

            <div className="errorChangePw">
                 {
                   !changePwVaild && userChangePwd.length > 0 ? 
                    <div>영문,숫자,특수문자 포함 8~20자 이내로 입력해주세요.</div> :
                    allowWritePwd && userChangePwd.length > 0 && userPassword === userChangePwd ?
                    <div>기존 비밀번호와 동일합니다.</div> : null
                }
            </div>
           
                <button className='changeSubmit' type="submit" onClick={handlePwChange} disabled={allowChange} >변경하기</button>
          </div>
        </div>
    )
}

export default ChangePwModal;