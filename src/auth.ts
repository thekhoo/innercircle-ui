import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      // After any sign-in, always send the user to the welcome page
      if (url.startsWith(baseUrl)) return url;
      return `${baseUrl}/welcome`;
    },
  },
});
