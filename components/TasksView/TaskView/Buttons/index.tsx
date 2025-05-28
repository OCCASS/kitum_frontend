import ITask, { TTaskAnswer } from "@/types/task";
import ActionButtons from "./ActionButtons";

type TButtonsProps = {
    task: ITask
    disabled: boolean
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
    }: TButtonsProps
) {
    return (
        <div className={"flex gap-3 justify-start flex-row-reverse md:flex-row"}>
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
