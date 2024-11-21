import type { Metadata } from "next";
import { Poppins, Playfair_Display, Aleo } from "next/font/google";
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from "@clerk/nextjs";
import "./globals.css";

const poppins = Poppins({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-poppins'
});

const playfair = Playfair_Display({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-playfair_display'
});

const aleo = Aleo({ 
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: '--font-aleo'
});

export const metadata: Metadata = {
    title: "Moore",
    description: "A wedding organizer agency",
    icons: {
        icon: '/ic_web_browser.png',
    }
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <ClerkProvider >
            <html lang="en">
                <body className={`${poppins.variable} ${playfair.variable} ${aleo.variable}`}>
                    <SignedOut>
                        <div className="w-screen h-screen flex items-center justify-center">
                            <SignIn  appearance={{
                                elements: {
                                footerAction: { display: "none"  },
                                },
                            }} />
                        </div>
                    </SignedOut>
                    <SignedIn>
                        {children}
                    </SignedIn>
                </body>
            </html>
        </ClerkProvider>
    );
}
