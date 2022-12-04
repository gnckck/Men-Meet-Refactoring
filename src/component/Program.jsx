import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';


function Program() {
  return (
    <div className='tabProgram' style={{marginTop:'7em',marginLeft:'20em',marginBottom:'7em',width:'1200px'}}>
    <Tab.Container id="left-tabs-example" defaultActiveKey="first" >
      <Row>
        <Col sm={3}>
          <Nav variant="pills" className="flex-column">
            
            <Nav.Item>
              <Nav.Link eventKey="first">캠퍼스 안내</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="second">행정 부서</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="third">학과 안내</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fourth">동아리 안내</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="fifth">프로그램 안내</Nav.Link>
            </Nav.Item>

          </Nav>
        </Col>
        <Col sm={9}>
          <Tab.Content>
          
            <Tab.Pane eventKey="first">
                    <iframe title="campus" width="850" height="1000" src="https://hm.seoil.ac.kr/115"
                    ></iframe>
            </Tab.Pane>
            <Tab.Pane eventKey="second">
                <iframe title="Admin" width="850" height="1000" src="https://hm.seoil.ac.kr/66?group=5"
                    ></iframe>
            </Tab.Pane>
            <Tab.Pane eventKey="third">
                <iframe title="major" width="850" height="1000"  src="https://hm.seoil.ac.kr/66?group=4"
                    ></iframe>
            </Tab.Pane>
            <Tab.Pane eventKey="fourth">
                <iframe title="club" width="850" height="1000"  src="https://hm.seoil.ac.kr/69"
                ></iframe>
            </Tab.Pane>
            <Tab.Pane eventKey="fifth">
                    <iframe title="program" width="850" height="1000" src="https://hm.seoil.ac.kr/65"
                    ></iframe>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </div>
  );
}

export default Program;