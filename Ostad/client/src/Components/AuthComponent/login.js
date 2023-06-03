import React,{useRef} from 'react'
import {NavLink,useNavigate} from 'react-router-dom'
import {Container, Row,Col, Form, Button} from 'react-bootstrap'
import {Toaster, toast} from 'react-hot-toast'
import { isEmpty, isEmail } from '../../helper/Validation'
import './Login.css'
import { LoginApi} from '../../ApiRequest/ApiRequest.js'

export default function Login(){
	const userMail = useRef();
	const userPassword = useRef();
	// const Navigate = useNavigate();
	const HandleLogin=()=>{
	const user_email = userMail.current.value;
	const user_password =userPassword.current.value;
	if(isEmail(user_email)){
		toast.error('Email is require');
	  }else if(isEmpty(user_password)){
		toast.error('password is require');
	  }else{
		LoginApi(user_email,user_password)
		.then((Result)=>{
		  if(Result === true){
			toast.success("Register successfully ");
			// Navigate ("/")
			window.location.href='/DeshboardPage'
		  }else{
			toast.error("failed to Register");
		  }
		})
	  }
	}
	
return(<>
<Container>
	<Toaster/>
	<Row >
		<Col md={{span:6,offset:3}} className='LoginCol mt-12'>
		<div className='LoginTopText'>
			<h3>Logo</h3>
			<h4>Let's keep login</h4>
			<p>Sign in to continue</p>
		</div>

		<Form>
				<Row className="mb-3">
					<Form.Group  controlId="formGridEmail" className='Email_input'>
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" placeholder="Enter email" ref={userMail}/>
					</Form.Group>

					<Form.Group  controlId="formGridPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" ref={userPassword}/>
					</Form.Group>
				</Row>

				<Button variant="primary" onClick={HandleLogin}>
					Submit
				</Button>
		 </Form>
				<div className='LoginText2'>
						<p>Don't have an account?<NavLink to='/Registration'>create</NavLink></p>
						<p><NavLink to='/sendPage'>Reset Password</NavLink></p>
			    </div>
		</Col>
	</Row>
</Container>
	
	</>)
}