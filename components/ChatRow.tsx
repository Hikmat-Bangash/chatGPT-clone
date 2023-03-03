"use client";
import { db } from "@/firebase";
import { ChatBubbleLeftIcon, TrashIcon } from "@heroicons/react/24/outline";
import { collection, deleteDoc, doc, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { Dispatch, SetStateAction } from "react";

type Props = {
  id: string;
  setsidebarActive: Dispatch<SetStateAction<boolean>>;
  sidebarActive: boolean;
};

const ChatRow = ({ id, sidebarActive, setsidebarActive }: Props) => {
  const pathName: string | null = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [active, setActive] = useState(false);

  const [messages]: any = useCollection(
    collection(db, "users", session?.user?.email!, "chats", id, "messages")
  );
  // delete chat
  const DeleteChat = async () => {
    await deleteDoc(doc(db, "users", session?.user?.email!, "chats", id));
    // rediret users to the home screen
    router.replace("/");
  };

  useEffect(() => {
    if (!pathName) return;

    setActive(pathName.includes(id));
  }, [pathName]);

  return (
    <>
      <Link
        href={`/chat/${id}`}
        onClick={() => setsidebarActive(!sidebarActive)}
        className={`gap-5 chatRow justify-between ${
          active && "bg-gray-700/50"
        }`}
      >
        <ChatBubbleLeftIcon className=" h-5 w-5 text-white" />
        <p className="flex-1 inline-flex truncate">
          {messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}
        </p>

        <TrashIcon
          onClick={DeleteChat}
          className="h-5 w-5 text-gray-400 hover:text-red-600"
        />
      </Link>
    </>
  );
};

export default ChatRow;
