import ITask from "@/types/task";
import DesktopTasksBar from "./desktop";
import { Dispatch, SetStateAction } from "react";
import MobileTasksBar from "./mobile";

export type TTasksBarProps = {
    tasks: ITask[]
    selected: number
    setSelected: Dispatch<SetStateAction<number>>
}


export default function TasksBar(props: TTasksBarProps) {
    return <>
        <DesktopTasksBar {...props} />
        <MobileTasksBar {...props} />
    </>
}
