import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/user";
import bcrypt from "bcrypt"
import dbConnect from "./dbConnect";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req){
                dbConnect()
                const {email, password} = credentials; 
                const user = await User.findOne({ email })
                if(!user) throw new Error("This user is not registered")
                if(!user?.password) throw new Error("Please login using your Google account")
                const isPasswordMatched = await bcrypt.compare(password, user?.password)
                if(!isPasswordMatched) throw new Error("Incorrect password")
                return user
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({user}) {
            dbConnect()
            const {email} = user
            let dbUser = await User.findOne({email})
            if(!dbUser){
                dbUser = await User.create({
                    email,
                    name: user?.name,
                    image: user?.image
                })
            }
            return true
        },
        jwt: async ({token, user}) => {
            const userByEmail = await User.findOne({email: token.email})
            userByEmail.password = undefined
            token.user = userByEmail
            return token
        },
        session: async ({session, token}) => {
            session.user = token.user
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: "/login"
    }
};