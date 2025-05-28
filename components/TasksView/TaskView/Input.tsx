import ITask, { TTaskAnswer } from "@/types/task";
import { Dispatch, SetStateAction } from "react";
import Input from "@/components/ui/Input";
import Link from "next/link";

type TTaskViewInputProps = {
    task: ITask
    answer: TTaskAnswer
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    disabled: boolean
}

export default function TaskViewInput({ task, answer, disabled, setAnswer }: TTaskViewInputProps) {
    if (task.type === "A") {
        return (
            <Input
                placeholder="Введите ответ"
                className="flex-1"
                value={typeof answer === "string" ? answer : ""}
                onChange={(e) => setAnswer(e.target.value)}
                disabled={disabled}
                variant="gray"
            />
        )
    }

    return (
        <div className="flex-1">
            <Input
                type="file"
                className="w-full mb-1"
                onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) setAnswer(file)
                }}
                disabled={disabled}
                variant="gray"
            />
            {typeof answer === "string" &&
                <Link className="text-blue underline" href={answer} target="_blank" rel="noopener noreferer">Текущий ответ</Link>
            }
        </div>
    )
}
