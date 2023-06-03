import React,{useState} from 'react'
import {Container, Row,Col, Form, Button} from 'react-bootstrap'
import {getEmail} from '../../helper/SessionHelper'
import '../../Components/AuthComponent/Login.css'
 import {toast,Toaster} from 'react-hot-toast'
// import {isEmail} from '../../helper/Validation'
import {RecoverVerifyOtp} from '../../ApiRequest/ApiRequest'
import  ReactCodeInput from 'react-code-input'
import {useNavigate} from 'react-router-dom'


export default function VerifyOtp(){

const navigate = useNavigate();
const [OTP, setOtp]=useState("");

const OtpSend=()=>{
	if(OTP.length === 6){
		RecoverVerifyOtp(getEmail(),OTP).then((result)=>{
			if(result === true){
				navigate("/ResetPassword")
			}
		})	

	}else{
		toast.error("OTP  MUST 6 digits")
	}
}
const inputStyleInvalid={
    fontFamily: 'monospace',
    margin:  '4px',
    MozAppearance: 'textfield',
    width: '36px',
    borderRadius: '3px',
    fontSize: '18px',
    height: '36px',
	fontWeight:700,
    paddingLeft: '10px',
    backgroundColor: '#ffffff',
    color: 'black',
    border: '2px solid purple'
  }
return(<>
<Container >
	<Row >
		
		<Col md={{span:4,offset:4}} className='LoginCol mt-12'>
		<Form>
				<Row className="mb-3">
					
					<Form.Label>OTP Verification</Form.Label>
					<ReactCodeInput  onChange={(value)=>setOtp(value)} inputStyle={inputStyleInvalid}  fields={6} />
					
				</Row>
				<Button variant="primary" onClick={OtpSend}>Submit</Button>
				
		 </Form>	
		 <Toaster/>		
		</Col>
	</Row>
</Container>
	
	</>)
}