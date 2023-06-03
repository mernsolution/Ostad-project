import React, { useRef} from "react";
import {Container,Navbar} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {AiOutlineCheckCircle, AiOutlineEdit, AiOutlineLogout, AiOutlineMenuUnfold, AiOutlineUser} from "react-icons/ai";
import {BsHourglass, BsListNested} from "react-icons/bs";
import logo from "../../assets/images/logo.svg";
import {removeSessions } from "../../helper/SessionHelper";
import {MdOutlineCancelPresentation} from "react-icons/md";
import {RiDashboardLine} from "react-icons/ri";
import { getUserDetails } from "../../helper/SessionHelper";
import '../../assets/css/style.css'



const MainPage = (props) => {
    let contentRef,sideNavRef=useRef();
    const onLogout=()=>{
        removeSessions();
    }
    const MenuBarClickHandler = () => {
        let sideNav = sideNavRef;
        let content = contentRef;
        if (sideNav.classList.contains("side-nav-open")) {
            sideNav.classList.add("side-nav-close");
            sideNav.classList.remove("side-nav-open");
            content.classList.add("content-expand");
            content.classList.remove("content");
        } else {
            sideNav.classList.remove("side-nav-close");
            sideNav.classList.add("side-nav-open");
            content.classList.remove("content-expand");
            content.classList.add("content");
        }
    };
// send title dynamically into mainBodyPage
    return ( <>
            <Navbar  className="fixed-top px-0 shadow-sm ">
                <Container fluid={true}>
                    <Navbar.Brand >
                        <a className="icon-nav m-0 h5" onClick={MenuBarClickHandler}><AiOutlineMenuUnfold/></a>
                        <img className="nav-logo mx-2"  src={logo} alt="logo"/>
                    </Navbar.Brand>
                    <div className="float-right h-auto d-flex">
                        <div className="user-dropdown">
                            <img className="icon-nav-img icon-nav"  alt="logo" src={getUserDetails()['userPhoto']}/>
                            <div className="user-dropdown-content ">
                                <div className="mt-4 text-center">
                                    <img className="icon-nav-img" alt="logo2" src={getUserDetails()['userPhoto']}/>
                                    <h6>{getUserDetails()['userName']}</h6>
                                    <hr className="user-dropdown-divider  p-0"/>
                                </div>
                                <NavLink to="/ProfilePage" className="side-bar-item">
                                    <AiOutlineUser className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Profile</span>
                                </NavLink>
                              
                                <a className="side-bar-item" onClick={onLogout}  >
                                    <AiOutlineLogout className="side-bar-item-icon" />
                                    <span className="side-bar-item-caption">Logout</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>
{/* sideNave bar is start from heare  */}
            <div ref={(div) =>{sideNavRef=div}} className="side-nav-open">
{/* NaveMenu Item 01 start */}
                <NavLink id="dropdownMenu"   className={ (navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" }  to="/DeshboardPage"  end>
                    <RiDashboardLine className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Dashboard</span>
                </NavLink>
{/* NaveMenu Item 02 start */}
                <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to="/ImageToPdfPage" >
                    <AiOutlineEdit className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Image To PDF</span>
                </NavLink>

                {/* onClick={() => updatePageTitle('Ai Content generate')} */}
                <NavLink 
                 className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item mt-2" : "side-bar-item mt-2" } to={"/KeyWordPage"}>
                    <BsHourglass className="side-bar-item-icon" />
                    <span className="side-bar-item-caption">Ai Content generate</span>
                </NavLink>
                    <NavLink className={(navData) => navData.isActive ? "side-bar-item-active side-bar-item " : "side-bar-item " }  to="/WebsiteTitle" >
                            <AiOutlineCheckCircle className="side-bar-item-icon" />
                            <span className="side-bar-item-caption">Website Title</span>
                    </NavLink>
                          
            
               

            </div>
            <div ref={(div) => contentRef = div} className="content">
                {props.children}
            </div>
 </>);
};

export default MainPage;
