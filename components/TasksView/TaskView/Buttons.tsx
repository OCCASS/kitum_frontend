import ITask, { TTaskAnswer } from "@/types/task";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction } from "react";

type TTaskViewButtonsProps = {
    task: ITask
    disabled: boolean
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    answer: TTaskAnswer
    isLast: boolean
    answerAction: (taskId: string, answer: TTaskAnswer) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
}

function ClearButton({ className, disabled, onClick }: { className: string, disabled: boolean, onClick: () => void }) {
    return <Button
        variant="outline"
        className={twMerge("py-2 px-2", className)}
        disabled={disabled}
        title="Очистить таблицу"
        area-label="Очистить таблицу ответов"
        onClick={onClick}
    >
        <TrashIcon className="size-6 text-gray-500" />
    </Button>
}

export default function TaskViewButtons(
    {
        task,
        answer,
        disabled,
        isLast,
        answerAction,
        skipAction,
        nextTask,
        setAnswer
    }: TTaskViewButtonsProps
) {
    return (
        <div className={twMerge("flex gap-3 justify-start flex-row-reverse md:flex-row", task.type === "T" && "justify-between flex-row")}>
            {task.answer ?
                <>
                    <ClearButton disabled={disabled} onClick={() => setAnswer([])} className={task.type === "T" ? "block" : "hidden"} />
                    <div className="space-x-3">
                        <Button
                            variant="gray"
                            disabled={disabled || isLast}
                            title="Следующее задание"
                            area-label="Следующнее задание"
                            onClick={nextTask}
                        >
                            Дальше
                        </Button>
                        <Button
                            disabled={disabled}
                            title="Ответить на задание"
                            area-label="Ответить на задание"
                            onClick={() => answerAction(task.id, answer)}
                        >
                            Ответить
                        </Button>
                    </div>
                </>
                :
                <>
                    <ClearButton disabled={disabled} onClick={() => setAnswer([])} className={task.type === "T" ? "block" : "hidden"} />
                    <div className="space-x-3">
                        <Button
                            disabled={disabled}
                            title="Ответить на задание"
                            area-label="Ответить на задание"
                            onClick={() => answerAction(task.id, answer)}
                        >
                            Ответить
                        </Button>
                        {
                            !task.isSkipped
                            &&
                            <Button
                                disabled={disabled}
                                variant="gray"
                                title="Пропустить задание"
                                area-label="Пропустить задание"
                                onClick={() => skipAction(task.id)}
                            >
                                Пропустить
                            </Button>
                        }
                    </div>
                </>
            }
        </div>
    )
}

