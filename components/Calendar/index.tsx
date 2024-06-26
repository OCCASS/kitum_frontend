"use client"

import Button from "@/components/ui/Button";
import { getDaysInMonth, getFirstDayOfMonth } from "@/utils/date";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import React, { ReactNode, useState } from "react";
import { twMerge } from "tailwind-merge";

const DAYS_OF_WEEK = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]
const MONTHS = ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"]


function CalendarTableItem({ day, content, variant }: { day: number, content: string, variant: "primary" | "secondary" }) {
    return (
        <td className={twMerge("group border py-1 px-2 cursor-pointer", variant === "primary" ? "bg-white hover:bg-gray-100" : "bg-gray-100/30 hover:bg-gray-100")}>
            <div className="flex flex-col min-h-14 md:min-h-20">
                {/* Header */}
                <div className={twMerge("text-center text-sm", variant === "secondary" && "text-gray-400 group-hover:text-black")}>{day}</div>
                {/* Content */}
                <div className="flex-1">{content}</div>
            </div>
        </td>
    )
}

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

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

    const getWeeksRows = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInPrevMonth = getDaysInMonth(year, month - 1)
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const rows: Array<Array<ReactNode>> = [[]];
        let currentRow = []

        // Fill with previous month days
        for (let i = daysInPrevMonth - firstDayOfMonth + 1; i <= daysInPrevMonth; i++)
            currentRow.push(<CalendarTableItem key={`prev-${i}`} day={i} content="" variant="secondary" />)

        // Fill current month days
        for (let i = 1; i <= daysInMonth; i++) {
            if (currentRow.length === 7) {
                rows.push(currentRow)
                currentRow = []
            }

            currentRow.push(<CalendarTableItem key={i} day={i} content="" variant="primary" />)
        }

        // Fill next month days
        if (currentRow.length > 0) {
            const length = currentRow.length
            for (let i = 1; i <= 7 - length; i++)
                currentRow.push(<CalendarTableItem key={`next-${i}`} day={i} content="" variant="secondary" />)
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
                    <p>{MONTHS[currentDate.getMonth()]} {currentDate.getFullYear()}</p>
                    <Button variant="none" onClick={handleNextMonth}>
                        <ChevronRightIcon className="size-5 text-gray-400 transition-transform hover:scale-110" />
                    </Button>
                </div>
                <Button className="text-sm" variant="outline" onClick={() => setCurrentDate(new Date())}>Сегодня</Button>
            </div>
            <table className="w-full border-collapse">
                <thead><tr>{renderDaysOfWeek()}</tr></thead>
                <tbody>
                    {getWeeksRows().map((item, index) => (<tr key={`row-${index}`}>{item}</tr>))}
                </tbody>
            </table>
        </>
    );
};

