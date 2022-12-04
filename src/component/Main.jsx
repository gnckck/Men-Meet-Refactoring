import './Main.css';
import { ImDisplay } from "react-icons/im";
import { TfiWrite } from "react-icons/tfi";
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { FcIdea } from "react-icons/fc";


export default function Main() {
    return(
    
        <Container fluid className='inforMenmeet'>
            <Row className="rowMain">
            <Col sm={6} md="auto">
                <h1 className="titleMain">&nbsp;<ImDisplay color='rgb(132, 148, 235)'/> <b>METAVERSE FLATFORM</b></h1><br />
                <p className="contentFlatform">" <b>Men-Meet</b>은 <b>Metaverse Platform</b>을 통해<br />
                    가상공간에서 서일대학교를 간접체험 할 수 있는<br />
                    서비스를 제공하며 서로 부담없이 교류 할 수 있고<br />
                    즐길 수 있는 여러분들의 소통 공간입니다."</p><br /><br />
                <h1 className="titleMain">&nbsp;<TfiWrite color='rgb(132, 148, 235)' size='35'/> <b>MENTORING SERVICE</b></h1><br />
                <p className="contentFlatform">" <b>MENTORING</b> 게시판에서 다양한 카테고리를 통해<br />
                                                                  멘토 또는 멘티가 되어보세요! "</p>
            </Col>
            <Col sm={6}>
                <div className='imgVr'></div>
            </Col>
            </Row>
            <Row>
            <Col>
            <Tabs
                defaultActiveKey="Metaverse"
                id="justify-tab-example"
                className="mb-3"
                fill
                >
                <Tab eventKey="Metaverse" title="Metaverse">
                <div className='tabMetaverse'>
                    <h1 className='titleMeta'><FcIdea /> <b>METAVERSE</b></h1><br />
                    <p className="pMeta"><b>"Men-Meet 메타버스 플랫폼"</b> 은 웹 회원가입으로 쉽게 로그인 가능!<br />
                        캐릭터 선택을 통해 원하는 모습으로 친구들과 함께 채팅을 즐겨보세요!</p>
                </div>
                <Container>
                    <Row className='rowMeta'>
                        <Col><img src="metalogin.png" alt="metalogin" width='300'></img></Col>
                        <Col><img src="metaset.png" alt="metaset" width='300'></img></Col>
                        <Col><img src="lb.png" alt="lobby"  width='300'></img></Col>
                        <Col><img src="cm.png" alt="chat"  width='300'></img></Col>
                    </Row>
                </Container>
                </Tab>

                <Tab className='tabDownload' eventKey="Download" title="Download">
                <a href="http://52.79.209.184:8080/downloadMetaverseClient"><button className='btnDownload'>Metaverse Download</button></a>
                </Tab></Tabs>
            </Col></Row>
        </Container>
)}