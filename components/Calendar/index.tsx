"use client"

import Button from "@/components/ui/Button";
import { get } from "@/lib/fetch";
import IHoliday from "@/types/holiday";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/date";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import CalendarTableItem from "@/components/Calendar/Item";
import IEvent from "@/types/event";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]


export default function Calendar({ holidays }: { holidays: IHoliday[] }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState<IEvent[]>([])

    useEffect(() => {
        const fetchData = async () => {
            const year = currentDate.getFullYear();
            const month = currentDate.getMonth();

            let from;
            const firstDayOfMonth = getFirstDayOfMonth(year, month);

            if (firstDayOfMonth === 1) {
                from = new Date(year, month, 1, 0, 0, 0);
            } else {
                const prevMonth = (month - 1) % 12;
                const daysInPrevMonth = getDaysInMonth(year, prevMonth);
                const prevMonthDaysToSubtract = firstDayOfMonth - 1;
                from = new Date(year, prevMonth, daysInPrevMonth - prevMonthDaysToSubtract, 0, 0, 0);
            }

            let to;
            const daysInMonth = getDaysInMonth(year, month)
            const totalDays = firstDayOfMonth + daysInMonth
            const daysOfNextMonth = Math.ceil(totalDays / 7) * 7 - totalDays
            const nextMonth = (month + 1) % 12
            if (daysOfNextMonth > 0) to = new Date(year, nextMonth, daysOfNextMonth, 23, 59)
            else to = new Date(year, month, daysInMonth, 23, 59)

            const { data } = await get<IEvent[]>(`
                ${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/?from=${from.getTime() / 1000}&to=${to.getTime() / 1000}`
            )
            setEvents(data)
        }

        fetchData()
    }, [currentDate])

    const handlePreviousMonth = () => {
        const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
        setCurrentDate(prevMonth);
    };

    const handleNextMonth = () => {
        const nextMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
        setCurrentDate(nextMonth);
    };

    const renderDaysOfWeek = () => {
        return DAYS_OF_WEEK.map((day, index) => <th key={index} className="py-2 text-center text-gray-400 font-normal">{day}</th>);
    };

    const isHoliday = useCallback((day: number, month: number) => {
        return holidays.filter(item => item.day === day && item.month - 1 === month).length > 0
    }, [holidays])

    const getEventsAt = useCallback((day: number, month: number, year: number) => {
        return events.filter(item => {
            const opensAt = new Date(item.at)
            return opensAt.getFullYear() === year && opensAt.getMonth() === month && opensAt.getDate() === day
        })
    }, [events])

    const getWeeksRows = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const prevMonth = (month === 0) ? 11 : month - 1
        const nextMonth = (month + 1) % 12
        const daysInPrevMonth = getDaysInMonth(year, month - 1)
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const rows: Array<Array<ReactNode>> = [[]];
        let currentRow: Array<ReactNode> = []

        const addDay = (key: string, variant: "primary" | "secondary", day: number, month: number, year: number) => {
            if (currentRow.length === 7) {
                rows.push(currentRow)
                currentRow = []
            }

            currentRow.push(
                <CalendarTableItem
                    key={key}
                    day={day}
                    variant={variant}
                    isHoliday={isHoliday(day, month)}
                    events={getEventsAt(day, month, year)}
                />
            )
        }

        // Fill with previous month days
        for (let day = daysInPrevMonth - firstDayOfMonth + 1; day <= daysInPrevMonth; day++)
            addDay(`prev-${day}`, "secondary", day, prevMonth, year)

        // Fill current month days
        for (let day = 1; day <= daysInMonth; day++)
            addDay(day.toString(), "primary", day, month, year)

        // Fill next month days
        if (currentRow.length > 0) {
            const length = currentRow.length
            for (let day = 1; day <= 7 - length; day++)
                addDay(`next-${day}`, "secondary", day, nextMonth, year)
            rows.push(currentRow);
        }

        return rows;
    };

    return (
        <>
            <div className="w-full px-2 flex justify-between items-center gap-5">
                <div></div>
                <div className="flex gap-5">
                    <Button variant="none" onClick={handlePreviousMonth}>
                        <ChevronLeftIcon className="size-5 text-gray-400 transition-transform hover:scale-110" />
                    </Button>
                    <p className="select-none">{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                    <Button variant="none" onClick={handleNextMonth}>
                        <ChevronRightIcon className="size-5 text-gray-400 transition-transform hover:scale-110" />
                    </Button>
                </div>
                <Button className="text-sm" variant="outline" onClick={() => setCurrentDate(new Date())}>Сегодня</Button>
            </div>
            <table className="w-full border-collapse table-fixed">
                <thead><tr>{renderDaysOfWeek()}</tr></thead>
                <tbody>
                    {getWeeksRows().map((item, index) => (<tr key={`row-${index}`}>{item}</tr>))}
                </tbody>
            </table>
        </>
    );
};
