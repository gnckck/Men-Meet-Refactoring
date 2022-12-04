import './Mypage.css';
import { useState, useEffect } from 'react';
import { FiUser } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { useRecoilValue, useRecoilState, useSetRecoilState } from 'recoil';
import { IdState, userState, DropModalState, ChangePwModalState } from '../State';
import { Table } from 'react-bootstrap';
import axios from 'axios';
import DropUserModal from './DropUserModal';
import ChangePwModal from './ChangePwModal';


function Mypage() {


  const [sliderIdx, setSliderIdx] = useState(0);
  const [dropModalOpen, setDropModalOpen] = useRecoilState(DropModalState);
  const [changeModalOpen, setChangeModalOpen] = useRecoilState(ChangePwModalState);
  const setCloseModal = useSetRecoilState(DropModalState);
  const setPwCloseModal = useSetRecoilState(ChangePwModalState);


    


  const isModal = () => {
      if(dropModalOpen === true){
      setCloseModal(false);
      }else{
      setPwCloseModal(false);
      }
  }

  const [writePost,setWritePost] = useState([{
    postNum:"",
    isMentorPost:"",
    title:"",
    wirterTime:"",
  }]);

  const [apply,setApply] = useState([{
    subscriptNum:"",
    postNum:"",
    isMentor:"",
    postTitle:"",
    applyTime:"",
    state:"",
    }])

    const [recApply,setRecApply] = useState([{
    subscriptNum:"",
    postNum:"",
    isMentor:"",
    postTitle:"",
    applyTime:"",
    state:"",
    }])

    const [reservationPost, setReservationPost] = useState([{
    reservationNum:"",
    postNum:"",
    category:"",
    mentorId:"",
    menteeId:"",
    title:"",
    time:"",
    }]);


    const handleDropModal = (e) => {
        e.preventDefault();
        setDropModalOpen(true);
      }

      const handleChangeModal = (e) => {
        e.preventDefault();
        setChangeModalOpen(true);
      }



  const userId = useRecoilValue(IdState);
  const userName = useRecoilValue(userState);


  useEffect(()=> {
    axios.get(`http://52.79.209.184:8080/myPage/myPosts/${userId}`)
    .then((res) =>{
        setWritePost(res.data);
    })

    axios.get(`http://52.79.209.184:8080/myPage/myAppliedMentoring/${userId}`)
    .then((res) =>{
        setApply(res.data);
    })

    axios.get(`http://52.79.209.184:8080/myPage/myReceivedMentoring/${userId}`)
        .then((res) =>{
            setRecApply(res.data);
        })

        axios.get(`http://52.79.209.184:8080/myPage/myReservation/${userId}`)
        .then((res) =>{
            setReservationPost(res.data);
        })
  },[userId]);



return(
  <div>
              
  <div className="container">
    <div className="tutorial">
      <ul style={{margin:'10px'}} onClick={isModal}>
        <li style={{color:'rgb(132, 148, 235)'}} onClick={() => setSliderIdx(0)}>내 정보</li>
        <li style={{color:'rgb(132, 148, 235)'}} onClick={() => setSliderIdx(1)}> 작성 게시물</li>
        <li style={{color:'rgb(132, 148, 235)'}} onClick={() => setSliderIdx(2)}>신청 내역 </li>
        <li style={{color:'rgb(132, 148, 235)'}} onClick={() => setSliderIdx(3)}>신청 받은 내역</li>
        <li style={{color:'rgb(132, 148, 235)'}} onClick={() => setSliderIdx(4)}>예약 내역</li>
      </ul>

      <div className="slider" style={{transform: `translateX(-${sliderIdx * 100}vh)`}} >
        <div className='Mypage' value= {sliderIdx === 0}>
          <div className="widget-content">
          <p><FiUser /> <b>아이디</b> : &emsp;{userId} </p>
          <p><FiUser /> <b>닉네임</b> : &emsp;{userName} </p>
          <p className='trPwd' onClick={handleChangeModal}>< FiEdit /> 비밀번호 변경</p>
          {changeModalOpen && (
            <ChangePwModal closeModal={() => setChangeModalOpen(!changeModalOpen)}>
            </ChangePwModal>
          )}
          <p className='witUser' onClick={handleDropModal}>< FiEdit /> 회원 탈퇴</p>
          {dropModalOpen && (
            <DropUserModal closeModal={() => setDropModalOpen(!dropModalOpen)}>
            </DropUserModal>
          )}
          </ div>
        </div>

        <div className='Mypage_writePost' value= {sliderIdx === 1}>
        <div className="writePost">
          <Table>
          <thead>
            <tr>
            <th>번호</th>
            <th>제목</th>
            <th>구분</th>
            </tr>
          </thead>
          <tbody>
          {writePost.map((write)=>{
              return(
                  <tr key = {write.postNum}>
                      <td style={{color:'gray'}}>{write.postNum}</td>
                      <td>{write.title}</td>
                      <td>{write.isMentorPost === 0 ? "멘티" : "멘토"}</td>
                  </tr>
              )
          })}
          </tbody>
          </Table>
          </div>
        </div>

        <div className='Mypage_apply' value= {sliderIdx === 2}>
        <div className="apply">
        <Table>
        <thead>
          <tr>
            <th>신청 번호</th>
            <th>제목</th>
            <th>신청 시간</th>
            <th>상태</th>
        </tr>
        </thead>
        <tbody>
        {apply.map((app)=>{
            return(
                <tr key = {app.subscriptNum}>
                    <td style={{color:'gray'}}>{app.subscriptNum}</td>
                    <td>{app.postTitle}</td>
                    <td>{app.applyTime}</td>
                    <td>{app.state === 0 ? "대기중" :
                        app.state === 1 ? "수락" :
                        <div style={{color:'red'}}>거절</div>}</td>
                </tr>
            )
        })}
        </tbody>
        </Table>
        </div>
          </div>


        <div className='Mypage_receive' value= {sliderIdx === 3}>
        <div className="receive">
        <Table>
          <thead>
          <tr>
            <th>신청 번호</th>
              <th>제목</th>
              <th>신청 시간</th>
              <th>상태</th>
          </tr>
          </thead>
          <tbody>
          {recApply.map((rec)=>{
              return(
                  <tr key = {rec.subscriptNum}>
                      <td style={{color:'gray'}}>{rec.subscriptNum}</td>
                      <td>{rec.postTitle}</td>
                      <td>{rec.applyTime}</td>
                      <td>{
                      rec.state === 0 ?
                      <><button className='stateBtn'
                        onClick={() => {
                          axios.post(`http://52.79.209.184:8080/reservation/acceptMentoring`, {
                            requestNum: rec.subscriptNum,
                            receivedUserId: userId,
                          }).then(() => {
                            alert('멘토링 신청을 수락했습니다.');
                            window.location.replace("/mypage");
                          });
                        } }>수락</button><button className='stateBtn'
                          onClick={(e) => {
                            e.preventDefault();
                            axios.get(`http://52.79.209.184:8080/reservation/rejectMentoring/${rec.subscriptNum}`)
                              .then(() => {
                                alert('멘토링 신청을 거절했습니다.');
                                window.location.replace("/mypage");
                              });
                          } }>거절</button></> :
                          rec.state === 1 ? <div>수락</div> : <div style={{color:'red'}}>거절</div> }
                      </td>
                  </tr>
              )
          })}
          </tbody>
      </Table>
          </div>
        </div>

        <div className='Mypage_reserve' value= {sliderIdx === 4}>
        <div className="reservationContent" >
      <Table>
      <thead>
        <tr>
          <th>예약번호</th>
          <th>제목</th>
          <th>멘토</th>
          <th>멘티</th>
          <th>시간</th>
        </tr>
      </thead>
      <tbody>
      {reservationPost.map((reservation)=>{
          return(
              <tr key = {reservation.reservationNum}>
                  <td style={{color:'gray'}}>{reservation.reservationNum}</td>
                  <td>{reservation.title}</td>
                  <td>{reservation.mentorId}</td>
                  <td>{reservation.menteeId}</td>
                  <td>{reservation.time}</td>
              </tr>
          )
      })}
      </tbody>
      </Table>
      </div>
        </div>
      </div>

      <div className="information">
        <p style={{color:'gray', fontSize:'12px', marginLeft:'18em'}}>Copyright 2022. Mentoss. all rights reserved.</p>
      </div>
    </div>
  </div>
      </div>
      )
  }

export default Mypage;