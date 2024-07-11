import { Suspense } from "react";
import NewPassword from "./component";
import LoadingView from "@/components/LoadingView";

export default function NewPasswordPage() {
    return (
        <Suspense fallback={<LoadingView/>}>
            <NewPassword />
        </Suspense>
    )
}
