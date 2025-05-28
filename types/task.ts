import IFile from "./file"


export type ITaskArrayAnswer = string
export type ITaskFileAnswer = File
export type TTaskAnswer = ITaskArrayAnswer | ITaskFileAnswer | null
export type TTaskType = "A" | "F" // Any or File

export default interface ITask {
    id: string
    content: string
    kimNumber: number
    cost: number
    createdAt: string
    isCorrect: boolean
    isSkipped: boolean
    answer: ITaskArrayAnswer | null
    answerFile: ITaskFileAnswer | null
    type: TTaskType
    files: IFile[]
    correctAnswer: string | null
}
