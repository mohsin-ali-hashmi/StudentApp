import React, { useEffect, useState } from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FiArrowRightCircle } from "react-icons/fi";
import {useQuery} from 'react-query'

import { GoThreeBars } from "react-icons/go";
import { GrAnnounce } from "react-icons/gr";
import { toast } from "react-toastify";
import { getAllAnnouncements } from "../assets/api/AllApi";
import { TailSpin } from "react-loader-spinner";

import "react-pro-sidebar/dist/css/styles.css";

const LeftSideBar = () => {

  const [menuCollapse, setMenuCollapse] = useState(false);
  const school_id = "1577337858300";
  const {
    data ,
    isLoading ,
    isError
  } = useQuery("announce", () => getAllAnnouncements(school_id), {
    refetchOnWindowFocus: false,
    onError: () => {
      toast.error("can't load the page internet is down");
    },
  });
 

  useEffect(() => {
    //     function handleResize() {
    //         if(window.innerWidth>=500)
    //         {
    //             setMenuCollapse(false);
    //         }
    //       }
    //       window.addEventListener('resize', handleResize)

    //       return _ =>
    //       {
    //         window.removeEventListener('resize', handleResize)
    //       }

    const mediaQuery = window.matchMedia("(min-width: 1180px)");

    function handleTabletChange(e) {
      // Check if the media query is true
      if (e.matches) {
        // Then log the following message to the console
        setMenuCollapse(false);
      }
    }
    // Register event listener
    mediaQuery.addListener(handleTabletChange);
    // Initial check
    handleTabletChange(mediaQuery);
  });

  const menuIconClick = () => {
    menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
  };
  console.log(data)

  return (
    <>
      <div id="right-header">
        <div className="rightbarclose" onClick={menuIconClick}>
          <GoThreeBars />
        </div>

        <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
            <div className="logotext">
              <Menu iconShape="square">
                <MenuItem className="text-center" icon={<GrAnnounce />}>
                  Announcements
                </MenuItem>
              </Menu>
            </div>
          </SidebarHeader>
          <SidebarContent className="overflow-auto">

            {/* <Menu iconShape="square"> </Menu> */}
      
            { 
            
             isLoading ? (<TailSpin/>) :
             isError ?(<p>check your connection and try again</p>) : 
             ( 
               data.response.data.announcements.map((announces , index)=>(
              <div key={index} className="rightAnnouncementdiv">
                <div className="d-flex justify-content-end" >
                  <p className="mx-0 my-0">
                    {announces.announcDate}
                    
                    </p>
                </div>
                
                <div >
                  <p className="mx-0 my-0">
                    
                    {announces.announDescription}
                  </p>
                </div>
                
                {announces.contentList ?
                (announces.contentList.map((images, index)=>(
                 
                  
                  ((images.length !== "0") ? 
                  (<div key={index} className="my-1">
                    <img src={images.fileUri} alt="some pic" className="w-50" />
                  </div>) : (<></>)
                  )
                
                )) ) : (<></>)
}
                
              </div>
             ))
             )} 
          </SidebarContent>

          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem
                className="leftsidebarclose"
                onClick={menuIconClick}
                icon={<FiArrowRightCircle />}
              >
                close sidebar
              </MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default LeftSideBar;
