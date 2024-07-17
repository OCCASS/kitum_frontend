import LessonViewSkeleton from "@/components/LessonView/Skeleton";
import { Suspense } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<LessonViewSkeleton />}>{children}</Suspense>
}
