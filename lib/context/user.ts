import IUser from "@/types/user";
import { Dispatch, SetStateAction, createContext } from "react";

interface User {
    user: IUser | null
    setUser: Dispatch<SetStateAction<IUser | null>>
}

const UserContext = createContext<User | null>(null)
export default UserContext;
