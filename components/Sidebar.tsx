'use client'
import { useSession, signOut} from 'next-auth/react';
import React from 'react'
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import ChatRow from './ChatRow';
import ModelSelection from './ModelSelection';


const Sidebar = () => {
  const { data: session } = useSession();
  
  const [chats, loading, error] = useCollection(
    
    session && query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );


  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        <div className="wraper">
          <NewChat />

          {/* <div className='hidden sm:inline'> <ModelSelection /> </div> */}
          <div className="mt-2 flex flex-col">

          {chats?.docs.map((chat) => (
            
            <ChatRow key={chat.id} id={chat.id} />
            ))}
          </div>

        </div>
      </div>
      {session && (
        <img
          onClick={()=>signOut()}
          src={session?.user?.image!}
          alt="profile"
          className="h-12 w-12 rounded-full hover:opacity-80 mx-auto cursor-pointer"
        >
       </img>
      )}
    </div>
  );
}

export default Sidebar;