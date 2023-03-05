'use client';
import { Dispatch, SetStateAction } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { MegaphoneIcon, PlusIcon } from "@heroicons/react/24/solid";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '@/firebase';
import Link from "next/link";



type Props = {
  setsidebarActive: Dispatch<SetStateAction<boolean>>;
  sidebarActive: boolean;
};

const Navbar = ({ sidebarActive, setsidebarActive }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const creatNewChat: any = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    );
    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className="sm:hidden fixed h-11 px-3 w-full text-white flex justify-between items-center bg-[#434654] shadow-sm shadow-gray-400">
      {/* <AiOutlineMenu /> */}
      <h1 onClick={() => setsidebarActive(!sidebarActive)}> <AiOutlineMenu className="text-xl cursor-pointer" /></h1>
      <Link href='/'>
      <h1 className="tracking-[3px]">ChatGPT</h1>
      </Link>
      <h1 onClick={creatNewChat}>
        <PlusIcon className="h-6 w-6 font-bold cursor-pointer" />
      </h1>
    </div>
  );
}

export default Navbar