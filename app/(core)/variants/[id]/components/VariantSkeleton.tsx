import {ButtonSkeleton, H1Skeleton, H2Skeleton, PSkeleton} from "@/components/Skeleton";

export default function VariantSkeleton() {
    return (
        <div className="space-y-3 max-w-prose m-auto">
            <H1Skeleton className="h-8 w-60"/>
            <div className="flex gap-4 justify-start md:justify-center">
                <ButtonSkeleton className="size-9"/>
                <ButtonSkeleton className="size-9"/>
                <ButtonSkeleton className="size-9"/>
                <ButtonSkeleton className="size-9"/>
                <ButtonSkeleton className="size-9"/>
            </div>
            <div className="space-y-2">
                <H2Skeleton/>
                <PSkeleton className="w-60"/>
                <PSkeleton className="w-80"/>
                <PSkeleton className="w-[400px]"/>
                <PSkeleton className="w-80"/>
                <PSkeleton className="w-[480px]"/>
                <PSkeleton className="w-60"/>
                <PSkeleton className="w-80"/>
            </div>
            <div className="w-full flex flex-col gap-3 md:flex-row md:gap-10 ">
                <ButtonSkeleton className="w-full"/>
                <div className="flex gap-3 justify-start flex-row-reverse md:flex-row">
                    <ButtonSkeleton/>
                    <ButtonSkeleton/>
                </div>
            </div>
        </div>
    )
}