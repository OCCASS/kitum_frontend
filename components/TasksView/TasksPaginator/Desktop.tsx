import { ReactNode, useCallback, useEffect, useState } from "react"
import TasksBarItem from "./Item"
import Button from "@/components/ui/Button"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline"
import { TTasksPaginatorProps } from "."

function EllipsisElement() {
    return <li className="align-middle text-gray-400 text-lg">&hellip;</li>
}

function calculateTaskLimits(length: number, selected: number, maxTaskCount: number) {
    if ((length - selected) < maxTaskCount) {
        return {
            minTaskLimit: length - maxTaskCount,
            maxTaskLimit: length - 1
        };
    } else if (selected < maxTaskCount) {
        return {
            minTaskLimit: 0,
            maxTaskLimit: maxTaskCount
        };
    } else {
        const halfMaxTaskCount = Math.floor(maxTaskCount / 2);
        return {
            minTaskLimit: selected - halfMaxTaskCount,
            maxTaskLimit: selected + halfMaxTaskCount
        };
    }
}


export default function DesktopPaginator({ tasks, selected, setSelected }: TTasksPaginatorProps) {
    const length = tasks.length
    const maxTaskCount = Math.min(5, length - 3)

    const [content, setContent] = useState<Array<ReactNode>>([])

    const next = useCallback(() => {
        setSelected(prev => Math.min(prev + 1, length - 1))
    }, [setSelected, length])

    const prev = useCallback(() => {
        setSelected(prev => Math.max(prev - 1, 0))
    }, [setSelected])

    const generateContent = (minTaskLimit: number, maxTaskLimit: number) => {
        const newContent = [];
        for (let index = minTaskLimit; index <= maxTaskLimit; index++) {
            newContent.push(
                <TasksBarItem
                    key={index}
                    index={index}
                    isCorrect={tasks[index].isCorrect}
                    isSelected={index === selected}
                    onClick={setSelected}
                />
            );
        }
        return newContent;
    }

    useEffect(() => {
        const { minTaskLimit, maxTaskLimit } = calculateTaskLimits(length, selected, maxTaskCount)
        setContent(generateContent(minTaskLimit, maxTaskLimit))
    }, [length, maxTaskCount, selected, setSelected, tasks])

    return (
        <ul className="hidden md:flex m-auto justify-center items-center gap-2 py-2">
            {selected !== 0 && <Button variant="none" onClick={prev}><ChevronLeftIcon className="size-5 text-gray-400" /></Button>}
            {selected >= maxTaskCount &&
                <>
                    <TasksBarItem
                        key={0}
                        index={0}
                        isCorrect={tasks[0].isCorrect}
                        isSelected={selected === 0}
                        onClick={setSelected}
                    />
                    <EllipsisElement />
                </>
            }
            {...content}
            {selected <= length - maxTaskCount &&
                <>
                    <EllipsisElement />
                    <TasksBarItem
                        key={length - 1}
                        index={length - 1}
                        isCorrect={tasks[length - 1].isCorrect}
                        isSelected={selected === length - 1}
                        onClick={setSelected}
                    />
                </>

            }
            {selected !== length - 1 && <Button variant="none" onClick={next}><ChevronRightIcon className="size-5 text-gray-400" /></Button>}
        </ul>
    )
}

