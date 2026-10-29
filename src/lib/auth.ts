import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        try {
          const admin = await prisma.adminUser.findUnique({
            where: { username: credentials.username },
          });

          if (!admin) {
            // Prevent timing attacks: still hash even if user not found
            await bcrypt.compare(credentials.password, "$2a$12$invalidhashfortimingprotection");
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, admin.passwordHash);
          if (!isValid) return null;

          return {
            id: admin.id,
            name: admin.username,
            email: `${admin.username}@modiservices.local`,
          };
        } catch (error) {
          console.error("[NextAuth] authorize error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60, // 8 hours
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
};
