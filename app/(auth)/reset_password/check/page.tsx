import { Suspense } from "react";
import NewPassword from "./component";

export default function NewPasswordPage() {
    return (
        <Suspense fallback={<div>Loading in suspense...</div>}>
            <NewPassword />
        </Suspense>
    )
}
