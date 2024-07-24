import SleepingWhaleIcon from "@/components/icons/SleepingWhaleIcon";

export default function EmptyListPlug({text}: { text: string }) {
    return (
        <>
            <SleepingWhaleIcon className="size-36 m-auto"/>
            <p className="text-center text-gray-text">{text}</p>
        </>
    )
}