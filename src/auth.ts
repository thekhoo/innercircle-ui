import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Apple from "next-auth/providers/apple";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google,
    Apple,
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
