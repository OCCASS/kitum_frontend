import ITask from "@/types/task";
import WidePaginator from "./Wide";
import CompactPaginator from "./Compact";

export type TTasksPaginatorProps = {
    tasks: ITask[]
    selected: number
    setSelected: (index: number) => void
}


export default function TasksPaginator(props: TTasksPaginatorProps) {
    const shouldUseCompactPaginator = props.tasks.length <= 5

    return (
        <>
            {!shouldUseCompactPaginator && <WidePaginator {...props} />}
            <CompactPaginator {...props} forceVisible={shouldUseCompactPaginator} />
        </>
    )
}
