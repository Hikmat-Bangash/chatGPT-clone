'use client'
import { useSession, signOut} from 'next-auth/react';
import React from 'react'
import NewChat from './NewChat';
import { useCollection } from 'react-firebase-hooks/firestore';
import { db } from '@/firebase';
import { collection, orderBy, query } from 'firebase/firestore';
import ChatRow from './ChatRow';
import { Dispatch, SetStateAction } from "react";
import { TbLogout } from 'react-icons/tb'
import {FiGithub, FiInstagram, FiLinkedin, FiTwitter} from "react-icons/fi"
import Link from 'next/link';
import CustomLoading from '@/app/CustomeLoading';

type Props = {
  setsidebarActive: Dispatch<SetStateAction<boolean>>;
  sidebarActive: boolean;
};

const Sidebar = ({ sidebarActive, setsidebarActive }: Props) => {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  return (
    <div className="flex flex-col w-[80%] sm:w-full h-screen z-50 shadow-sm shadow-transparent bg-[#202123f6] pt-3 border-r-[1px] border-opacity-90 border-gray-600">
      <div className="flex-1 overflow-hidden ">
        <div className="relative ml-2 wraper">
          <div className="relative z-50 w-full sm:w-[90%] overflow-hidden">
            <NewChat
              sidebarActive={sidebarActive}
              setsidebarActive={setsidebarActive}
            />
          </div>

          <div className="mt-2 flex flex-col z-0 overflow-y-auto h-[29.5rem]">
            {loading ? (
              <div className="flex justify-center items-center h-[29.5rem]">
                <CustomLoading />
              </div>
            ) : (
              <>
                {chats?.docs.map((chat) => (
                  <ChatRow
                    key={chat.id}
                    id={chat.id}
                    sidebarActive={sidebarActive}
                    setsidebarActive={setsidebarActive}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="relative flex-col justify-between items-center border-t border-gray-600 border-opacity-60 h-[25%] z-40 w-full">
        {/* user info */}
        <div className="py-2 flex justify-around items-center border-b border-gray-600 border-opacity-30">
          {session && (
            <>
              <img
                src={session?.user?.image!}
                alt="profile"
                className="h-10 w-10 rounded-full hover:opacity-80 cursor-pointer opacity-80"
              />
              <h4 className="text-gray-500">{session?.user?.name!}</h4>

              <TbLogout
                onClick={() => signOut()}
                className="text-2xl text-white opacity-60 cursor-pointer hover:opacity-100"
              />
            </>
          )}
        </div>
        {/* Developer info */}
        <div className="text-white flex flex-col mt-2 justify-around gap-3 sm:py-0 py-2">
          <h5 className="text-center font-normal text-sm mb-2 opacity-40 tracking-[2px]">
            Contact Us
          </h5>
          <div className="flex text-xl justify-around items-center mb-2">
            <Link href="https://github.com/Hikmat-Bangash">
              <FiGithub className="opacity-50 hover:opacity-100 hover:animate-pulse transition ease-in-out" />
            </Link>
            <Link href="https://www.linkedin.com/in/hikmat-bangash/">
              <FiLinkedin className="hover:opacity-100 opacity-50  hover:animate-pulse transition ease-in-out" />
            </Link>
            <Link href="https://instagram.com/hikmat.bangash_?igshid=ZDdkNTZiNTM=">
              <FiInstagram className="hover:opacity-100 opacity-50  hover:animate-pulse transition ease-in-out" />
            </Link>
            <Link href="https://twitter.com/HikmatkhanBang5">
              <FiTwitter className="hover:opacity-100 opacity-50  hover:animate-pulse transition ease-in-out" />
            </Link>
          </div>
          <p className="text-gray-400 sm:mt-0 opacity-30 text-[9px] text-center font-sans tracking-widest">
            Developed and Designed by Hikmat Bangash
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;