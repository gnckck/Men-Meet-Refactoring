import './Mentoring.css';
import './Paging.css';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import { useState } from 'react';
import { loginState, modalState, PostModalState } from '../State';
import { useRecoilState, useRecoilValue } from 'recoil';
import Modal from './Modal';
import PostModal from './PostModal';
import { FcSearch } from "react-icons/fc";
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsSuitHeartFill } from "react-icons/bs";
import { BsSuitHeart } from "react-icons/bs"



function Mentoring() {

    

    const login = useRecoilValue(loginState);
    
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [category, setCategory] = useState("");
    const [mentoCategory, setMentoCategory] = useState("");
    const [keyword, setKeyword] = useState("");
    const [search, setSearch] = useState("");
    const [modalOpen, setModalOpen] = useRecoilState(modalState);
    const [PostModalOpen, setPostModalOpen] = useRecoilState(PostModalState);
    const [postTotal, setPostTotal] = useState(0);
    

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


    const handlePageChange = (page) => {
    setPage(page);
    };

    const onCategoryChange = (e) => {
      const {value} = e.target
      setCategory(value)
    }

    const onMentoCategoryChange = (e) => {
      const {value} = e.target
      setMentoCategory(value)
    }

    const handleKeyword = (e) => {
      e.preventDefault();
      setKeyword(e.target.value);
    } 

    const handleSearch = (e) => {
      e.preventDefault();
      setSearch(keyword);
    }
  

    


      useEffect(() => {
      axios.post("http://52.79.209.184:8080/mentoringPost/",{
        category : category,
        isMentor : mentoCategory,
        pageNum : page,
        keyword : search,
      },{
        headers : { "Content-Type": `application/json`, },
       }).then((res) => {
         setPostList(res.data);
       })
        .catch((error) => {
        console.log(error.res);
      })
    },[category,mentoCategory,page,search]);
  
    


      const handleModal = (e) => {
        e.preventDefault();
        if(login === true){
          setModalOpen(true);
        }else{
        setModalOpen(false);
        alert('로그인 후 이용해주세요.');
        navigate("/login");
      }}

      const handlePostModal = () => {
        if(login === true){
          setPostModalOpen(true);
        }else{
          setPostModalOpen(false);
        alert('로그인 후 이용해주세요.');
        navigate("/login");
      }}


      useEffect(() => {
      axios.post("http://52.79.209.184:8080/mentoringPost/postCount",{
      },{
        headers : { "Content-Type": `application/json`, },
      }).then((res) => {
        setPostTotal(res.data.total_count);
      })
    },[])


  return(
    <form className="MentoringBoard">
    <div className="container max-w-screen-lg mx-auto">
      <div className="boardHeader">
      
      <select  className='selectCategory' value={category} onChange={onCategoryChange}>
                <option value="">전체</option>
                <option value='0'>전공</option>
                <option value='1'>진로</option>
                <option value='2'>연애</option>
                <option value='3'>학교생활</option>
                <option value='4'>기타</option>
            </select>

      <select className='selectMento' value={mentoCategory} onChange={onMentoCategoryChange}>
        <option value="">구분없음</option>
        <option value='0' >Menti</option>
        <option value='1'>Mento</option>
      </select>

      <input type="text" className='ipSearch' onChange={handleKeyword} />
      <button className='btnSearch' onClick={handleSearch}><FcSearch size="20"/></button>


      <button className='boardWrite' onClick={handleModal}> 글쓰기 </button>
      {modalOpen && (
        <Modal closeModal={() => setModalOpen(!modalOpen)}>
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
                <td className='postTitle'
                    onClick={handlePostModal}   
                >
                  {post.postTitle}
                </td>
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
         
                {PostModalOpen && (
                   <PostModal closePostModal={() => setPostModalOpen(!PostModalOpen)}>
                   </PostModal>
                )}
          
        <div className="boardPage">
        <Pagination
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={postTotal}
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