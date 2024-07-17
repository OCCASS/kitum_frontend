import { Suspense } from "react";
import LessonTasksSkeleton from "./components/LessonTasksSkeleton";

export default function Template({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<LessonTasksSkeleton />}>{children}</Suspense>
}
