import IUserSubscription from "@/types/user_subscription";

export default interface IUser {
    id: string
    email: string
    firstName: string
    lastName: string
    birthday: string
    createdAt: string
    avatar: string
    subscription: IUserSubscription | null
}
