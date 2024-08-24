export default function Layout({ homework, not_completed_lessons, children }: { homework: any, not_completed_lessons: any, children: React.ReactNode }) {
    return (
        <>
            <div className="space-y-8">
                <section className="space-y-3">
                    <h1>Незавершенные уроки</h1>
                    {not_completed_lessons}
                </section>
                <section className="space-y-3">
                    <h1>Домашняя работа</h1>
                    {homework}
                </section>
            </div>
        </>
    )
}
