import React,{useRef} from 'react'
import {useNavigate} from 'react-router-dom'
import {Container, Row,Col, Form, Button} from 'react-bootstrap'
import '../../Components/AuthComponent/Login.css'
import {toast,Toaster} from 'react-hot-toast'
import {isEmail} from '../../helper/Validation'
import {RecoverVerifyEmail} from '../../ApiRequest/ApiRequest'

export default function SendOtp(){
const emailRef=useRef()
const navigate =useNavigate()
debugger
const veryEmail=()=>{
const email = emailRef.current.value;
debugger
if(isEmail(email)){
	toast.error("Email not verify")
}else{
	RecoverVerifyEmail(email)
	.then((result)=>{
		if(result === true){
			navigate("/verifyOt")
		}
	})
}
}

return(<>
<Container >
	<Row >
		<Toaster/>
		<Col md={{span:6,offset:3}} className='LoginCol mt-12'>
		<Form>
				<Row className="mb-3">
					<Form.Group  controlId="formGridPassword">
					<Form.Label>Enter Email</Form.Label>
					<Form.Control type="email" placeholder="Email" ref={emailRef}/>
					</Form.Group>
				</Row>
				<Button variant="primary" onClick={veryEmail}>Submit</Button>
			
		 </Form>			
		</Col>
	</Row>
</Container>
	
	</>)
}