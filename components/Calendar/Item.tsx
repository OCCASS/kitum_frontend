import Link from "next/link";
import IEvent from "@/types/event";
import { cva } from "class-variance-authority";
import cn from "@/utils/cn";
import { AcademicCapIcon, DocumentDuplicateIcon, CheckIcon } from "@heroicons/react/16/solid";
import { twMerge } from "tailwind-merge";
import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { useState } from "react";

const MONTHS = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"]
const EVENT_TYPE_NAME = { "lesson": "Урок", "homework": "Домашняя работа" }

const calendarTableItem = cva("group border border-primary-border-color py-1 px-2 cursor-pointer", {
    variants: {
        variant: {
            primary: "bg-primary-table-item-bg hover:bg-secondary-table-item-bg",
            secondary: "bg-secondary-table-item-bg hover:bg-secondary-table-item-bg-hover"

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
            secondary: "text-gray-400 group-hover:text-secondary-table-item-text-hover"
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
            lesson: "md:bg-lesson-event-bg",
            homework: "md:bg-homework-event-bg"
        },
        isCompleted: {
            true: "md:bg-completed-event-bg md:text-completed-event-text",
            false: null
        }
    }
})

function DetailPopup({ day, month, events, show, close }: { day: number, month: number, events: IEvent[], show: boolean, close: () => void }) {
    const getEventHref = (event: IEvent) => {
        switch (event.type) {
            case "lesson":
                return event.isAvailable ? `/lessons/${event.id}` : ""
            case "homework":
                return event.isAvailable ? `/lessons/${event.id}/tasks` : ""
            default:
                return ""
        }
    }

    if (!show) return null

    return (
        <div className="overlay" onClick={close}>
            <div className="popup bg-secondary-bg space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2>{day} {MONTHS.at(month)}</h2>
                    <Button variant="none" onClick={close}><XMarkIcon className="size-6" /></Button>
                </div>
                {/* Content */}
                <ul className="space-y-3">
                    {
                        events.map(item => {
                            return <li key={item.id}>
                                <p className="text-gray-400">{EVENT_TYPE_NAME[item.type]}</p>
                                {item.isAvailable ?
                                    <Link href={getEventHref(item)} className="text-blue">
                                        {item.name}
                                    </Link> :
                                    <p>
                                        {item.name}
                                    </p>
                                }
                            </li>
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default function CalendarTableItem({ day, month, variant, isHoliday, events }: { day: number, month: number, variant: "primary" | "secondary", isHoliday: boolean, events: IEvent[] }) {
    const [showDetail, setShowDetail] = useState(false)

    const onClick = () => {
        if (events.length === 0) return
        setShowDetail(true)
    }

    return (
        <td className={cn(calendarTableItem({ variant, isHoliday }))}>
            <div
                className={twMerge(
                    "flex flex-col h-14 md:h-20",
                    events.length > 0 && (isHoliday ? "inner-bottom-shadow-holiday-table-item-bg" : "inner-bottom-shadow"),
                )}
                onClick={onClick}
            >
                {/* Header */}
                <div className={cn(calendarTableItemHeader({ variant, isHoliday }))}>{day}</div>
                {/* Content */}
                <div className="overflow-auto h-full">
                    {/* Desktop */}
                    <ul className="hidden md:flex md:flex-col gap-1 h-full">{events.map(item => <CalendarTableItemEvent key={item.id} event={item} />)}</ul>
                    {/* Mobile */}
                    {
                        events.length > 0 &&
                        <div className="flex md:hidden items-center justify-center">
                            <EllipsisHorizontalIcon className="size-6" />
                        </div>
                    }
                </div>
            </div>
            <DetailPopup
                day={day}
                month={month}
                events={events}
                show={showDetail}
                close={() => setShowDetail(false)}
            />
        </td>
    )
}


function CalendarTableItemEvent({ event }: { event: IEvent }) {
    let icon = null;
    let href = ""
    switch (event.type) {
        case "lesson":
            icon = event.isCompleted ? <CheckIcon className="size-4" /> : <AcademicCapIcon className="size-4" />
            href = event.isAvailable ? `/lessons/${event.id}` : ""
            break
        case "homework":
            icon = event.isCompleted ? <CheckIcon className="size-4" /> : <DocumentDuplicateIcon className="size-4" />
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
