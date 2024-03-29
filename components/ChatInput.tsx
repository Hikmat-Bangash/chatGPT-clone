"use client";
import { db } from "@/firebase";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { addDoc, collection, orderBy, query, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useCollection } from "react-firebase-hooks/firestore";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");
  const msgRef = useRef<HTMLInputElement> (null);
  // fetching all messages from firebase
 const [messages] = useCollection(
   session &&
     query(
       collection(
         db,
         "users",
         session?.user?.email!,
         "chats",
         chatId,
         "messages"
       ),
       orderBy("createdAt", "asc")
     )
 );

  
  const msgs:any = messages?.docs.map((msg) => {
    return msg.data().text;
  });

  // send message method definition
  const SendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = prompt.trim();
    setPrompt("");
   
    msgs.push(input)
    // console.log(`after push input msg: ${msgs}`)

    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || "picture",
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    const notification = toast.loading("processing", {
      position: "top-center",
      style: { width: "auto", height: "auto" },
    });

    await fetch("/api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: msgs,
        chatId,
        session,
      }),
    }).then((res) => {
      toast.success("Responded", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 flex items-center p-1 sm:p-2 justify-end text-gray-400 mb-1 border-gray-400 border-[1px] rounded-md text-sm sm:text-md">
      <form onSubmit={SendMessage} className=" space-x-5 flex-1">
        <input
          type="text"
          className="bg-transparent text-white w-[80%] focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          ref={msgRef}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className=" text-white font-bold px-2 py-1  disabled:cursor-not-allowed float-right"
        >
          <HiOutlinePaperAirplane className="text-xl rotate-90 text-gr" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
