import User from '@models/users';
import { connectToDB } from '@utils/database';
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  callbacks: {
    async signIn({ profile }) {
      try {
        await connectToDB();

        const userExist = await User.findOne({
          email: profile.email
        });

        if (!userExist) {
          await User.create({
            email: profile.email,
            username: profile.name.replaceAll(' ', '').toLowerCase(),
            image: profile.picture
          });
        }
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async session({ session }) {
      const sessionUser = await User.findOne({
        email: session.user.email
      });
      session.user.id = sessionUser._id.toString();
      return session;
    }
  }
});

export { handler as GET, handler as POST };
