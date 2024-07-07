export default interface IEvent {
    id: string
    name: string
    at: string
    type: "lesson" | "homework"
    isAvailable: boolean
    isCompleted: boolean
}
