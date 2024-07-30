import ITaskFile from "./task_file"


export type TTaskAnswer = Array<string>

export default interface ITask {
    id: string
    content: string
    kimNumber: number
    cost: number
    createdAt: string
    isCorrect: boolean
    isSkipped: boolean
    answer: TTaskAnswer | null
    type: "A" | "T"
    files: ITaskFile[]
    correctAnswer: string[] | null
}

