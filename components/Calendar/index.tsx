"use client"

import Button from "@/components/ui/Button";
import { get } from "@/lib/fetch";
import IHoliday from "@/types/holiday";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/date";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useCallback, useEffect, useState } from "react";
import CalendarTableItem from "@/components/Calendar/Item";
import IEvent from "@/types/event";
import { parseAsInteger, useQueryState } from "nuqs";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]


export default function Calendar({ holidays }: { holidays: IHoliday[] | null }) {
    const now = new Date()
    // TODO: add validator (if user set search params will bug)
    const [currentYear, setCurrentYear] = useQueryState<number>(
        "year", parseAsInteger.withDefault(now.getFullYear()).withOptions({ shallow: true, history: "push" })
    )
    const [
        currentMonthIndex, setCurrentMonthIndex
    ] = useQueryState<number>("month", parseAsInteger.withDefault(now.getMonth()).withOptions({ shallow: true, history: "push" }))
    const [events, setEvents] = useState<IEvent[]>([])

    const resetYearMonth = () => {
        const now = new Date()
        setCurrentMonthIndex(now.getMonth())
        setCurrentYear(now.getFullYear())
    }

    useEffect(() => {
        const fetchData = async () => {
            let from;
            const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonthIndex);

            if (firstDayOfMonth === 1) {
                from = new Date(currentYear, currentMonthIndex, 1, 0, 0, 0);
            } else {
                const prevMonth = (currentMonthIndex - 1) % 12;
                const daysInPrevMonth = getDaysInMonth(currentYear, prevMonth);
                const prevMonthDaysToSubtract = firstDayOfMonth - 1;
                from = new Date(currentYear, prevMonth, daysInPrevMonth - prevMonthDaysToSubtract, 0, 0, 0);
            }

            let to;
            const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex)
            const totalDays = firstDayOfMonth + daysInMonth
            const daysOfNextMonth = Math.ceil(totalDays / 7) * 7 - totalDays
            const nextMonth = (currentMonthIndex + 1) % 12
            if (daysOfNextMonth > 0) to = new Date(currentYear, nextMonth, daysOfNextMonth, 23, 59)
            else to = new Date(currentYear, currentMonthIndex, daysInMonth, 23, 59)

            const { data } = await get<IEvent[]>(`
                ${process.env.NEXT_PUBLIC_API_BASE_URL}/schedule/?from=${from.getTime() / 1000}&to=${to.getTime() / 1000}`
            )
            setEvents(data ?? [])
        }

        fetchData()
    }, [currentYear, currentMonthIndex])

    const handlePreviousMonth = () => {
        let prevMonth
        if (currentMonthIndex > 0) {
            prevMonth = (currentMonthIndex - 1) % 12
        } else {
            prevMonth = 11
        }
        setCurrentMonthIndex(prevMonth)
        if (prevMonth === 11) setCurrentYear(prev => prev - 1)
    };

    const handleNextMonth = () => {
        const nextMonth = (currentMonthIndex + 1) % 12
        setCurrentMonthIndex(nextMonth)
        if (nextMonth === 0) setCurrentYear(prev => prev + 1)
    };

    const renderDaysOfWeek = () => {
        return DAYS_OF_WEEK.map((day, index) => <th key={index}
            className="py-2 text-center text-gray-400 font-normal">{day}</th>);
    };

    const isHoliday = useCallback((day: number, month: number) => {
        if (!holidays) return false
        return holidays.filter(item => item.day === day && item.month - 1 === month).length > 0
    }, [holidays])

    const getEventsAt = useCallback((day: number, month: number, year: number) => {
        return events.filter(item => {
            const opensAt = new Date(item.at)
            return opensAt.getFullYear() === year && opensAt.getMonth() === month && opensAt.getDate() === day
        })
    }, [events])

    const getWeeksRows = () => {
        const prevMonth = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1
        const nextMonth = (currentMonthIndex + 1) % 12
        const daysInPrevMonth = getDaysInMonth(currentYear, currentMonthIndex - 1)
        const daysInMonth = getDaysInMonth(currentYear, currentMonthIndex);
        const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonthIndex);

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
                    month={month}
                    variant={variant}
                    isHoliday={isHoliday(day, month)}
                    events={getEventsAt(day, month, year)}
                />
            )
        }

        // Fill with previous month days
        for (let day = daysInPrevMonth - firstDayOfMonth + 1; day <= daysInPrevMonth; day++)
            addDay(`prev-${day}`, "secondary", day, prevMonth, currentYear)

        // Fill current month days
        for (let day = 1; day <= daysInMonth; day++)
            addDay(day.toString(), "primary", day, currentMonthIndex, currentYear)

        // Fill next month days
        if (currentRow.length > 0) {
            const length = currentRow.length
            for (let day = 1; day <= 7 - length; day++)
                addDay(`next-${day}`, "secondary", day, nextMonth, currentYear)
            rows.push(currentRow);
        }

        return rows;
    };

    return (
        <>
            <div className="w-full px-2 flex justify-between items-center gap-5">
                <div className="hidden md:block"></div>
                <div className="flex gap-5">
                    <Button variant="none" onClick={handlePreviousMonth}>
                        <ChevronLeftIcon className="size-5 text-gray-400 transition-transform hover:scale-110" />
                    </Button>
                    <p className="select-none">{MONTHS[currentMonthIndex]} {currentYear}</p>
                    <Button variant="none" onClick={handleNextMonth}>
                        <ChevronRightIcon className="size-5 text-gray-400 transition-transform hover:scale-110" />
                    </Button>
                </div>
                <Button className="text-sm" variant="outline" onClick={resetYearMonth}>Сегодня</Button>
            </div>
            <table className="w-full border-collapse table-fixed">
                <thead>
                    <tr>{renderDaysOfWeek()}</tr>
                </thead>
                <tbody>
                    {getWeeksRows().map((item, index) => (<tr key={`row-${index}`}>{item}</tr>))}
                </tbody>
            </table>
        </>
    );
};
