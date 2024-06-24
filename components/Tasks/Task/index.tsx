import ITask, { TTaskAnswer } from "@/types/task";
import TaskFiles from "./TaskFiles";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction } from "react";
import MarkdownView from "@/components/Markdown";
import { twMerge } from "tailwind-merge";


type TTaskProps = {
    number: number
    task: ITask
    disabled: boolean
    answer: TTaskAnswer
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    answerAction: (taskId: string, answer: TTaskAnswer) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
    isLast: boolean
}

type TTaskViewButtonsProps = {
    task: ITask
    disabled: boolean
    answer: TTaskAnswer
    answerAction: (taskId: string, answer: TTaskAnswer) => void
    skipAction: (taskId: string) => void
    nextTask: () => void
    isLast: boolean
}

export default function Task({ number, task, disabled, answer, setAnswer, answerAction, skipAction, nextTask, isLast }: TTaskProps) {
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

function TaskViewInput(
    { task, answer, setAnswer, disabled }: { task: ITask, answer: TTaskAnswer, setAnswer: Dispatch<SetStateAction<TTaskAnswer>>, disabled: boolean }
) {
    if (task.type === "A") {
        return <Input placeholder="Введите ответ" className="flex-1" value={answer} onChange={(e) => setAnswer([e.target.value])} disabled={disabled} />
    }

    const removeTrailingEmptyStrings = (arr: string[]): string[] => {
        let filteredArray = [...arr];

        while (filteredArray.length > 0 && filteredArray[filteredArray.length - 1] === '') {
            filteredArray.pop();
        }

        return filteredArray;
    }

    const answerFromTable = (colIndex: number, rowIndex: number, newAnswer: string) => {
        const index = rowIndex * 2 + colIndex
        if (answer.length === index) {
            setAnswer(prev => {
                return [...prev, newAnswer]
            })
        } else if (answer.length < index + 1) {
            setAnswer(prev => {
                prev.push()
                return [...prev, ...new Array(index - answer.length).fill(""), newAnswer]
            })
        } else {
            setAnswer(prev => {
                const copyPrev = [...prev]
                copyPrev[index] = newAnswer
                return removeTrailingEmptyStrings(copyPrev)
            })
        }
    }

    return (
        <table className="border-collapse flex-1">
            <thead>
                <tr>
                    <th className="border border-gray-300 font-normal py-1"></th>
                    <th className="border border-gray-300 font-normal py-1">1</th>
                    <th className="border border-gray-300 font-normal py-1">2</th>
                </tr>
            </thead>
            <tbody>
                {
                    new Array(10).fill(0).map(
                        (_, index) => (
                            <tr key={index}>
                                <th className="border border-gray-300 font-normal text-gray-400 px-2">{index + 1}</th>
                                <td className="border border-gray-300">
                                    <Input
                                        variant="none"
                                        className="px-2 py-1"
                                        disabled={disabled}
                                        value={answer[index * 2] ?? ""}
                                        onChange={e => answerFromTable(0, index, e.target.value)}
                                    />
                                </td>
                                <td className="border border-gray-300">
                                    <Input
                                        variant="none"
                                        className="px-2 py-1"
                                        disabled={disabled}
                                        value={answer[index * 2 + 1] ?? ""}
                                        onChange={e => answerFromTable(1, index, e.target.value)}
                                    />
                                </td>
                            </tr>
                        )
                    )
                }
            </tbody>
        </table >
    )
}

function TaskViewButtons({ task, answer, disabled, answerAction, skipAction, nextTask, isLast }: TTaskViewButtonsProps) {
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

