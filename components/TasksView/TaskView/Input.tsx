import ITask, { TTaskAnswer } from "@/types/task";
import { Dispatch, SetStateAction, ClipboardEvent } from "react";
import Input from "@/components/ui/Input";
import { removeTrailingEmptyStrings } from "@/utils/array";

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



    const onTablePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        /*
         * Cols separated by spaces, rows separated by "\n"
         * This code trnasforms string to 1D array
        */

        const data = e.clipboardData.getData("text")
        const lines = data.split("\n")
        const flattenedArray = lines.flatMap(line => line.split(" "))

        if (flattenedArray.length > 1) {
            e.preventDefault()
            const filteredArray = flattenedArray.filter(item => item.trim() !== "")
            setAnswer(filteredArray)
        }
    }

    return (
        <table className="border-collapse flex-1">
            <thead>
                <tr>
                    <th scope="col" className="border border-primary-border-color font-normal py-1"></th>
                    <th scope="col" className="border border-primary-border-color font-normal py-1">1</th>
                    <th scope="col" className="border border-primary-border-color font-normal py-1">2</th>
                </tr>
            </thead>
            <tbody>
                {
                    Array.from({ length: 10 }, (_, index) => (
                        <tr key={index}>
                            <th className="border border-primary-border-color font-normal text-gray-400 px-2">{index + 1}</th>
                            {[0, 1].map(colIndex => (
                                <td key={colIndex} className="border border-primary-border-color">
                                    <Input
                                        variant="none"
                                        className="px-2 py-1 w-full"
                                        disabled={disabled}
                                        value={answer[index * 2 + colIndex] ?? ""}
                                        onChange={e => answerFromTable(colIndex, index, e.target.value)}
                                        onPaste={onTablePaste}
                                    />
                                </td>
                            ))}
                        </tr>
                    )
                    )
                }
            </tbody>
        </table>
    )
}
