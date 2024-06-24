import ITask, { TTaskAnswer } from "@/types/task"
import TasksBar from "./TasksBar"
import { useEffect, useState } from "react"
import Task from "./Task"
import { twMerge } from "tailwind-merge"

type TTasksProps = {
    tasks: ITask[]
    disabled: boolean
    answerTask: (taskId: string, answer: TTaskAnswer) => void
    skipTask: (taskId: string) => void
    className?: string
}

export default function Tasks({ tasks, disabled, answerTask, skipTask, className }: TTasksProps) {
    const [currentTaskIndex, setCurrentTaskIndex] = useState(0)
    const [currentTask, setCurrentTask] = useState<ITask>(tasks[0])
    const [currentAnswer, setCurrentAnswer] = useState<TTaskAnswer>([])

    const nextTask = () => {
        setCurrentTaskIndex(prev => Math.min(prev + 1, tasks.length - 1))
    }

    useEffect(() => {
        const task = tasks[currentTaskIndex]
        setCurrentTask(task)
        setCurrentAnswer(task.answer ?? [])
    }, [currentTaskIndex, tasks])

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
                nextTask={nextTask}
                isLast={currentTaskIndex === tasks.length - 1}
            />
        </div>
    )
}
