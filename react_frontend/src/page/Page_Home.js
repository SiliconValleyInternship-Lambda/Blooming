import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import './Home.css';

function Page_Home() {
  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
          <div className="head">
            <h1>BLOOMING</h1>
            <p>MAKE YOUR OWN MASTERPIECE</p>
          </div>
          <div className="transferbtn">
            <Link
              to="/transfer"
              className="transferlink"
            >
              <Icon name='arrow circle right' />
            </Link>
            <p>GO TO BLOOM</p>
          </div>
        </Col>
        <Col sm={8}>
          <div className="blackBox">
            <p>My hand-blooming<br /> masterpiece</p>
          </div>
        </Col>
      </Row>
    </Container>

  );
}

export default Page_Home;