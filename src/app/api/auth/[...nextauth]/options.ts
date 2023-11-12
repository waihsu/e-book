import { config } from "@/config/config";
import { prisma } from "@/libs/prisma";
import { User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export const authOptions:NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: config.GOOGLE_CLIENT_ID,
        clientSecret: config.GOOGLE_CLIENT_SECRET
      })
    // ...add more providers here
  ],
  pages: {
    signIn: "/account/signin"
  },
  secret: config.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === "google") {
        const existUser = await prisma.user.findFirst({where: {email: profile?.email}})
        if (!existUser) {
            await prisma.user.create({data: {
                email: profile?.email as string,
                name: profile?.name,
                role: "USER"
            }})
        }
        return true
      }
      return true // Do different verification for other providers that don't have `email_verified`
    },
    async jwt({ token, user }) {
        return { ...token, ...user };
      },
    async session({ session, token }) {

        const user = await prisma.user.findFirst({where: {email: token.email as string}})
       
        session.user = user as User
        return session
      },
  }
}

export default NextAuth(authOptions)