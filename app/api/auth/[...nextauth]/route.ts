import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    // …any other providers
  ],
  // …any other NextAuth.js options (callbacks, pages, etc.)
});

// App-Router API routes must use named exports for each HTTP method
export { handler as GET, handler as POST };