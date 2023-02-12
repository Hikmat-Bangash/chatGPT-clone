import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <div className="flex">
         {/* //sidebar */}
          
          {/* clientProvider - notification */}

         <div className="bg-slate-600 flex-1">{children} </div>  
         
        </div>
      
      
      </body>
    </html>
  )
}
