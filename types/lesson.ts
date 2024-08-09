import ITask from "./task"

export type TLessonStatus = "not_started" | "started" | "completed" | "tasks_completed"

export default interface ILesson {
    id: string
    title: string
    content: string
    tasks?: ITask[]
    isClosed: boolean
    status: TLessonStatus
    startedAt: string | null
    completedAt: string | null
    createdAt: string
    updatedAt: string
    completeTasksDeadline: string
    opensAt: string
    result: number | null
    videoUrl: string
}
