"use client";
import { db } from "@/firebase";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const { data: session } = useSession();
  const [prompt, setPrompt] = useState("");

  const model = "text-devinci-003";

  // send message method definition
  const SendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const input = prompt.trim();
    setPrompt("");

    const message = {
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

    // toast notification to say loading
    // const notification = toast.loading("Processing...");
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
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then((res) => {
      console.log(res);
      //toast notification to say success
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
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className=" text-white font-bold px-2 py-1  disabled:cursor-not-allowed float-right"
        >
          {/* <BsFillArrowRightCircleFill className="h-5 w-5" /> */}
          <HiOutlinePaperAirplane className="text-xl rotate-90 text-gr" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
