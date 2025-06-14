import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // ...any other providers
  ],
  // any other NextAuth options (callbacks, pages, etc.)
};

// create the handler
const handler = NextAuth(authOptions);

// export it for both GET and POST
export { handler as GET, handler as POST };