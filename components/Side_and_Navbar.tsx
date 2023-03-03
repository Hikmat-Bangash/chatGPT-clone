'use client';
import { useState } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';



const Side_and_Navbar = () => {
    const [sidebarActive, setsidebarActive] = useState(false)
    return (
      <>
        <Navbar
          sidebarActive={sidebarActive}
          setsidebarActive={setsidebarActive}
        />

        <div
          className={` ${
            sidebarActive ? "flex" : "hidden"
          } z-50 sm:flex h-screen w-full overflow-hidden fixed sm:relative sm:w-[16rem] bg-[#202123c6] sm:bg-[#202123f6] `}
        >
          <Sidebar
            sidebarActive={sidebarActive}
            setsidebarActive={setsidebarActive}
          />
        </div>
      </>
    );
}

export default Side_and_Navbar;