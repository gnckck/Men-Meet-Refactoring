import  {FcSurvey} from 'react-icons/fc';
import  {FcCalendar} from 'react-icons/fc';
import './Modal.css';
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import { useState } from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { IdState, ModifyModalState, postState, userState } from '../State';
import moment from 'moment';
import 'moment/locale/ko';
import axios from 'axios';



function ModifyModal() {

    const [startDate, setStartDate] = useState(new Date());
    
    
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const [category, setCategory] = useState("0");
    const [isMento, setIsMento] = useState("1");
    const [postEnable,setPostEnable] = useState("0");

    const postData = useRecoilValue(postState);
    const writeTime = moment().format('YYYY-MM-DD hh:mm:ss');
    const mentoringTime = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
    
    const setModalClose = useSetRecoilState(ModifyModalState);
    const userId = useRecoilValue(IdState);
    const userName = useRecoilValue(userState);

    
    const closeModal = (e) => {
        e.preventDefault();
        setModalClose(false);
    }


    const handleTitle = (e) => {
        e.preventDefault();
        setTitle(e.target.value);
    
    }
  
  
      const handleContent = (e) => {
      e.preventDefault();
      setContent(e.target.value);
      
        }

    const onCategoryChange = (e) => {
        setCategory(e.target.value)
      }
  
      const onMentoChange = (e) => {
        setIsMento(e.target.value)
      }





      const handleModify =(e) =>{
        e.preventDefault();
        axios.post("http://52.79.209.184:8080/mentoringPost/updatePost", {
            postNum : postData.postNum,
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
            setModalClose(false);
           })
            alert("게시글이 수정되었습니다.")
        }

    

return (
    <div className="Modal">
      <div className="modalBody" onClick={(e) => e.stopPropagation()}>
        <button id="modalCloseBtn" onClick={closeModal}>
          ✖
        </button>
        <p className="modalWrite">< FcSurvey size="30" /> 멘토링 게시글작성</p><br />
        <select  className='modalCategory' defaultValue={postData.category} onChange={onCategoryChange} >
            <option value='0'>전공</option>
            <option value='1'>진로</option>
            <option value='2'>연애</option>
            <option value='3'>학교생활</option>
            <option value='4'>기타</option>
        </select>
        <select className='modalMento' defaultValue={postData.postIsMentor === true ? '1' : '0'} onChange={onMentoChange}>
            <option value='1'>나는 멘토!</option>
            <option value='0'>나는 멘티!</option>
        </select>
        <textarea className='modalTitle' onChange={handleTitle}
        defaultValue={postData.title}
        >
        </textarea>
        <textarea className="modalContent"
            as="textarea"
            rows={12}
            onChange={handleContent}
            defaultValue={postData.content}
        >
        </textarea>
        <p className='modalP' style={{color:'red'}}> <FcCalendar size="27"/> 멘토링 예약 날짜와 시간을 다시 선택해주세요.</p>
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
            <button className='modalSubmit' onClick={handleModify} >수정</button>
      </div>
    </div>
  );
}

 
export default ModifyModal;