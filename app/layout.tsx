import './globals.css'
import Sidebar from '../components/Sidebar'
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/pages/api/auth/[...nextauth]'
import Login from '@/components/Login'

 const RootLayout = async({
  children,
}: {
  children: React.ReactNode
  }) => {
  
  const session = await getServerSession(authOptions);
   console.log(session)
   
  return (
    <html>
      <head />
      <body>

        <SessionProvider session={session}>

        {!session ?
            <Login />
            : 
        <div className="flex">
          <div className="h-screen max-w-xs overflow-y-auto md:min-w-[16rem] bg-[#202123]">
          <Sidebar/>
          </div>
          
          {/* clientProvider - notification */}
         <div className="bg-gray-800 flex-1">{children} </div>  
        </div>
        }
      
        </SessionProvider>
      
      </body>
    </html>
  )
}

export default RootLayout;