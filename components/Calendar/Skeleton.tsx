import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Button from "../ui/Button";
import { ButtonSkeleton, PSkeleton } from "../Skeleton";

export default function CalendarSkeleton() {
    return (
        <>
            <div className="w-full px-2 flex justify-between items-center gap-5">
                <div className="hidden md:block"></div>
                <div className="flex gap-5">
                    <Button variant="none">
                        <ChevronLeftIcon className="size-5 text-gray-400" />
                    </Button>
                    <PSkeleton className="h-5" />
                    <Button variant="none">
                        <ChevronRightIcon className="size-5 text-gray-400" />
                    </Button>
                </div>
                <Button className="text-sm" variant="outline">Сегодня</Button>
            </div>
            <table className="w-full border-collapse table-fixed">
                <thead>
                    <tr>{
                        Array.from({ length: 7 }, (item: number) =>
                            <th key={item} className="py-2"><PSkeleton className="m-auto h-4 w-5" /></th>
                        )
                    }</tr>
                </thead>
                <tbody>
                    {
                        Array.from(
                            { length: 4 },
                            (_, index) => (
                                <tr key={`row-${index}`}>{
                                    Array.from(
                                        { length: 7 },
                                        (_, index) => <td key={`col-${index}`}><ButtonSkeleton className="rounded-none w-full h-14 md:h-20" /></td>
                                    )
                                }</tr>
                            )
                        )
                    }
                </tbody>
            </table>
        </>
    )
}
