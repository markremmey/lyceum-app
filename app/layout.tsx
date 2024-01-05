import '../app/globals.css';
import SideBar from '@/components/SideBar';

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <div className="flex">
          {/* Sidebar */}
          <div className="bg-[#202123] max-w-xs h-screen overflow-y-auto md:min-w-[20rem]"><SideBar /></div>

          {/* Client Provider - Notifications */}

          <div className="bg-[#343541] flex-1">{children}</div>
        </div>
        
      </body>
    </html>
  )
}