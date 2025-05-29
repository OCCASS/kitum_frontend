import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials, req) {
                try {
                    const res = await fetch("http://localhost:8000/auth/login/", {
                        method: 'POST',
                        body: JSON.stringify({ email: credentials?.email, password: credentials?.password }),
                        headers: {
                            "X-Fingerprint": "",
                            "User-Agent": "",
                            "Content-Type": "application/json",
                        }
                    });
                    const data = await res.json();
                    if (res.ok && data) {
                        return data.user
                    } else {
                        console.error('Authorization failed:', data);
                        return null;
                    }
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: "/signin"
    },
    session: { strategy: "jwt" },
    callbacks: {
        async jwt({ token, user }) {
            console.log("token", token)
            console.log("user", user)
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            console.log("session", session)
            console.log("token", session)
            session.user = token as any;
            return session;
        }
    }

})
