import { modalState } from '../State';
import { useSetRecoilState } from 'recoil';
import  {FcSurvey} from 'react-icons/fc';
import  {FcCalendar} from 'react-icons/fc';
import './Modal.css';
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from 'react';
import { ko } from "date-fns/esm/locale";




function Modal() {
 
    const setCloseModal = useSetRecoilState(modalState);
    const [startDate, setStartDate] = useState(new Date());
    

    
        
    const isModal = () => {
        setCloseModal(false);
    }



     
    


      return (
        <div className="Modal">
          <div className="modalBody" onClick={(e) => e.stopPropagation()}>
            <button id="modalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <Form>
            <Form.Label className="modalWrite">< FcSurvey size="30" /> 멘토링 게시글작성</Form.Label><br />
            <select className='modalCategory' required>
                <option>전공</option>
                <option>진로</option>
                <option>연애</option>
                <option>학교생활</option>
                <option>기타</option>
            </select>
            <select className='modalMento' required>
                <option>나는 멘토!</option>
                <option>나는 멘티!</option>
            </select>
            <Form.Control className='modalTitle'
                required 
                type="text"
                placeholder="제목을 입력해주세요."
                
            >
            </Form.Control>
            <Form.Control className="modalContent"
                required
                as="textarea"
                rows={12}
                placeholder="내용을 입력해주세요."

            >
            </Form.Control>
            <p className='modalP'> <FcCalendar size="27"/> 멘토링 예약을 위해 날짜와 시간을 선택해주세요.</p>
            <DatePicker
                className='modalDate'
                required
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                locale={ko}                   // 한글로 변경
                timeFormat="HH:mm" //시간 포맷 
                dateFormat="yyyy.MM.dd (eee) h:mm aa" // 시간 포맷 변경
                showTimeSelect
                placeholderText="날짜를 선택해주세요."
                showPopperArrow={false}       // 화살표 변경
                minDate={new Date()}          // 오늘 날짜 전은 선택 못하게
                customInput={		      // 날짜 뜨는 인풋 커스텀
                <Form.Control type="text" style={{width:"440px"}}/>
                }  />
                <button className='modalSubmit' >등록</button>
            </Form>
          </div>
        </div>
      );
    }
     
    export default Modal;
    