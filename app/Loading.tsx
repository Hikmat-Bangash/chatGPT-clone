import Image from "next/image";
import React from "react";
import loadingIcon from "../public/assets/loading.png";

const Loading = () => {
  return (
    <div className=" w-full h-screen bg-transparent flex justify-center items-center">
      <Image
        src={loadingIcon}
        width={25}
        height={25}
        className="rounded-full animate-spin transition-all ease-in duration-100 opacity-70"
        alt="logo"
      />
    </div>
  );
};

export default Loading;
