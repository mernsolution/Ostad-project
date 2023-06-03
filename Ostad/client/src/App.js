import { Routes, Route } from "react-router-dom";
import DashboardPage from './Pages/DashboardPage/DashboardPage'
import LoginPage from "./Pages/AuthPages/LoginPage";
import ProfilePage from "./Pages/AuthPages/ProfilePage";
import Registration from "./Pages/AuthPages/Registration";
import SendPage from './Pages/AccountRecover/SendOtpPage';
import VerifyOtpPage from './Pages/AccountRecover/VerifyOtpPage';
import ResetPassword from './Pages/AccountRecover/RestPasswordPage';
// import Main from './Components/MainPage/MainPage'
function App(){
  return (<>

      <Routes>                               
      <Route path="/" element={<LoginPage/>}/> 

         <Route path="/DeshboardPage" element={<DashboardPage/>}/> 
  
         <Route path="/LoginPage" element={<LoginPage/>}/>  
         <Route path="/ProfilePage" element={<ProfilePage/>}/>   
         <Route path="/Registration" element={<Registration/>}/>   
         <Route path="/sendPage" element={<SendPage/>}/> 
         <Route path="/verifyOt" element={<VerifyOtpPage/>}/>   
         <Route path="/ResetPassword" element={<ResetPassword/>}/>               
      </Routes>

  {/* <Main/> */}
  </> );
}

export default App;
