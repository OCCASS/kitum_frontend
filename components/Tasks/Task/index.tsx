import ITask from "@/types/task";
import TaskFiles from "./TaskFiles";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction } from "react";
import MarkdownView from "@/components/Markdown";


type TTaskProps = {
    number: number
    task: ITask
    disabled: boolean
    answer: string
    setAnswer: Dispatch<SetStateAction<string>>
    answerAction: (taskId: string, answer: string) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
    isLast: boolean
}

type TTaskViewFooterProps = {
    task: ITask
    disabled: boolean
    answer: string
    answerAction: (taskId: string, answer: string) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
    isLast: boolean
}

function TaskViewFooter({ task, answer, disabled, answerAction, skipAction, nextTask, isLast }: TTaskViewFooterProps) {
    return (
        <div className="flex gap-3 justify-start flex-row-reverse md:flex-row">
            {task.answer ?
                <>
                    <Button onClick={nextTask} variant="gray" disabled={disabled || isLast}>Дальше</Button>
                    <Button onClick={() => answerAction(task.id, answer)} disabled={disabled}>Ответить</Button>
                </>
                :
                <>
                    <Button onClick={() => answerAction(task.id, answer)} disabled={disabled}>Ответить</Button>
                    <Button onClick={() => skipAction(task.id)} variant="gray" disabled={disabled}>Пропустить</Button>
                </>
            }
        </div>
    )
}

export default function Task({ number, task, disabled, answer, setAnswer, answerAction, skipAction, nextTask, isLast }: TTaskProps) {
    return (
        <div className="space-y-3">
            <h2>Задание №{number}</h2>
            {/* Content */}
            <MarkdownView content={task.content} />
            {task.files.length > 0 && <TaskFiles files={task.files} />}
            <div className="w-full flex flex-col gap-3 md:flex-row md:gap-10 ">
                <Input placeholder="Ответ" className="flex-1" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={disabled} />
                <TaskViewFooter
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

