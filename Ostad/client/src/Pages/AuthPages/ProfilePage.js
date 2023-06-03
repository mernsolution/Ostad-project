import React from 'react'
import {Container, Row,Col} from 'react-bootstrap'
import MainPage from '../../Components/MainPage/MainPage'
import ProfileUpdate from '../../Components/AuthComponent/Update'
export default function ProfilePage(){

	return(<>
	<Container>
		<MainPage>
		   <ProfileUpdate/>
		</MainPage>	
	</Container>
	
	
	
	</>)
}