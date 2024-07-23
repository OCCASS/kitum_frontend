import IVariant from "@/types/variant";
import LinkButton from "../ui/LinkButton";
import { CheckBadgeIcon, ClockIcon } from "@heroicons/react/24/outline";
import { formattedDatetime } from "@/utils/date";

type TVariantItemProps = {
    variant: IVariant
}

export default function VariantCard({ variant }: TVariantItemProps) {
    const startedAt = new Date(Date.parse(variant.startedAt))

    return (
        <article className="card flex flex-col gap-3">
            {/* Content */}
            <div className="flex-1 space-y-1">
                {variant.isCompleted && <p className="flex items-center gap-2 text-green"><CheckBadgeIcon className="size-5" /> Выполнено</p>}
                {(variant.isStarted && !variant.isCompleted) && <p className="flex items-center gap-2 text-blue-500"><ClockIcon className="size-5" /> Начат в {formattedDatetime(startedAt)}</p>}
                <h2 className="line-clamp-2">{variant.title}</h2>
                {variant.isCompleted && <p>Результат выполнения: {variant.result}</p>}
            </div>
            {/* Footer */}
            <div>
                {variant.isCompleted ?
                    <LinkButton href={`/variants/${variant.id}`} variant="outline">Результаты</LinkButton>
                    :
                    (
                        variant.isStarted ?
                            <LinkButton href={`/variants/${variant.id}`}>Продолжить</LinkButton>
                            :
                            <LinkButton href={`/variants/${variant.id}`} variant="outline">Перейти к варианту</LinkButton>
                    )
                }
            </div>
        </article>
    )
}
