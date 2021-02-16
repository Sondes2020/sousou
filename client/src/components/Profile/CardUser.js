
import {Container,Row,Jumbotron} from 'reactstrap'
import { useSelector, useDispatch } from 'react-redux';



function CardUser() {
    const profile = useSelector((state) => state.authReducer.profile);
  
    return ( 
  
     
     <Container>
      <Jumbotron>
        <Row className="d-flex justify-content-center align-items-center">
          <p
            style={{
              width: "100px",
              height: "100px",
              fontSize: "1.5em"
            }}
            className="d-flex justify-content-center align-items-center mr-auto border rounded-circle text-light bg-info text-md"
          >
           
          </p>
          <p className="lead text-center col"> {profile ? `Name: ${profile.name}`: null}</p>
           
          <p className="lead text-center col">
          {profile ? `LastName: ${profile.lastName}`: null}</p>

          <p className="lead text-center col">
          {profile ? `Birthdate: ${profile.birthDate}`: null}
          </p>
        </Row>
      </Jumbotron>
    </Container>) 
    }
  
    
    
    


export default CardUser;


