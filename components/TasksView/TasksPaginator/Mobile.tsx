import { TTasksPaginatorProps } from "."
import TasksBarItem from "./Item"

export default function MobilePaginator({ tasks, selected, setSelected }: TTasksPaginatorProps) {
    return (
        <ul className="flex md:hidden gap-2 py-2 overflow-y-auto">
            {tasks.map((task, index) => <TasksBarItem
                key={index}
                index={index}
                isCorrect={task.isCorrect}
                isSelected={selected === index}
                onClick={setSelected}
            />)}
        </ul>
    )
}

