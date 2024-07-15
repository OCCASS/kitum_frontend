import ITask, { TTaskAnswer } from "@/types/task";
import { twMerge } from "tailwind-merge";
import Button from "@/components/ui/Button";
import { TrashIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import LoadingButton from "@/components/ui/LoadingButton";

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

function ClearButton({ disabled, onClick }: { disabled: boolean, onClick: () => void }) {
    return <Button
        variant="outline"
        className="py-2 px-2"
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
    const [isLoading, setIsLoading] = useState(false)

    const actionWrapper = async (action: any, ...args: any) => {
        if (!isLoading) {
            setIsLoading(true)
            await action(...args)
            setIsLoading(false)
        }
    }

    return (
        <div className={twMerge("flex gap-3 justify-start flex-row-reverse md:flex-row", task.type === "T" && "justify-between flex-row")}>
            {task.type === "T" && <ClearButton disabled={disabled} onClick={() => setAnswer([])} />}
            {task.answer ?
                <>
                    <div className="space-x-3">
                        <Button
                            variant="gray"
                            disabled={disabled || isLast}
                            title="Следующее задание"
                            area-label="Следующнее задание"
                            onClick={nextTask}
                        >
                            Далее
                        </Button>
                        <LoadingButton
                            disabled={disabled}
                            title="Ответить на задание"
                            area-label="Ответить на задание"
                            onClick={() => actionWrapper(answerAction, task.id, answer)}
                            isLoading={isLoading}
                        >
                            Ответить
                        </LoadingButton>
                    </div>
                </>
                :
                <>
                    <div className="space-x-3">
                        <LoadingButton
                            disabled={disabled}
                            title="Ответить на задание"
                            area-label="Ответить на задание"
                            onClick={() => actionWrapper(answerAction, task.id, answer)}
                            isLoading={isLoading}
                        >
                            Ответить
                        </LoadingButton>
                        {
                            !task.isSkipped
                            &&
                            <LoadingButton
                                disabled={disabled}
                                variant="gray"
                                title="Пропустить задание"
                                area-label="Пропустить задание"
                                onClick={() => actionWrapper(skipAction, task.id)}
                                isLoading={isLoading}
                            >
                                Пропустить
                            </LoadingButton>
                        }
                    </div>
                </>
            }
        </div>
    )
}
