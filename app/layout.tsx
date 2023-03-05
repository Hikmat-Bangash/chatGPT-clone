import "./globals.css";
// import Sidebar from "../components/Sidebar";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Login from "@/components/Login";
import ClientProvider from "@/components/ClientProvider";
import Navbar from "@/components/Navbar";
import Side_and_Navbar from "@/components/Side_and_Navbar";



const RootLayout = async ({ children }: { children: React.ReactNode }) => {


  const session = await getServerSession(authOptions);

  return (
    <html>
      <head />
      <body>
        <SessionProvider session={session}>
          {!session ? (
            <Login />
          ) : (
            <>
              <div className="flex overflow-x-hidden">
                <Side_and_Navbar />

                {/* clientProvider - notification */}
                <ClientProvider />
                <div className="bg-[#42444e] font-normal w-full sm:w-auto sm:flex-1">
                  {children}
                </div>
              </div>
            </>
          )}
        </SessionProvider>
      </body>
    </html>
  );
};

export default RootLayout;
