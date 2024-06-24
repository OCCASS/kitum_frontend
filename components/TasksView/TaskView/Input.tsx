import ITask, {TTaskAnswer} from "@/types/task";
import {Dispatch, SetStateAction} from "react";
import Input from "@/components/ui/Input";
import {removeTrailingEmptyStrings} from "@/utils/array";

type TTaskViewInputProps = {
    task: ITask
    answer: TTaskAnswer
    setAnswer: Dispatch<SetStateAction<TTaskAnswer>>
    disabled: boolean
}

export default function TaskViewInput({ task, answer, disabled, setAnswer }: TTaskViewInputProps) {
    if (task.type === "A") {
        return <Input placeholder="Введите ответ" className="flex-1" value={answer} onChange={(e) => setAnswer([e.target.value])} disabled={disabled} variant="gray" />
    }

    const answerFromTable = (colIndex: number, rowIndex: number, newAnswer: string) => {
        const index = rowIndex * 2 + colIndex; // 2d table with 2 cols index to 1d array index

        setAnswer(prev => {
            let updatedAnswer = [...prev];

            if (index >= updatedAnswer.length) {
                updatedAnswer = [...updatedAnswer, ...new Array(index - updatedAnswer.length).fill(""), newAnswer];
            } else {
                updatedAnswer[index] = newAnswer;
            }

            return removeTrailingEmptyStrings(updatedAnswer);
        });
    }

    return (
        <table className="border-collapse flex-1">
            <thead>
            <tr>
                <th scope="col" className="border border-gray-300 font-normal py-1"></th>
                <th scope="col" className="border border-gray-300 font-normal py-1">1</th>
                <th scope="col" className="border border-gray-300 font-normal py-1">2</th>
            </tr>
            </thead>
            <tbody>
            {
                Array.from({ length: 10 }, (_, index) => (
                        <tr key={index}>
                            <th className="border border-gray-300 font-normal text-gray-400 px-2">{index + 1}</th>
                            {[0, 1].map(colIndex => (
                                <td key={colIndex} className="border border-gray-300">
                                    <Input
                                        variant="none"
                                        className="px-2 py-1"
                                        disabled={disabled}
                                        value={answer[index * 2 + colIndex] ?? ""}
                                        onChange={e => answerFromTable(colIndex, index, e.target.value)}
                                    />
                                </td>
                            ))}
                        </tr>
                    )
                )
            }
            </tbody>
        </table >
    )
}

