"use client";
import { db } from "@/firebase";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
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
    const notification = toast.loading("chatGPT is thinking...");

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
      console.log(res)
      //toast notification to say success
      toast.success("chatGPT has responded", {
        id: notification,
      });
    });
  };

  return (
    <div className="bg-gray-700/50 flext text-gray-400 rounded-lg text-sm">
      <form onSubmit={SendMessage} className="p-5 space-x-5 flex-1">
        <input
          type="text"
          className="bg-transparent focus:outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message here..."
        />

        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-cyan-600 hover:opacity-80 text-white font-bold px-2 py-1 disabled:bg-gray-500 disabled:cursor-not-allowed float-right"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45 text-white" />
        </button>
      </form>
    </div>
  );
}

export default ChatInput;
