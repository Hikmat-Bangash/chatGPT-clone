'use client'

import Image from 'next/image'
import { signIn } from 'next-auth/react'
import logo from '../public/assets/logo.jpg'


const Login = () => {
  return (
      <div className='bg-[#11A37F] h-screen flex flex-col items-center justify-center text-center'>
          
          <Image src={logo}
              width={200}
              height={200}
          alt="logo"
          />

          <button onClick={() => signIn("google")}
            className="text-white font-bold text-2xl hover:text-red-600 transition-all ease-in duration-200"
          >
              Sign In
          </button>

    </div>
  )
}

export default Login