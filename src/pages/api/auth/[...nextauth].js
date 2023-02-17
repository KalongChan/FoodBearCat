import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "text",
          placeholder: "johndoe@test.com",
        },
        password: {label: "Password", type: "password"},
      },
      authorize: (credentials) => {
        // database look up
        if (credentials.username === "" && credentials.password === "") {
          return {
            id: 2,
            name: "John",
            email: "johndoe@test.com",
          };
        }

        // login failed
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    async session({session, token}) {
      if (token) {
        session.admin = true;
        session.id = token.id;
      }
      return session;
    },

    async redirect({url, baseUrl}) {
      return baseUrl;
    },
  },
  jwt: {
    secret: "test",
    encryption: true,
  },
  pages: {
    signIn: "/signin",
  },
});
