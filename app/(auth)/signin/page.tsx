import { Suspense } from "react";
import SignIn from "./component";

export default function SignInPage() {
    return (
        <Suspense fallback={<div>Loading in suspense...</div>}>
            <SignIn />
        </Suspense>
    )
}
