import axios from 'axios'
import {toast} from 'react-hot-toast'
import {setToken,getToken, setUserDetails,setEmail,setOTP} from '../helper/SessionHelper'
import { SetProfile } from '../Redux/Slice/ProfileSlice'
import Store from '../Redux/Store/store'
const Base_url = 'http://localhost:8800/Auth'

const AxiosHeader={headers:{'token':getToken()}}

export function RegistrationApi( userName,userMail,userPassword,userPhoto){
	const URL = Base_url+'/register';
	const postBody ={
		userName:userName,
		userMail:userMail,
		userPassword:userPassword,
		userPhoto:userPhoto	
	
	}
	return axios.post(URL,postBody)
	.then((res)=>{
		if(res.status === 200){
			
			return true
		}else{
			toast.error("failed to Register");
		    return false
		}}).catch((error)=>{
		toast.error("register data not valid");
        console.log(error)
	})
}
export function LoginApi(userMail, userPassword){
	const URL = Base_url+'/userLogin';
	const postBody ={userMail:userMail,userPassword:userPassword}
	return axios.post(URL,postBody)
	.then((res)=>{
		if(res.status === 200){
			setToken(res.data['token']);
			setUserDetails(res.data['data']);
			return true
		}else{
			toast.error("failed to Register");
		    return false
		}}).catch((error)=>{
		toast.error("register data not valid");
        console.log(error)
	})
}

export function GetProfileDetails(){
 const URL = Base_url +'/getUserDetails';

 return axios.get(URL, AxiosHeader)
 .then((res)=>{
	if(res.status ===200){
		Store.dispatch(SetProfile(res.data['data']))
		return true
	}else{

		return false
	}
	
 }).catch((error)=>{
	console.log(error)
 })
}

export function userUpdate(userName,userMail,userPassword,userPhoto){
const URL = Base_url+'/update' ;
const reqBody ={ userName:userName,userMail:userMail,userPassword:userPassword,userPhoto:userPhoto}

const UserDetails ={ userName:userName,userMail:userMail,userPhoto:userPhoto}

return axios.post(URL, reqBody, AxiosHeader)
.then((res)=>{

	if(res.status === 200){
		setUserDetails(UserDetails)
		toast.success('Successfully update users data')
		return true;
	}else{
		toast.error('failed to update users data')
		return false
	}
})
.catch((error)=>
console.log(error)

)
}

// Recover password Api is start
export function RecoverVerifyEmail(email){
	const URL = Base_url +"/RecoverVerifyEmail/"+email;
	return axios.get(URL)
	.then((res)=>{
		
	   if(res.status === 200){

		 if(res.data["status"] === "fail"){
			toast.error("user not found")
			return false
		 }else{
			setEmail(email)
			toast.success("OTP Send successfully")
			return true
		 }
		   
	   }else{
		   return false
	   }	   
	}).catch((error)=>{
	   console.log(error)
	})
}

export function RecoverVerifyOtp(email,OTP){
	const URL = Base_url +"/RecoverVerifyOtp/"+email + "/"+OTP;

	return axios.get(URL)
	.then((res)=>{
	   if(res.status ===200){
		if(res.data["status"] === "fail"){
			toast.error("OTP Invalid")
			return false
		 }else{
			setOTP(OTP)
			toast.success("OTP verify successfully")
			return true
		 }
	   }else{
		   return false
	   }	   
	}).catch((error)=>{
	   console.log(error)
	})
}

export function RecoverResetPassword(email,OTP, password){
	const URL = Base_url +'/RecoverRestPassword';
	const postBody= {email:email, OTP:OTP,password:password}
debugger

	return axios.post(URL,postBody)
	.then((res)=>{
	   if(res.status === 200){
		if(res.data["status"] === "fail"){
			toast.error("OTP Invalid")
			return false
		 }else{
			setOTP(OTP)
			toast.success("Reset password successfully")
			return true
		 }
	   }else{
		   return false
	   }	   
	}).catch((error)=>{
	   console.log(error)
	   return false
	})
}

