import { cn } from "@/lib/utils"
import "./globals.css"
import { Inter as FontSans } from "next/font/google"
import Navbar from "@/components/Navbar"
import { ThemeProvider } from "./ThemeProvider"


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
        className="bg-[#2D2D33] scrollbar-thin"
      >
        <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange>
        <Navbar />
      <div className="px-10">
      {children}
      </div>
      </ThemeProvider>
      </body>
    </html>
  )
}
