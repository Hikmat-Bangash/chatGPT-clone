"use client";

import { db } from '@/firebase'
import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { collection, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'
import Message from './Message'

type Props = {
    chatId: string
}

const Chat = ({ chatId }: Props) => {
  
  const { data: session } = useSession();

  const [messages] = useCollection(
    session && query(
      collection(
        db, "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      orderBy("createdAt", 'asc')
    )
  );

  return (
    <div className='flex-1 overflow-y-auto overflow-x-hidden mt-10 sm:mt-3 mb-2'>

      {messages?.empty && (
        <>
          <p className='mt-10 text-center text-white'>
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className='h-8 w-8 mx-auto mt-5 text-white animate-bounce' />
        </> 
      )}
      {messages?.docs.map((msg) => (
        
        <Message key={msg.id} msg={msg.data()}  />
      ))}
    </div>
  )
}

export default Chat