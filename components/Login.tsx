'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import logo from '../public/assets/loading.png'
import {FcGoogle} from 'react-icons/fc'

const Login = () => {
  return (
    <div className="bg-[#040e0ab9] h-screen flex flex-col items-center justify-center text-center">
      <Image
        src={logo}
        width={150}
        height={150}
        className="rounded-full animate-bounce transition-all ease-in duration-100"
        alt="logo"
      />
      <h1 className="text-3xl font-semibold text-white my-4 tracking-[3px]">
        ChatGPT
      </h1>

      <div className="googlebtn flex flex-col gap-4 justify-center items-center">
        <h3 className="text-white">Please sign in with your Google account</h3>
        <div className="btn w-auto">
          <button
            onClick={() => signIn("google")}
            className="text-zinc-200 p-2 space-x-5 px-5 rounded-2xl text-lg hover:bg-zinc-900 transition-all ease-in duration-200 w-auto bg-slate-800 flex justify-center items-center"
          >
            <FcGoogle className="text-2xl" /> <span>Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login