import connectDB from "../../db/connectDB";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "../../db/models/Users";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectDB();
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email e senha são obrigatórios!");
        }

        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Usuário não encontrado!");
        }

        const isValid = await compare(credentials.password, user.password);
        if (!isValid) {
          throw new Error("Senha incorreta!");
        }

        return { id: user._id, name: user.name, email: user.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
