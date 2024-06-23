import ITask from "@/types/task"
import TasksBar from "./TasksBar"
import { useEffect, useState } from "react"
import Task from "./Task"
import { twMerge } from "tailwind-merge"

type TTasksProps = {
    tasks: ITask[]
    disabled: boolean
    answerTask: (taskId: string, answer: string) => void
    skipTask: (taskId: string) => void
    className?: string
}

export default function Tasks({ tasks, disabled, answerTask, skipTask, className }: TTasksProps) {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
    const [currentTask, setCurrentTask] = useState<ITask>(tasks[0])
    const [currentAnswer, setCurrentAnswer] = useState("")

    useEffect(() => {
        const task = tasks[currentTaskIndex]
        setCurrentTask(task)
        setCurrentAnswer(task.answer ?? "")
    }, [currentTaskIndex])

    return (
        <div className={twMerge("space-y-3 max-w-prose", className)}>
            <TasksBar
                tasks={tasks}
                selected={currentTaskIndex}
                setSelected={setCurrentTaskIndex}
            />
            <Task
                number={currentTaskIndex + 1}
                task={currentTask}
                disabled={disabled}
                answer={currentAnswer}
                setAnswer={setCurrentAnswer}
                answerAction={answerTask}
                skipAction={skipTask}
            />
        </div>
    )
}
