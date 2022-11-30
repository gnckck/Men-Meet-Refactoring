import { useRecoilValue} from 'recoil';
import './Mypage.css';
import { IdState, userState } from './State';
import { FiUser } from "react-icons/fi";
import { FiEdit } from "react-icons/fi";
import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import axios from 'axios';

function Mypage() {
    const userId = useRecoilValue(IdState);
    const userName = useRecoilValue(userState);

   

    const [writePost,setWritePost] = useState([{
        postNum:"",
        isMentorPost:"",
        title:"",
        wirterTime:"",
    }]);

    const [reservationPost, setReservationPost] = useState([{
        reservationNum:"",
        postNum:"",
        category:"",
        mentorId:"",
        menteeId:"",
        title:"",
        time:"",
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

  


    useEffect(()=> {
        axios.get(`http://52.79.209.184:8080/myPage/myPosts/${userId}`)
        .then((res) =>{
            setWritePost(res.data);
        })
        axios.get(`http://52.79.209.184:8080/myPage/myReservation/${userId}`)
        .then((res) =>{
            setReservationPost(res.data);
        })
        axios.get(`http://52.79.209.184:8080/myPage/myAppliedMentoring/${userId}`)
        .then((res) =>{
            setApply(res.data);
        })
        axios.get(`http://52.79.209.184:8080/myPage/myReceivedMentoring/${userId}`)
        .then((res) =>{
            setRecApply(res.data);
        })

    },[userId]);

    
    

   
    return (
    <div>
    
    <div className="left">
    <div className="postit yellow">
    <div className="tape">내 정보</div>
    <div className="widget-content">
    <p><FiUser /> <b>아이디</b> : &emsp;{userId} </p>
    <p><FiUser /> <b>닉네임</b> : &emsp;{userName} </p>
    <p className='trPwd'>< FiEdit /> 비밀번호 변경</p>
    <p className='witUser'>< FiEdit /> 회원 탈퇴</p>
    </div>
    </div>


    <div className="postit">
    <div className="tape">작성 게시물</div>
    <div className="writePost">
    <Table>
    <thead />
    <tbody>
    {writePost.map((write)=>{
        return(
            <tr key = {write.postNum}>
                <td>{write.postNum}</td>
                <td>{write.title}</td>
                <td>{write.isMentorPost === 0 ? "멘티" : "멘토"}</td>
            </tr>
        )
    })}
    </tbody>
    </Table>
    </div>
    </div>
    </div>
    
    <div className="right">
    <div className="postit blue">
    <div className="tape">멘토링 신청</div>
    <div className="apply">
    <p style={{color: 'red', fontSize: '15px'}}>신청 내역</p>
    <Table>
    <thead>
        <th>예약 번호</th>
        <th>제목</th>
        <th>신청 시간</th>
        <th>상태</th>

    </thead>
    <tbody>
    {apply.map((app)=>{
        return(
            <tr key = {app.subscriptNum}>
                <td>{app.subscriptNum}</td>
                <td>{app.postTitle}</td>
                <td>{app.applyTime}</td>
                <td>{app.state === 0 ? "대기중" :
                     app.state === 1 ? "수락" :
                     "거절"}</td>
            </tr>
        )
    })}
    </tbody>
    </Table><hr />
    <p style={{color: 'red', fontSize: '15px'}}>신청 받은 내역</p>
    <Table>
    <thead>
    <th>예약 번호</th>
        <th>제목</th>
        <th>신청 시간</th>
        <th>상태</th>

    </thead>
    <tbody>
    {recApply.map((rec)=>{
        return(
            <tr key = {rec.subscriptNum}>
                <td>{rec.subscriptNum}</td>
                <td>{rec.postTitle}</td>
                <td>{rec.applyTime}</td>
                <td>{rec.state === 0 ? "대기중" :
                     rec.state === 1 ? "수락" :
                     "거절"}</td>
            </tr>
        )
    })}
    </tbody>
    </Table>
    </div>
    </div>

    <div className="postit pink">
    <div className="tape">예약 내역</div>
    <div className="reservationContent" >
    <Table>
    <thead>
        <th>예약번호</th>
        <th>제목</th>
        <th>멘토</th>
        <th>멘티</th>
        <th>시간</th>
    </thead>
    <tbody>
    {reservationPost.map((reservation)=>{
        return(
            <tr key = {reservation.reservationNum}>
                <td>{reservation.reservationNum}</td>
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
    </div>
    )
};

export default Mypage;