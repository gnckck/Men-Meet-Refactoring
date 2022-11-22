import './PostModal.css';
import { useSetRecoilState } from 'recoil';
import { PostModalState } from '../State';
import  {FcSurvey} from 'react-icons/fc';


function PostModal() {

    const setCloseModal = useSetRecoilState(PostModalState);


    const isModal = () => {
        setCloseModal(false);
    }




    return (
        <div className="PostModal" >
          <div className="postModalBody" onClick={(e) => e.stopPropagation()}>
            <button id="postModalCloseBtn" onClick={isModal}>
              ✖
            </button>
            <p className="postModalTitle">< FcSurvey size="30" /> 멘토링 게시글</p><br />
            <p className="postModalProper"> 카테고리 : </p>
            <p className="postModalProper"> 멘토구분 : </p>
            <hr />
            <p>제목</p>
            <hr />
            <p>내용</p><hr />
            <p>멘토링 시간 :</p>
            <button>신청하기</button>
            <button>수정하기</button>
            </div>
        </div>
    )

}
     
export default PostModal;
