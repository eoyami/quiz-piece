import withAuth from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    authorized({ token }) {
      return !!token; // Apenas permite usuários autenticados
    },
  },
});

export const config = {
  matcher: ["/game"],
};
