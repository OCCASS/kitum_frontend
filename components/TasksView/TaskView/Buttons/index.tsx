import ITask, { TTaskAnswer } from "@/types/task";
import { twMerge } from "tailwind-merge";
import { Dispatch, SetStateAction } from "react";
import ActionButtons from "./ActionButtons";
import ClearButton from "./ClearButton";

type TButtonsProps = {
    task: ITask
    disabled: boolean
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    answer: TTaskAnswer
    isLast: boolean
    answerAction: (taskId: string, answer: TTaskAnswer) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
}

export default function Buttons(
    {
        task,
        answer,
        disabled,
        isLast,
        answerAction,
        skipAction,
        nextTask,
        setAnswer
    }: TButtonsProps
) {
    return (
        <div className={twMerge("flex gap-3 justify-start flex-row-reverse md:flex-row", task.type === "T" && "justify-between flex-row")}>
            {task.type === "T" && <ClearButton disabled={disabled} onClick={() => setAnswer([])} />}
            <ActionButtons
                task={task}
                disabled={disabled}
                answerAction={answerAction}
                skipAction={skipAction}
                nextTask={nextTask}
                answer={answer}
                isLast={isLast}
            />
        </div>
    )
}
