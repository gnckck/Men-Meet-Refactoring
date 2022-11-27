import './PostModal.css';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { PostModalState, postState } from '../State';
import  {FcSurvey} from 'react-icons/fc';



function PostModal() {

    const setCloseModal = useSetRecoilState(PostModalState);
    const postData = useRecoilValue(postState);
    


    const isModal = () => {
        setCloseModal(false);
    }





    return (
      
        <div className="PostModal" >
          <div className="postModalBody" onClick={(e) => e.stopPropagation()}>
            <button id="postModalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <div className="postModalTitle">< FcSurvey size="30" /> 멘토링 게시글</div><br />
            <div className="postModalProper"> <b> 카테고리 </b> : {postData.category === 0 ? "전공" :
                                                                  postData.category === 1 ? "진로" :
                                                                  postData.category === 2 ? "연애" :
                                                                  postData.category === 3 ? "학교생활" :
                                                                  postData.category === 4 ? "기타" : null} </div>
            <hr />
            <div className="postModaltitle"><b>제목</b> : {postData.title}</div>
            <hr />
            <div className="postModalcontent">{postData.content}</div><hr />
            <div className="postModaltime"><b>멘토링 시간</b> : {postData.mentoringTime}</div>
            <button className="reBtn">신청하기</button>
            <button className="moBtn">수정하기</button>
            </div>
        </div>
      
    )

}
     
export default PostModal;
