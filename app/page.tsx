import { SunIcon, ExclamationTriangleIcon, BoltIcon } from "@heroicons/react/24/outline";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen px-2 text-white ">
        <h2 className="font-bold text-5xl mb-10">chatGPT</h2>

        <div className=" flex space-x-3 text-center">
          <div>
            <div className="flex flex-col justify-center items-center mb-5 ">
              <SunIcon className="h-6 w-6 text-white" />
              <h2>Examples</h2>
            </div>

            <div className="space-y-2">
              <p className="InfoText"> "Explain something to me" </p>
              <p className="InfoText">
                "What is difference between a dog and cat"
              </p>
              <p className="InfoText"> "What is the color of sun" </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center items-center mb-5 ">
              <BoltIcon className="h-6 w-6 text-white" />
              <h2>Capibilites</h2>
            </div>

            <div className="space-y-2">
              <p className="InfoText">
                Remember what user said earlier in the conversation
              </p>
              <p className="InfoText">
                Allows users to provide follow-up corrections
              </p>
              <p className="InfoText">
                Trained to declined inappropriate requests
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-col justify-center items-center mb-5 ">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
              <h2>Limitations</h2>
            </div>

            <div className="space-y-2">
              <p className="InfoText">
                Remember what user said earlier in the conversation
              </p>
              <p className="InfoText">
                Allows users to provide follow-up corrections
              </p>
              <p className="InfoText">
                Trained to declined inappropriate requests
              </p>
            </div>
          </div>
          
        </div>
      </div>
    </>
  );
}
