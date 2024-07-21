import Input from "@/components/ui/Input"
import SubmitButton from "@/components/ui/SubmitButton"
import { SparklesIcon } from "@heroicons/react/24/solid"

export default function CreateVariantSection() {
    return (
        <section className="card">
            <h2 className="mb-1 flex justify-center gap-1"><SparklesIcon className="size-6" />Создать вариант</h2>
            <p className="mb-3 text-sm text-gray-500 text-center">Создать вариант выбранной сложности</p>
            <form className="space-y-3">
                <Input placeholder="Название" className="w-full" name="name" />
                <ul className="grid grid-cols-3 gap-2 bg-secondary-bg p-1 rounded border border-primary-border-color">
                    <li>
                        <input id="1" value="1" type="radio" className="hidden peer" name="complexity" required />
                        <label htmlFor="1" className="block rounded-sm p-2 text-center text-green cursor-pointer peer-checked:bg-tertiary-bg">Простой</label>
                    </li>
                    <li>
                        <input id="2" value="2" type="radio" className="hidden peer" name="complexity" required />
                        <label htmlFor="2" className="block rounded-sm p-2 text-center text-orange-500 cursor-pointer peer-checked:bg-tertiary-bg">Средний</label>
                    </li>
                    <li>
                        <input id="3" value="3" type="radio" className="hidden peer" name="complexity" required />
                        <label htmlFor="3" className="block rounded-sm p-2 text-center text-red cursor-pointer peer-checked:bg-tertiary-bg">Сложный</label>
                    </li>
                </ul>
                <SubmitButton className="w-full">Начать</SubmitButton>
            </form>
        </section>
    )
}
