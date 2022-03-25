import React, { useState, useEffect } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FiLogOut, FiArrowLeftCircle } from "react-icons/fi";

import {GoThreeBars} from 'react-icons/go'

import naseemLogo from '../assets/img/naseemlogo.png'

import "react-pro-sidebar/dist/css/styles.css";

import { useUserAuth } from "../config/auth";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";


const LeftSideBar = () => {

  
  const [menuCollapse, setMenuCollapse] = useState(false)

  const {logOut} = useUserAuth();

  const history = useHistory();

  useEffect (() =>{
  //   function handleResize() {
  //       if(window.innerWidth>=500)
  //       {
  //           setMenuCollapse(false);
  //       }
  //     }
  //     window.addEventListener('resize', handleResize)
  
  //     return _ => 
  //     {
  //       window.removeEventListener('resize', handleResize)
  //     }


const mediaQuery = window.matchMedia('(min-width: 1180px)')

function handleTabletChange(e) {
  // Check if the media query is true
  if (e.matches) {
    // Then log the following message to the console
    setMenuCollapse(false);
    
  }


}
// Register event listener
mediaQuery.addListener(handleTabletChange)
// Initial check
handleTabletChange(mediaQuery)
});

const handleLogout = async() => {
  try {
    localStorage.clear()
    await logOut();
    toast.success("You are Logged out")
    history.replace("/")
  } catch (error) {
    toast.error("sorry error logging you out")
  }
}

const menuIconClick = () => {
 
   menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
};


  return (
    <>
    <div id="header">
    <div className="leftbarclose" onClick={menuIconClick}>
      <GoThreeBars/>
    </div>
     

     <ProSidebar collapsed={menuCollapse}>
     <SidebarHeader>
     <div className="logotext">
         
         
           <img className="text-center w-100" src={naseemLogo} alt="big logo" />
        
       </div>
       
     </SidebarHeader>
     <SidebarContent>
       <Menu iconShape="square">
       
       
              <MenuItem className="leftsidebarclose m-0" onClick={menuIconClick} icon={<FiArrowLeftCircle />}>
                close sidebar
            </MenuItem>
            
       </Menu>

     </SidebarContent>
     <SidebarFooter>
       <Menu iconShape="square">
         <MenuItem icon={<FiLogOut />} onClick={handleLogout}>Logout</MenuItem>
       </Menu>
     </SidebarFooter>
   </ProSidebar>

    
    </div>
  </>
  );
};

export default LeftSideBar;


