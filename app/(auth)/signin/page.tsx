import { Suspense } from "react";
import SignIn from "./component";
import LoadingView from "@/components/LoadingView";

export default function SignInPage() {
    return (
        <Suspense fallback={<LoadingView/>}>
            <SignIn />
        </Suspense>
    )
}
