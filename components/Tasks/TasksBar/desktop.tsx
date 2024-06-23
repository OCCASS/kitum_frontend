import { useEffect, useState } from "react"
import TasksBarItem from "./TasksBarItem"
import { TTasksBarProps } from "."

function ElepsisElement() {
    return <li className="align-middle text-gray-400 text-lg">&hellip;</li>
}

export default function DesktopTasksBar({ tasks, selected, setSelected }: TTasksBarProps) {
    const length = tasks.length
    const maxTaskCount = Math.min(5, length - 3)

    const [content, setContent] = useState<Array<React.ReactNode>>([])

    useEffect(() => {
        let minTaskLimit, maxTaskLimit;
        if ((length - selected) < maxTaskCount) {
            minTaskLimit = length - maxTaskCount
            maxTaskLimit = length - 1
        } else if (selected < maxTaskCount) {
            minTaskLimit = 0
            maxTaskLimit = maxTaskCount
        } else {
            minTaskLimit = selected - Math.floor(maxTaskCount / 2)
            maxTaskLimit = selected + Math.floor(maxTaskCount / 2)
        }

        const newContent = []
        for (let index = minTaskLimit; index <= maxTaskLimit; index++) {
            newContent.push(
                <TasksBarItem
                    key={index}
                    index={index}
                    isCorrect={tasks[index].isCorrect}
                    isSelected={index === selected}
                    onClick={setSelected}
                />
            )
        }

        setContent(newContent)
    }, [selected, tasks])

    return (
        <ul className="hidden md:flex m-auto justify-center items-center gap-2 py-2">
            {selected >= maxTaskCount &&
                <>
                    <TasksBarItem
                        key={0}
                        index={0}
                        isCorrect={tasks[0].isCorrect}
                        isSelected={selected === 0}
                        onClick={setSelected}
                    />
                    <ElepsisElement />
                </>
            }
            {...content}
            {selected <= length - maxTaskCount &&
                <>
                    <ElepsisElement />
                    <TasksBarItem
                        key={length - 1}
                        index={length - 1}
                        isCorrect={tasks[length - 1].isCorrect}
                        isSelected={selected === length - 1}
                        onClick={setSelected}
                    />
                </>

            }
        </ul>
    )
}

