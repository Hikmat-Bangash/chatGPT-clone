'use client'
import { useSession, signOut} from 'next-auth/react';
import React from 'react'
import NewChat from './NewChat';


const Sidebar = () => {
  const { data: session } = useSession();
  
  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="wraper">
          <NewChat />

          <div> {/*Model Selection*/} </div>

          {/* Map through the chatRows */}
        </div>
      </div>
      {session && (
        <img
          onClick={()=>signOut()}
          src={session.user?.image!}
          alt="profile"
          className="h-12 w-12 rounded-full hover:opacity-80 mx-auto cursor-pointer"
        >
       </img>
      )}
    </div>
  );
}

export default Sidebar;