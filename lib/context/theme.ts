import { ThemeType } from "@/types/theme";
import { Dispatch, SetStateAction, createContext } from "react";

interface Theme {
    theme: ThemeType
    setTheme: Dispatch<SetStateAction<ThemeType>>
}


const ThemeContext = createContext<Theme | null>(null)
export default ThemeContext;

