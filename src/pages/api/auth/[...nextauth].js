import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";
import {connectToDatabase} from "../../../util/mongodb";

const getUser = async (username, password) => {
  const {db} = await connectToDatabase();
  let response = await db.collection("accounts").findOne({username: username});
  if (
    response &&
    response.username === username &&
    response.password === password
  ) {
    return response;
  }
  return null;
};

export default NextAuth({
  providers: [
    CredentialProvider({
      authorize: async (credentials) => {
        // database look up
        if (credentials.username && credentials.password) {
          const response = await getUser(
            credentials.username,
            credentials.password
          );

          if (
            response &&
            credentials.username === response.username &&
            credentials.password === response.password
          ) {
            return {
              id: response._id,
              name: response.username,
            };
          }
        }
        // login failed

        // if (credentials.username === "" && credentials.password === "") {
        //   return {
        //     id: 2,
        //     name: "John",
        //   };
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({session, token}) {
      if (token) {
        // session.admin = false;
        session.admin = true; // Development purpose

        session.id = token.id;
        const {db} = await connectToDatabase();
        const response = await db
          .collection("accounts")
          .findOne({username: token.name});
        if (response && response.type === "Admin") {
          session.admin = true;
        }
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
    error: "/signin",
  },
});
