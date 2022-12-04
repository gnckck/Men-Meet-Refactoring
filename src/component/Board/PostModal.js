import './PostModal.css';
import {  useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { IdState, ModifyModalState, PostModalState, postState, userState } from '../State';
import  {FcSurvey} from 'react-icons/fc';
import axios from 'axios';
import ModifyModal from './ModifyModal';




function PostModal() {

    const setCloseModal = useSetRecoilState(PostModalState);
    const postData = useRecoilValue(postState);
    const userId = useRecoilValue(IdState);
    const userName = useRecoilValue(userState);
    const [modifyModalOpen, setModifyModalOpen] = useRecoilState(ModifyModalState);

    


    const isModal = () => {
        setCloseModal(false);
    }

    
    

    const applyMento = (e) => {
      e.preventDefault();
      axios.post(`http://52.79.209.184:8080/reservation/mentoringApplication`,{
        postNum : postData.postNum,
        applicant : userId,
        applyTime :"",
    },{
        headers : { "Content-Type": `application/json`,
    },}
    )
        .then((res) => {
        setCloseModal(false);
        })
        alert("멘토링 신청이 완료되었습니다.")
      }


      const removePost = (e) => {
        e.preventDefault();
        axios.delete(`http://52.79.209.184:8080/mentoringPost/deletePost/${postData.postNum}`)
          .then((res) => {
          setCloseModal(false);
          })
          alert("게시물이 삭제되었습니다.");
        }


        const handleModifyModal = (e) => {
          e.preventDefault();
            setModifyModalOpen(true);
        }


        


    return (
      
        <div className="PostModal" >
          <div className="postModalBody" onClick={(e) => e.stopPropagation()}>
            <button id="postModalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <div className="postModalTitle">< FcSurvey size="30" /> 멘토링 게시글</div><br />
            <div className="postModalProper">
            <b>작성자</b> : {postData.writerName} &emsp;&emsp;
            <b> 카테고리 </b> : {postData.category === 0 ? "전공" :
                                                                  postData.category === 1 ? "진로" :
                                                                  postData.category === 2 ? "연애" :
                                                                  postData.category === 3 ? "학교생활" :
                                                                  postData.category === 4 ? "기타" : null} 
                                                                  </div>
            <hr />
            <div className="postModaltitle"><b>제목</b> : {postData.title}</div>
            <hr />
            <div className="postModalcontent">{postData.content}</div><hr />
            <div className="postModaltime"><b>멘토링 시간</b> : {postData.mentoringTime}</div>
              { postData.writerName === userName ? <button className="moBtn" onClick={handleModifyModal}>수정하기</button> : null }
              {modifyModalOpen && (
              <ModifyModal closeModal={() => setModifyModalOpen(!modifyModalOpen)}>
              </ModifyModal>
              )}
              { postData.writerName === userName ? <button className="removeBtn" onClick={removePost} >삭제하기</button> : null }<br />
              { postData.writerName !== userName ? <button className="apBtn" onClick={applyMento}
                                                            disabled={
                                                            postData.mentoringEnable === false
                                                            }>신청하기</button> : null }
            </div>
        </div>
      
    )

}
     
export default PostModal;
