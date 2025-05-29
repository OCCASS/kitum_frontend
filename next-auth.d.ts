import "next-auth";

declare module "next-auth" {
  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
    birthday: string
    createdAt: string
    avatar: string
    subscriptions: IUserSubscription[]
  }

  interface Session extends DefaultSession {
    user: User;
    expires_in: string;
    error: string;
  }
}