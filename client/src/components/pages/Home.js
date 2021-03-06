import React from 'react';
import './Home.css'
import { Media, Row, Col } from 'reactstrap';

class Home extends React.Component {
  render() {
    return (
      <div className="aboutPage">
        <Row style={{alignItems: 'center'}}>
          <Col lg="6" sm="12">
            <Media src="http://blog.webmaster-media.tn/wp-content/uploads/2017/02/agence-web.jpg" alt=" " style={{width: '100%'}}/>
          </Col>
          <Col style={{textAlign: 'left'}}>
            <h1>About</h1>
            <p>
              Brazilian Hairdresser in Sydney since 2007, specialised in colour, keratin Brazilian treatment, foils, balayage, cut and blow dry, styles, men's, hair extensions.
            </p>
            <h2>Our Mission</h2>
            <p>
              It's all about you!
              I can't wait to make your hair the best you ever had. I create a system that I will always have only one client at the time and devote all my attention to you.
              forget waiting, forget wondering "where is my hairdresser" with personalised service devoted to you, we can active the best hair you ever had.
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;