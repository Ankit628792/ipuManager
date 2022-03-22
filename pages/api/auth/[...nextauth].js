import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials';
import { createSessionHandler } from '../../../server/controller/user.controller';
import connectDB from '../db';

export default NextAuth({
    //Configure JWT
    session: {
        jwt: true,
    },

    providers:
        [
            CredentialsProvider({
                async authorize(credentials) {
                    //Connect to DB
                    try {
                        const client = await connectDB()
                        const result = await createSessionHandler(credentials)
                        //Not found - send error res
                        if (result.status == 401) {
                            throw new Error('Unauthorised user');
                        }
                        return result;
                    } catch (error) {
                        console.log(error)
                    }
                },
            })
        ],
    secret: 'helloworldsecretkey',
    callbacks: {
        async jwt(props) {
            return { ...props.token, ...props.user }
        },
        async session({ session, token }) {
            if (session && token) {
                session.user = token;
                //     // session.user.username = token?.name?.split(" ").join("").toLocaleLowerCase();
                return session;
            }
        }
    }
})