import { IdState, modalState, userState } from '../State';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import  {FcSurvey} from 'react-icons/fc';
import  {FcCalendar} from 'react-icons/fc';
import './Modal.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState, useEffect } from 'react';
import { ko } from "date-fns/esm/locale";
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ko';





function Modal() {
 
    const setCloseModal = useSetRecoilState(modalState);
    const [startDate, setStartDate] = useState(new Date());
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [titleValid,setTitleValid] = useState(false);
    const [contentValid,setContentValid] = useState(false);
    const [allowPost, setAllowPost] = useState(false);
    const [postEnable,setPostEnable] = useState("0");
    const [category, setCategory] = useState("0");
    const [isMento, setIsMento] = useState("1");


    const userId = useRecoilValue(IdState);
    const userName = useRecoilValue(userState);
    const writeTime = moment().format('YYYY-MM-DD hh:mm:ss');
    const mentoringTime = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
    
        
    const isModal = () => {
        setCloseModal(false);
    }


    const handleTitle = (e) => {
      e.preventDefault();
      setTitle(e.target.value);
      if(title !== null) {
          setTitleValid(true);
      }else{
          setTitleValid(false);
      }
  }


    const handleContent = (e) => {
    e.preventDefault();
    setContent(e.target.value);
    if(content !== null) {
        setContentValid(true);
    }else{
        setContentValid(false);
    }
  }

    const onCategoryChange = (e) => {
      const {value} = e.target
      setCategory(value)
    }

    const onMentoChange = (e) => {
      const {value} = e.target
      setIsMento(value)
    }


    
    

  useEffect((e) => {
    if(titleValid && contentValid)  {
        setAllowPost(false);
    }else{
    setAllowPost(true);

  }},[titleValid,contentValid]);  

  console.log(
    "writerId :",userId,
    " writerName:",userName,
    "category:",category,
    "mentoringTarget:",isMento,
    "title:",title,
    "content:",content,
    "mentoringEnable:",postEnable,
    "postingTime:",writeTime,
    "mentoringTime:",mentoringTime
  );



    const handleSubmit =() =>{
    axios.post("http://52.79.209.184:8080/mentoringPost/createPost", {
        postNum : "",
        writerId : userId,
        writerName : userName,
        category : category,
        mentoringTarget : isMento,
        title : title,
        content : content,
        mentoringEnable : postEnable,
        postingTime : writeTime,
        mentoringTime : mentoringTime,
      },{
        headers : { "Content-Type": `application/json`, },
       }).then((res) => {
        console.log(res);
        setPostEnable("0");
        alert("게시물이 등록되었습니다.");
       })
        .catch((error) => {
        console.log(error.response);
      })
    }

  

      return (
        <div className="Modal">
          <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <p className="modalWrite">< FcSurvey size="30" /> 멘토링 게시글작성</p><br />
            <select  className='modalCategory' value={category} onChange={onCategoryChange}>
                <option value='0'>전공</option>
                <option value='1'>진로</option>
                <option value='2'>연애</option>
                <option value='3'>학교생활</option>
                <option value='4'>기타</option>
            </select>
            <select className='modalMento' value={isMento} onChange={onMentoChange}>
                <option value='1'>나는 멘토!</option>
                <option value='0'>나는 멘티!</option>
            </select>
            <input className='modalTitle'
                type="text"
                placeholder="제목을 입력해주세요."
                onChange={handleTitle}
            >
            </input>
            <textarea className="modalContent"
                as="textarea"
                rows={12}
                placeholder="내용을 입력해주세요."
                onChange={handleContent}
            >
            </textarea>
            <p className='modalP'> <FcCalendar size="27"/> 멘토링 예약을 위해 날짜와 시간을 선택해주세요.</p>
            <DatePicker
                className='modalDate'
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                locale={ko}                   // 한글로 변경
                timeFormat="HH:mm" //시간 포맷 
                dateFormat="yyyy-MM-dd (eee) hh:mm" // 시간 포맷 변경
                showTimeSelect
                placeholderText="날짜를 선택해주세요."
                showPopperArrow={false}       // 화살표 변경
                minDate={new Date()}          // 오늘 날짜 전은 선택 못하게
                customInput={      // 날짜 뜨는 인풋 커스텀
                <input type="text" style={{width:"440px"}}/>
                } />
                <button className='modalSubmit' onClick={handleSubmit} disabled={allowPost} >등록</button>
          </div>
        </div>
      );
    }
     
    export default Modal;
    