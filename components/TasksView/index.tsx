import ITask, { TTaskAnswer } from "@/types/task"
import TasksPaginator from "./TasksPaginator"
import { useEffect, useState } from "react"
import TaskView from "./TaskView"
import { twMerge } from "tailwind-merge"
import { parseAsInteger, useQueryState } from "nuqs"

type TTasksViewProps = {
    tasks: ITask[]
    disabled: boolean
    answerTask: (taskId: string, answer: TTaskAnswer) => Promise<void>
    skipTask: (taskId: string) => Promise<void>
    showAnswer: boolean
    className?: string
}

export default function TasksView({ tasks, disabled, answerTask, skipTask, showAnswer, className }: TTasksViewProps) {
    const [currentTask, setCurrentTask] = useQueryState<number>("task", parseAsInteger.withDefault(0))
    const task = tasks[Math.min(tasks.length - 1, Math.max(0, currentTask))]
    const [currentAnswer, setCurrentAnswer] = useState<TTaskAnswer>(task.answer ?? task.answerFile ?? null)

    useEffect(() => {
        if (currentTask < 0) setCurrentTask(0)
        else if (currentTask > tasks.length - 1) setCurrentTask(tasks.length - 1)
    }, [])

    const getTask = (index: number) => {
        index = Math.min(tasks.length - 1, Math.max(0, index))
        return tasks[index]
    }

    const setAnswer = (task: ITask) => {
        if (task.answer) setCurrentAnswer(task.answer)
        else if (task.answerFile) setCurrentAnswer(task.answerFile)
        else setCurrentAnswer(null)
    }

    const nextTask = () => {
        const nextIndex = Math.min(currentTask + 1, tasks.length - 1)
        setTask(nextIndex)
    }

    const setTask = (index: number) => {
        const task = getTask(index)
        setCurrentTask(index)
        setAnswer(task)
    }

    return (
        <div className={twMerge("space-y-3 max-w-prose", className)}>
            {
                tasks.length > 0 ?
                    <>
                        <TasksPaginator
                            tasks={tasks}
                            selected={currentTask}
                            setSelected={setTask}
                        />
                        <TaskView
                            n={currentTask + 1}
                            task={getTask(currentTask)}
                            disabled={disabled}
                            answer={currentAnswer}
                            setAnswer={setCurrentAnswer}
                            answerAction={answerTask}
                            skipAction={skipTask}
                            nextTask={nextTask}
                            isLast={currentTask === tasks.length - 1}
                            showAnswer={showAnswer}
                        />
                    </>
                    :
                    <p className="w-full text-center text-gray-text py-3">Список задач пуст</p>
            }
        </div>
    )
}
