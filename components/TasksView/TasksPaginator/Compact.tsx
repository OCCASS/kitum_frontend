import { useRef, useState } from "react"
import { TTasksPaginatorProps } from "."
import TasksBarItem from "./Item"
import { twMerge } from "tailwind-merge";

export default function CompactPaginator({ tasks, selected, setSelected, forceVisible }: TTasksPaginatorProps & { forceVisible: boolean }) {
    const scrollableRef = useRef(null);
    const [isScrolledToLeft, setIsScrolledToLeft] = useState(true);
    const [isScrolledToRight, setIsScrolledToRight] = useState(false);

    const onScroll = () => {
        if (!scrollableRef.current) return
        const scrollableElement = scrollableRef.current;
        const { scrollLeft, scrollWidth, clientWidth } = scrollableElement;
        setIsScrolledToLeft(scrollLeft === 0);
        setIsScrolledToRight(scrollLeft + clientWidth === scrollWidth);
    }

    return (
        <div className={`inner-x-shadow ${!isScrolledToLeft ? "show-left" : ""} ${isScrolledToRight ? "hide-right" : ""}`}>
            <ul className={twMerge("flex md:hidden gap-2 py-2 overflow-y-auto", forceVisible && "md:flex")} onScroll={onScroll} ref={scrollableRef}>
                {tasks.map((task, index) => <TasksBarItem
                    key={index}
                    index={index}
                    isCorrect={task.isCorrect}
                    isSelected={selected === index}
                    onClick={setSelected}
                />)}
            </ul>
        </div>
    )
}
