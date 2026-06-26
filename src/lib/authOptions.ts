import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        await connectDB();
        const user = await User.findOne({ email: credentials.email.toLowerCase() });
        if (!user) return null;

        const valid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!valid) return null;

        return {
          id:            user._id.toString(),
          name:          user.name,
          email:         user.email,
          role:          user.role,
          emailVerified: user.emailVerified,
          phone:         user.phone ?? null,
          createdAt:     user.createdAt?.toISOString() ?? null,
        };
      },
    }),
  ],
  session:  { strategy: "jwt" },
  pages:    { signIn: "/login" },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const u = user as any;
        token.role          = u.role          as string;
        token.id            = user.id;
        token.emailVerified = u.emailVerified as boolean;
        token.phone         = u.phone         as string | null;
        token.createdAt     = u.createdAt     as string | null;
      }
      // On session.update() call, refresh emailVerified from DB
      if (trigger === "update") {
        await connectDB();
        const dbUser = await User.findById(token.id as string).select("emailVerified phone name");
        if (dbUser) {
          token.emailVerified = dbUser.emailVerified;
          token.phone         = dbUser.phone ?? null;
          token.name          = dbUser.name;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        const u = session.user as Record<string, unknown>;
        u.id            = token.id as string;
        u.role          = token.role as string;
        u.emailVerified = token.emailVerified as boolean;
        u.phone         = token.phone as string | null;
        u.createdAt     = token.createdAt as string | null;
      }
      return session;
    },
  },
};
