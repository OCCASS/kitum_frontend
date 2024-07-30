import ITask, { TTaskAnswer } from "@/types/task"
import TasksPaginator from "./TasksPaginator"
import { useEffect, useState } from "react"
import TaskView from "./TaskView"
import { twMerge } from "tailwind-merge"

type TTasksViewProps = {
    tasks: ITask[]
    disabled: boolean
    answerTask: (taskId: string, answer: TTaskAnswer) => Promise<void>
    skipTask: (taskId: string) => Promise<void>
    showAnswer: boolean
    className?: string
}

export default function TasksView({ tasks, disabled, answerTask, skipTask, showAnswer, className }: TTasksViewProps) {
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
            <TasksPaginator
                tasks={tasks}
                selected={currentTaskIndex}
                setSelected={setCurrentTaskIndex}
            />
            <TaskView
                n={currentTaskIndex + 1}
                task={currentTask}
                disabled={disabled}
                answer={currentAnswer}
                setAnswer={setCurrentAnswer}
                answerAction={answerTask}
                skipAction={skipTask}
                nextTask={nextTask}
                isLast={currentTaskIndex === tasks.length - 1}
                showAnswer={showAnswer}
            />
        </div>
    )
}
