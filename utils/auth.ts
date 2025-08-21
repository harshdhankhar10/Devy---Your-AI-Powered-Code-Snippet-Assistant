import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const NEXT_AUTH = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Please enter your email and password.");
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user) {
                    throw new Error("No user found with this email.");
                }
                if (!user.isVerified) {
                    throw new Error("Please verify your email before logging in.");
                }

                const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
                if (!isPasswordCorrect) {
                    throw new Error("Incorrect password.");
                }

                await prisma.user.update({
                    where: { email: credentials.email },
                    data: { lastLogin: new Date() }
                });

                const { password, ...rest } = user;
                return rest;
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
        }),
    ],
    pages: {
        signIn: "/login",
        error: "/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ user, account, profile }: any) {
            if (account?.provider === "google") {
                const existingUser = await prisma.user.findUnique({
                    where: { email: user.email as string }
                });

                if (!existingUser) {
                    return `/login?error=GoogleAccountNotRegistered`;
                }

                if (!existingUser.isVerified) {
                    await prisma.user.update({
                        where: { email: user.email },
                        data: { isVerified: true }
                    })
                    return true;
                }
            }

            return true;
        },
        async jwt({ token, user }: any) {
            if (user) {
                token.user = user;
                const userInfo = await prisma.user.findUnique({
                    where: { email: user.email },
                });

                if (userInfo) {
                    token.user = userInfo;
                }
            }
            return token;
        },
        async session({ session, token }: any) {
            session.user = {
                id: token.user?.id,
                email: token.user?.email,
                name: token.user?.name,
                username: token.user?.username,
                profilePicture: token.user?.profilePicture,
                role: token.user?.role,
                isVerified: token.user?.isVerified,
                createdAt: token.user?.createdAt,
                updatedAt: token.user?.updatedAt,
            };
            return session;
        },
    }
}