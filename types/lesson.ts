import ITask from "./task"

export default interface ILesson {
    id: string
    title: string
    content: string
    tasks?: ITask[]
    isClosed: boolean
    isCompleted: boolean
    isTasksCompleted: boolean
    isSkipped: boolean
    startedAt: string | null
    completedAt: string | null
    createdAt: string
    updatedAt: string
    completeTasksDeadline: string
}
