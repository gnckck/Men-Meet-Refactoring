import  {FcSurvey} from 'react-icons/fc';
import  {FcUnlock} from 'react-icons/fc';
import  { useState } from 'react';
import './DropUserModal.css';
import  { useRecoilValue, useSetRecoilState } from 'recoil';
import  { DropModalState, IdState, loginState } from '../State';
import axios from 'axios';

function DropUser() {


    const [userPassword,setUserPassword] = useState("");
    const setCloseModal = useSetRecoilState(DropModalState);
    const setLoginState = useSetRecoilState(loginState);
    const userId = useRecoilValue(IdState);
    const [allowDrop, setAllowDrop] = useState(true);



    const handlePw = (e) => {
        e.preventDefault();
        setUserPassword(e.target.value);
        if(e.target.value === ""){
        setAllowDrop(true);
        }else{
        setAllowDrop(false);
        }
        }


    const isModal = () => {
        setCloseModal(false);
    }


    const dropUser =(e) => {
    e.preventDefault();
    axios.post(`http://52.79.209.184:8080/myPage/withdrawUser`,{
        userId : userId,
        userPassword : userPassword,
    },{
        headers : { "Content-Type": `application/json`, },
    }).then((res)=>{
        if(res.data.isWithdrawn === true ){
        alert('회원 탈퇴가 완료되었습니다.');
        setLoginState(false);
        }else{
        alert('비밀번호를 다시 입력해주세요.');
        }
    })
    };




    return(
        
        <div className="dropModal" onClick={isModal}>
          <div className="dropModalBody" onClick={(e) => e.stopPropagation()}>
          <form>
            <button id="modalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <p className="dropWrite">< FcSurvey size="30" /> 회원 탈퇴</p><br />
            <p className='drop_p'> <FcUnlock size="27"/> 본인 확인을 위해 비밀번호를 입력해주세요.</p>
            <input className='drop_pw'
                type="password"
                placeholder="비밀번호를 입력해주세요."
                onChange={handlePw}
                required
            >
            </input>
           
           
                <button className='dropSubmit' type="submit" onClick={dropUser} disabled={allowDrop} >탈퇴하기</button>
                </form>
          </div>
        </div>
    )
}

export default DropUser;