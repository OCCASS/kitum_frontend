import ITask, { TTaskAnswer } from "@/types/task";
import TaskFiles from "./TaskFiles";
import { Dispatch, SetStateAction } from "react";
import MarkdownView from "@/components/Markdown";
import { twMerge } from "tailwind-merge";
import TaskViewButtons from "@/components/TasksView/TaskView/Buttons";
import TaskViewInput from "@/components/TasksView/TaskView/Input";


type TTaskViewProps = {
    number: number
    task: ITask
    disabled: boolean
    answer: TTaskAnswer
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    answerAction: (taskId: string, answer: TTaskAnswer) => Promise<void>
    skipAction: (taskId: string) => Promise<void>
    nextTask: () => void
    isLast: boolean
}

export default function TaskView({ number, task, disabled, answer, setAnswer, answerAction, skipAction, nextTask, isLast }: TTaskViewProps) {
    return (
        <div className="space-y-3">
            <h2>Задание №{number}</h2>
            {/* Content */}
            <MarkdownView content={task.content} />
            {task.files.length > 0 && <TaskFiles files={task.files} />}
            <div className={twMerge("w-full flex flex-col gap-3 md:flex-row", task.type === "T" && "md:flex-col")}>
                <TaskViewInput task={task} answer={answer} setAnswer={setAnswer} disabled={disabled} />
                <TaskViewButtons
                    task={task}
                    answer={answer}
                    disabled={disabled}
                    answerAction={answerAction}
                    skipAction={skipAction}
                    nextTask={nextTask}
                    isLast={isLast}
                />
            </div>
        </div>
    )

}

