import ITask from "@/types/task";
import TaskFiles from "./TaskFiles";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Dispatch, SetStateAction } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import Image from "next/image";
import MarkdownView from "@/components/Markdown";


type TTaskProps = {
    number: number
    task: ITask
    disabled: boolean
    answer: string
    setAnswer: Dispatch<SetStateAction<string>>
    answerAction: (taskId: string, answer: string) => void
    skipAction: (taskId: string) => void
}

const Task = ({ number, task, disabled, answer, setAnswer, answerAction, skipAction }: TTaskProps) => {
    return (
        <div className="space-y-3">
            <h2>Задание №{number}</h2>
            {/* Content */}
            <MarkdownView content={task.content} />
            {task.files.length > 0 && <TaskFiles files={task.files} />}
            <div className="w-full flex flex-col gap-3 md:flex-row md:gap-10 ">
                <Input placeholder="Ответ" className="flex-1" value={answer} onChange={(e) => setAnswer(e.target.value)} disabled={disabled} />
                <div className="flex gap-3 justify-start flex-row-reverse md:flex-row">
                    <Button onClick={() => answerAction(task.id, answer)} disabled={disabled}>Ответить</Button>
                    <Button onClick={() => skipAction(task.id)} variant="gray" disabled={disabled}>Пропустить</Button>
                </div>
            </div>
        </div>
    )

}

export default Task;

