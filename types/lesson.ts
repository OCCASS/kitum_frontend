import IFile from "./file"
import ISubscription from "./subscription"
import ITask from "./task"
import IUser from "./user"

export type TLessonStatus = "not_started" | "started" | "completed" | "tasks_completed"

export default interface ILesson {
    id: string
    title: string
    content: string
    tasks?: ITask[]
    files: IFile[]
    isClosed: boolean
    status: TLessonStatus
    startedAt: string | null
    completedAt: string | null
    createdAt: string
    updatedAt: string
    completeTasksDeadline: string
    opensAt: string
    kinescopeVideoId: string
    author: IUser | null
    subscription: ISubscription
}
