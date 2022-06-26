import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  getUserDataFromFile,
  readMyFile,
  writeINFile,
} from "../../../config/fileReader";
import GoogleProvider from "next-auth/providers/google";
import { checkedLoginUserAccessStatus } from "../../../components/utils/sharedutils";
export default NextAuth({
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials, request) {
        const response = JSON.parse(credentials.userCred);
        const allUsers = getUserDataFromFile();
        const user = allUsers.find((ele) => ele.email === response.email);
        if (!user) {
          return null;
        }
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session }) => {
      const { user } = session;
      const filterUser = insetUserIntoFileSystem(user);
      const userDetails = user ? filterUser : null;
      if (checkedLoginUserAccessStatus(user.email)) {
        userDetails.name = "Admin";
      }
      if (userDetails) {
        session.user = {
          ...userDetails,
          name: userDetails.first_name
            ? userDetails.first_name[0] + userDetails.last_name[0]
            : userDetails.name,
        };
      }
      return Promise.resolve(session);
    },
  },
});

function insetUserIntoFileSystem(user) {
  const allData = readMyFile();
  const allUsers = [...allData.users];
  const currentUser = allUsers.find((ele) => ele.email === user?.email);
  const newUser = {
    ...user,
    imageUrl:
      user.imageUrl || "https://source.unsplash.com/random/900X700/?avatar",
    balance_points: currentUser.balance_points || 500,
    id: !currentUser.id ? allUsers.length + 1 : currentUser.id,
  };
  if (!allUsers.find((ele) => ele.email === newUser.email)) {
    allUsers.push(newUser);
  }
  if (JSON.stringify(allUsers) !== JSON.stringify(allData.users)) {
    writeINFile("content-mock.json", { ...allData, users: allUsers });
  }
  return newUser;
}
