import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";

type TTasksBarItem = {
    index: number
    isSelected: boolean
    isCorrect: boolean | null
    onClick: Dispatch<SetStateAction<number>>
}

const defaultClassName = "flex flex-auto-0 items-center justify-center size-9 text-xl md:text-lg rounded-lg cursor-pointer select-none"
const variants = {
    default: "bg-transparent",
    correct: "text-green",
    notCorrect: "text-red",
    selected: {
        default: "bg-black text-white",
        correct: "bg-green text-white",
        notCorrect: "bg-red text-white",
    }
}

const TasksBarItem = ({ index, isCorrect, isSelected, onClick }: TTasksBarItem) => {
    const className = () => {
        const key = isCorrect === null ? "default" : (isCorrect ? "correct" : "notCorrect")
        if (isSelected)
            return twMerge(defaultClassName, variants.selected[key])
        else
            return twMerge(defaultClassName, variants[key])

    }

    return <li onClick={() => onClick(index)} className={className()}>{index + 1}</li>
}

export default TasksBarItem;
