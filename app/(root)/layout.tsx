import Aside from "@/components/shared/Aside";
import { ToastContainer } from 'react-toastify';

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex h-screen flex-col">
            <Aside/> 
            <main className="flex-1 pl-20 pt-4 w-full">{children}</main>
            <ToastContainer/>
        </div>
        
    );
}
  