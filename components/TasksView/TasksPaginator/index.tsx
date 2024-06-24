import ITask from "@/types/task";
import DesktopPaginator from "./Desktop";
import { Dispatch, SetStateAction } from "react";
import MobilePaginator from "./Mobile";

export type TTasksPaginatorProps = {
    tasks: ITask[]
    selected: number
    setSelected: Dispatch<SetStateAction<number>>
}


export default function TasksPaginator(props: TTasksPaginatorProps) {
    return <>
        <DesktopPaginator {...props} />
        <MobilePaginator {...props} />
    </>
}
