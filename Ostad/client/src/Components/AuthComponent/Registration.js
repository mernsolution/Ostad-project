import React,{useRef} from 'react'
import {Container, Row,Col, Form, Button} from 'react-bootstrap'
import '../AuthComponent/Login.css'
import { NavLink, useNavigate } from 'react-router-dom'
import {Toaster, toast} from 'react-hot-toast'
import { isEmpty, isEmail } from '../../helper/Validation'
import {RegistrationApi} from '../../ApiRequest/ApiRequest'
import img from '../../assets/images/150-150.png'
export default function Registration(){
  const userName= useRef();
  const userMail = useRef();
  const userPassword = useRef();
  const Navigate = useNavigate();

  const HandleRegistration =()=>{

  const First_Name = userName.current.value;
  const user_email = userMail.current.value;
  const user_password =userPassword.current.value;
  const userPhoto ="data:image/png;base64,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"
  
  if(isEmpty (First_Name)){
    toast.error('Name is require');
  }else if(isEmail(user_email)){
    toast.error('Email is require');
  }else if(isEmpty(user_password)){
    toast.error('password is require');
  }else{
    RegistrationApi(First_Name,user_email,user_password, userPhoto)
    .then((Result)=>{
      if(Result === true){
        toast.success("Register successfully ");
        Navigate ("/LoginPage")
      }else{
        toast.error("failed to Register");
      }
    })
  }
}

return(<>
<Container>
  <Toaster/>
	<Row>
		<Col md={{span:6,offset:3}} className='LoginCol mt-12'>
    <div className='LoginTopText'>
			<img src={img}/>
			<h4>New here?</h4>
			<p>Signing up only takes a minute</p>
		</div>
   <Form>
      <Row className="mb-3">
      <Form.Group  controlId="formGridEmail">
          <Form.Label>Fast Name</Form.Label>
          <Form.Control ref={userName} type="text" placeholder="Fast Name" />
        </Form.Group>
        <Form.Group  controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control ref={userMail} type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group  controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control ref={userPassword} type="password" placeholder="Password" />
        </Form.Group>
      </Row>
      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
       <Button variant="primary" onClick={HandleRegistration}>Submit</Button>
    </Form>
    <div className='LoginText2'>
						<p>have an account? <NavLink to='/LoginPage'>Singing</NavLink></p>
					</div>
		</Col>
	</Row>
</Container>
	
	</>)
}