import Aside from "@/components/shared/Aside";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
        <div className="flex h-screen flex-col">
            <Aside/>
            <main className="flex-1">{children}</main>
        </div>
        
    );
}
  