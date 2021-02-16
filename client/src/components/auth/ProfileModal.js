import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import{profileUser} from '../../js/actions/authActions';
import {Redirect} from "react-router-dom";
import {Link} from 'react-router-dom';

import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
} from 'reactstrap';



const ProfileModal = () => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
   const[cancel,setCancel]=useState(false); 
   const dispacth=useDispatch();
   
const add=()=>{
  dispacth(profileUser({name,lastName,birthDate}));
  setCancel(!cancel);
}
    
  
  const toggle = () => {
    setModal(!modal);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  const handleProfile = () => {
    const newUser = { name, lastName, birthDate };
    dispatch(profileUser(newUser));
    history.push('/dashboard');
    setName('');
    setLastName('');
    setBirthDate('');
     };

  return (
<>
    {
      cancel? (<Redirect to="/profile"/>):
    <div style={{ padding: '0 15px' }}>
      <NavLink onClick={toggle} href="#">
        Profile
      </NavLink>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Profile</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                value={name}
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={(e) => setName(e.target.value)}
              />
              <Label for="name">Last Name</Label>
              <Input
                type="text"
                value={lastName}
                name="lastName"
                id="lastName"
                placeholder="Last Name"
                className="mb-3"
                onChange={(e) => setLastName(e.target.value)}
              />
              <Label for="date">birthDate</Label>
              <Input
                type="text"
                value={birthDate}
                name="BirthDate"
                id="birthDate"
                placeholder="birthDate"
                onChange={(e) => setBirthDate(e.target.value)}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                onClick={handleProfile}
              >
                <Link to='/profile'>

                   <Button onClick={add}>Add Profile 
                                      
                    </Button>
                   </Link>
               <Button onClick={()=>setCancel(!cancel)}>Cuncil</Button>
              </Button>
                </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
     } 

  </>
 );
    }
export default ProfileModal;