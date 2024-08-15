export type TVariantType = "school" | "exam"

export default interface IVariant {
    id: string
    title: string
    type: TVariantType
    year: number | null  // only if type === "exam"
    createdAt: string
    updatedAt: string
}