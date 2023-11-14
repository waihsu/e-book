import '@radix-ui/themes/styles.css';
import { cn } from "@/lib/utils"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "./ThemeProvider"
import NextAuthSessionProvider from "./provider/NextAuthSessionProvider"
import Footer from "@/components/Footer"
import { Theme } from '@radix-ui/themes';


export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className="bg-[#2D2D33] scrollbar-thin overflow-x-hidden"
      >
        <NextAuthSessionProvider>
        <Theme>
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        <Navbar />
      <div className="px-4 md:px-10 min-h-screen">
      {children}
      
      </div>
      <Footer />
      </ThemeProvider>
      </Theme>
      </NextAuthSessionProvider>
      </body>
    </html>
  )
}
