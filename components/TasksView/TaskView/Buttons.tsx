import ITask, {TTaskAnswer} from "@/types/task";
import {twMerge} from "tailwind-merge";
import Button from "@/components/ui/Button";

type TTaskViewButtonsProps = {
    task: ITask
    disabled: boolean
    answer: TTaskAnswer
    answerAction: (taskId: string, answer: TTaskAnswer) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
    isLast: boolean
}

export default function TaskViewButtons({ task, answer, disabled, answerAction, skipAction, nextTask, isLast }: TTaskViewButtonsProps) {
    return (
        <div className={twMerge("flex gap-3 justify-start flex-row-reverse md:flex-row", task.type === "T" && "md:justify-end")}>
            {task.answer ?
                <>
                    <Button onClick={nextTask} variant="gray" disabled={disabled || isLast}>Дальше</Button>
                    <Button onClick={() => answerAction(task.id, answer)} disabled={disabled}>Ответить</Button>
                </>
                :
                <>
                    <Button onClick={() => answerAction(task.id, answer)} disabled={disabled}>Ответить</Button>
                    {!task.isSkipped && <Button onClick={() => skipAction(task.id)} variant="gray" disabled={disabled}>Пропустить</Button>}
                </>
            }
        </div>
    )
}

