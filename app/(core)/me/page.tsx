import {EditUserAvatarForm, EditUserForm, Greeting, Subscription} from "./components"
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "KITUM – профиль"
}

export default async function Me() {
    return (
        <div className="space-y-8">
            <Greeting />
            <section className="flex items-center gap-10">
                <EditUserAvatarForm />
            </section>
            <section>
                <EditUserForm />
            </section>
            <section id="subscription">
                <h1 className="mb-5">Текушая подписка</h1>
                <Subscription />
            </section>
        </div>
    )
}
