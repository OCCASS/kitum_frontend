import { Suspense } from "react";
import VariantSkeleton from "./components/VariantSkeleton";

export default function Template({ children }: { children: React.ReactNode }) {
    return <Suspense fallback={<VariantSkeleton />}>{children}</Suspense>
}
