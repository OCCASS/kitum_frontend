import ITaskFile from "./task_file"

export default interface ITask {
    id: string
    content: string
    kimNumber: number
    cost: number
    createdAt: string
    isCorrect: boolean
    isSkipped: boolean
    answer: string | null
    files: ITaskFile[]
}

