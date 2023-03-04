import Image from 'next/image'
import logo from '../public/assets/loading.png'
import { FiSun } from 'react-icons/fi';
import { AiFillWarning, AiOutlineWarning } from 'react-icons/ai';
import {GiPaperWindmill} from 'react-icons/gi'
export default function Home() {
  return (
    <>
      <div className=" h-screen gap-5 flex flex-col items-center justify-center text-center">
        <div className="title flex flex-col justify-center items-center">
          <Image
            src={logo}
            width={65}
            height={65}
            className="rounded-full animate-pulse transition-all ease-in duration-100"
            alt="logo"
          />
          <h1 className="sm:text-4xl text-3xl font-semibold opacity-70 text-white my-4 tracking-[3px]">
            ChatGPT
          </h1>
        </div>

        <div className="wrapper  flex sm:flex-row flex-col justify-items-start items-center sm:gap-8">
          <div className="example hidden sm:flex text-white justify-center items-center">
            <div className="flex  flex-col justify-center items-center">
              <FiSun className="text-2xl mb-2" />
              <h1 className="text-xl mb-2">Example</h1>

              <div className="box1 rounded-lg backdrop-blur-xl bg-[#19191b55] w-48 flex-wrap p-3 m-2">
                <p className=" text-white text-sm">
                  " What is difference between chatgpt and Ai assistant? "
                </p>
              </div>

              <div className="box1 rounded-lg bg-[#19191b55] w-48 p-3 m-2">
                <p className=" text-white text-sm">
                  " How do I make an HTTP request in Javascript? "
                </p>
              </div>

              <div className="box1 rounded-lg bg-[#19191b55] w-48 p-3 m-2">
                <p className=" text-white text-sm">
                  " Write a cover letter for software developer job proposal. "
                </p>
              </div>
            </div>
          </div>

          <div className="capabilities text-white flex justify-center items-center">
            <div className="example flex  flex-col justify-center items-center">
              <GiPaperWindmill className="text-2xl mb-2" />
              <h1 className="text-xl mb-2">Capabilities</h1>

              <div className="box1 rounded-lg backdrop-blur-xl bg-[#19191b55] w-48 flex-wrap p-3 m-2">
                <p className=" text-white text-sm">
                  Remembers what user said earlier in the conversation
                </p>
              </div>

              <div className="box1 rounded-lg bg-[#19191b55] w-48 p-3 m-2">
                <p className=" text-white text-sm">
                  Allows user to provide follow-up corrections
                </p>
              </div>

              <div className="box1 rounded-lg bg-[#19191b55] w-48 p-3 m-2">
                <p className=" text-white text-sm">
                  Trained to decline inappropriate or potentially offensive
                  requests
                </p>
              </div>
            </div>
          </div>

          <div className="example-container text-white hidden sm:flex justify-center items-center">
            <div className="example flex  flex-col justify-center items-center">
              <AiOutlineWarning className="text-2xl mb-2" />
              <h1 className="text-xl mb-2">Warning</h1>

              <div className="box1 rounded-lg backdrop-blur-xl bg-[#19191b55] w-48 flex-wrap p-3 m-2">
                <p className=" text-white text-sm">
                  May occasionally generate incorrect information
                </p>
              </div>

              <div className="box1 rounded-lg bg-[#19191b55] w-auto sm:w-48 p-3 m-2">
                <p className=" text-white text-sm">
                  May occasionally produce harmful instructions or biased
                  content
                </p>
              </div>

              <div className="box1 rounded-lg bg-[#19191b55] w-48 p-3 m-2">
                <p className=" text-white text-sm">
                  Limited knowledge of world and events after 2021
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* developer */}
        <div className="developer absolute bottom-2 mb-2 sm:mb-6 ">
          <h3 className="text-gray-400 opac text-sm ">
            Developed and Designed by <span>Hikmat Bangash</span>
          </h3>
        </div>
      </div>
    </>
  );
}
