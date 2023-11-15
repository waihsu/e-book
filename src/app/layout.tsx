import '@radix-ui/themes/styles.css';
import { cn } from "@/lib/utils"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "./ThemeProvider"
import Footer from "@/components/Footer"
import { Theme } from '@radix-ui/themes';
import SessionProvider from './provider/NextAuthSessionProvider';
import { getServerSession } from 'next-auth';


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session = await getServerSession()
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className=" dark:bg-[#2D2D33] scrollbar-thin overflow-x-hidden"
      >
        <SessionProvider session={session}>
        <Theme>
        <ThemeProvider
        attribute="class"
        // defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        <Navbar />
      <div className="px-4 mt-8 md:px-10 min-h-screen">
      {children}
      
      </div>
      <Footer />
      </ThemeProvider>
      </Theme>
      </SessionProvider>
      </body>
    </html>
  )
}
