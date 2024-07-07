import Link from "next/link";
import IEvent from "@/types/event";
import { cva } from "class-variance-authority";
import cn from "@/utils/cn";
import { AcademicCapIcon, DocumentDuplicateIcon } from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";

const calendarTableItem = cva("group border py-1 px-2 cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-white hover:bg-gray-100",
            secondary: "bg-gray-100/30 hover:bg-gray-100"

        },
        isHoliday: {
            true: "bg-holiday-table-item-bg hover:bg-holiday-table-item-bg",
            false: null
        }
    }
})

const calendarTableItemHeader = cva("text-center", {
    variants: {
        variant: {
            primary: "group-hover:text-gray-400",
            secondary: "text-gray-400 group-hover:text-black"
        },
        isHoliday: {
            true: "text-holiday-table-item-text",
            false: null
        }
    },
    compoundVariants: [{
        variant: "secondary",
        isHoliday: true,
        class: "text-holiday-table-item-text-secondary"
    }]
})

const calendarTableItemEvent = cva("flex items-center gap-1 rounded px-2 py-0.5 text-sm", {
    variants: {
        type: {
            lesson: "bg-lesson-event-bg",
            homework: "bg-homework-event-bg"
        },
        isCompleted: {
            true: "bg-completed-event-bg text-gray-500",
            false: null
        }
    }
})

export default function CalendarTableItem({ day, variant, isHoliday, events }: { day: number, variant: "primary" | "secondary", isHoliday: boolean, events: IEvent[] }) {
    return (
        <td className={cn(calendarTableItem({ variant, isHoliday }))}>
            <div className={twMerge("flex flex-col h-14 md:h-20", !isHoliday && events.length === 0 && "inner-bottom-shadow")}>
                {/* Header */}
                <div className={cn(calendarTableItemHeader({ variant, isHoliday }))}>{day}</div>
                {/* Content */}
                <div className="overflow-auto h-full">
                    <ul className="flex flex-col gap-1 h-full">{events.map(item => <CalendarTableItemEvent key={item.id} event={item} />)}</ul>
                </div>
            </div>
        </td >
    )
}


function CalendarTableItemEvent({ event }: { event: IEvent }) {
    let icon = null;
    let href = ""
    switch (event.type) {
        case "lesson":
            icon = <AcademicCapIcon className="size-4" />
            href = event.isAvailable ? `/lessons/${event.id}` : ""
            break
        case "homework":
            icon = <DocumentDuplicateIcon className="size-4" />
            href = event.isAvailable ? `/lessons/${event.id}/tasks` : ""
            break
        default:
            break
    }

    return (
        <li key={event.id} className={cn(calendarTableItemEvent({ type: event.type, isCompleted: event.isCompleted }))}>
            {icon}
            <Link href={href} className="truncate w-full">
                {event.type === "homework" && "ДЗ"} {event.name}
            </Link>
        </li>
    )
}
