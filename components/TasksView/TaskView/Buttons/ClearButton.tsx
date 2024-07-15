import Button from "@/components/ui/Button";
import { TrashIcon } from "@heroicons/react/24/solid";

const ClearButton = ({ disabled, onClick }: { disabled: boolean, onClick: () => void }) => {
    return <Button
        variant="outline"
        className="py-2 px-2"
        disabled={disabled}
        title="Очистить таблицу"
        area-label="Очистить таблицу ответов"
        onClick={onClick}
    >
        <TrashIcon className="size-6 text-gray-500" />
    </Button>
}

export default ClearButton;
