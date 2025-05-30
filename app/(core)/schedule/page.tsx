import Calendar from "@/components/Calendar";
import { get } from "@/lib/fetch";
import IHoliday from "@/types/holiday";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – расписание"
}

export default async function Schedule() {
    const { data: holidays } = await get<IHoliday[]>(`${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/holidays/`)
    return (
        <div className="space-y-3">
            <h1>Расписание</h1>
            <Calendar holidays={holidays} />
        </div>
    )
}
