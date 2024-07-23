import ITask from "./task"

export default interface IVariant {
    id: string
    title: string
    tasks: ITask[]
    createdAt: string
    isCompleted: boolean
    isStarted: boolean
    startedAt: string
    completedAt: string
    generated: boolean
    complexity: number
    result: number | null
}
