"use client";
import { PlusIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { IoClose } from "react-icons/io5";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

import { Dispatch, SetStateAction } from "react";

type Props = {
  setsidebarActive: Dispatch<SetStateAction<boolean>>;
  sidebarActive: boolean;
};

const NewChat = ({ sidebarActive, setsidebarActive }: Props) => {
  const { data: session } = useSession();
  const router = useRouter();

  const creatNewChat = async () => {
    const doc = await addDoc(
      collection(db, "users", session?.user?.email!, "chats"),
      {
        userId: session?.user?.email,
        createdAt: serverTimestamp(),
      }
    );
    setsidebarActive(!sidebarActive);

    router.push(`/chat/${doc.id}`);
  };

  return (
    <div className="flex justify-between w-full mb-3">
      <div
        onClick={creatNewChat}
        className="sm:w-full w-[70%] border-gray-500 border chatRow"
      >
        <PlusIcon className="h-4 w-4" />
        <p>New Chat</p>
      </div>

      <button
        className="sm:hidden text-white mr-2"
        onClick={() => setsidebarActive(!sidebarActive)}
      >
        {/* <GrFormClose className="text-white text-3xl"/> */}
        <IoClose className="text-xl" />
      </button>
    </div>
  );
};

export default NewChat;
