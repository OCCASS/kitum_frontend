import ITask, { TTaskAnswer } from "@/types/task";
import Files from "./Files";
import { Dispatch, SetStateAction } from "react";
import { twMerge } from "tailwind-merge";
import Buttons from "./Buttons"
import TaskViewInput from "@/components/TasksView/TaskView/Input";
import dynamic from "next/dynamic";
import { MarkdownViewSkeleton } from "@/components/Markdown";
import CorrectAnswer from "@/components/TasksView/CorrectAnswer";

type TTaskViewProps = {
    n: number
    task: ITask
    disabled: boolean
    answer: TTaskAnswer
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    answerAction: (taskId: string, answer: TTaskAnswer) => Promise<void>
    skipAction: (taskId: string) => Promise<void>
    nextTask: () => void
    isLast: boolean
    showAnswer: boolean
}

const DynamicMarkdownView = dynamic(() => import("@/components/Markdown"), {
    ssr: false, loading: () => <MarkdownViewSkeleton />
})

export default function TaskView({ n, task, disabled, answer, setAnswer, answerAction, skipAction, nextTask, isLast, showAnswer }: TTaskViewProps) {
    return (
        <div className="space-y-3">
            <h2>Задание №{n}</h2>
            {/* Content */}
            <DynamicMarkdownView content={task.content} />
            {task.files.length > 0 && <Files files={task.files} />}
            {(task.correctAnswer && showAnswer) && <CorrectAnswer answer={task.correctAnswer} />}
            <div className={twMerge("w-full flex flex-col gap-3 md:flex-row", task.type === "T" && "md:flex-col")}>
                <TaskViewInput task={task} answer={answer} setAnswer={setAnswer} disabled={disabled} />
                <Buttons
                    task={task}
                    setAnswer={setAnswer}
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
