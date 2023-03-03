import React from 'react'
import { DocumentData } from 'firebase/firestore';

type Props = {
    msg: DocumentData;
};

const Message = ({ msg }: Props) => {
    const isChatGPT = msg.user.name === "ChatGPT";
    
  return (
    <div
      className={`py-5 text-white px-3 sm:px-0 ${
        isChatGPT && "bg-gray-500/50"
      } `}
    >
      <div className="flex space-x-5 max-w-2xl mx-auto">
        <img src={msg?.user?.avatar} alt="" className="h-8 w-8" />
        <p className="py-1 text-sm">{msg.text}</p>
      </div>
    </div>
  );
}

export default Message