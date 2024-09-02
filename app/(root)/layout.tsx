import Aside from "@/components/shared/Aside";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex h-screen flex-col">
            <Aside/> 
            <main className="flex-1 pl-20 pt-4">{children}</main>
        </div>
        
    );
}
  