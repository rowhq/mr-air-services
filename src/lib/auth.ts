import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { sql } from "@vercel/postgres";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const result = await sql`
          SELECT id, email, password_hash, name, role
          FROM users
          WHERE email = ${credentials.email}
        `;

        const user = result.rows[0];

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password_hash
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};

// Type augmentation for NextAuth
declare module "next-auth" {
  interface User {
    id: string;
    role: string;
  }
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
  }
}

// Helper to get session in API routes
export async function getSession() {
  return await getServerSession(authOptions);
}

// Helper to check if user is authenticated
export async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return null;
  }
  return session.user;
}
