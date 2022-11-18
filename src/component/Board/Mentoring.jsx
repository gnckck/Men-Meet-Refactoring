import './Mentoring.css';
import './Paging.css';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { loginState, modalState } from '../State';
import { useRecoilState, useRecoilValue } from 'recoil';
import Modal from './Modal';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs";




function Mentoring() {


    const login = useRecoilValue(loginState);
    
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [postList, setPostList] = useState([{
      postNum:"",
      postTitle:"",
      category:"",
      postIsMentor:"",
      postWriterName:"",
      mentoringTime:"",
      mentoringEnable:"",
      postWriteTime:"",
  }]);


    useEffect(() => {
      axios.post("http://52.79.209.184:8080/mentoringPost/",{
        category : "",
        isMentor : "",
        pageNum : "",
        keyword : "",
      },{
        headers : { "Content-Type": `application/json`, },
       }).then((res) => {
         setPostList(res.data);
       })
        .catch((error) => {
        console.log(error.res);
      })
    },[]);
  

    const handlePageChange = (page) => {
      setPage(page);
      };


      const handleModal = () => {
        if(login === true){
          setModalOpen(true);
        }else{
        setModalOpen(false);
        alert('로그인 후 이용해주세요.');
        navigate("/login");
      }}

    

  return(
    <form className="MentoringBoard">
    <div className="container max-w-screen-lg mx-auto">
      <div className="boardHeader">
      
      <select className='selectCategory'>
          <option key="all">전체</option>
          <option key="major">전공</option>
          <option key="future">진로</option>
          <option key="love">연애</option>
          <option key="school">학교생활</option>
          <option key="other">기타</option>
      </select>

      <select className='selectMento'>
        <option >Mento</option>
        <option >Menti</option>
      </select>
      
      <input type="text" className='ipSearch' />
      <button className='btnSearch'><FcSearch size="20"/></button>


      <button className='boardWrite' onClick={handleModal}> 글쓰기 </button>
      {modalOpen && (
        <Modal closeModal={() => setModalOpen(!modalOpen)}>
        <h1>hello</h1>
        </Modal>
      )}


      </div>
          <Table>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>예약</th>
                <th>작성자</th>
                <th>작성일</th>
              </tr>
            </thead>
            <tbody>
              {postList.map((post) => {
                return(
                <tr key = {post.postNum}>
                <td>{post.postNum}</td>
                <td>{post.postTitle}</td>
                <td>
                  {post.mentoringEnable === true ? <BsSuitHeart color='lightblue'/> :
                   <BsSuitHeartFill color='lightblue' /> } 
                </td>
                <td>{post.postWriterName}</td>
                <td>{post.postWriteTime}</td>
              </tr>
                )
              })}
                
            </tbody>
          </Table>
        <div className="boardPage">
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
          />
      </div>
    </div>
    </form>
  )
}

export default Mentoring;