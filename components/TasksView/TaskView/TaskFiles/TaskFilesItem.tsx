import ITaskFile from "@/types/task_file";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const TaskFilesItem = ({ file }: { file: ITaskFile }) => {
    return <li>
        <Link href={file.file} target="_blank" rel="noopener noreferer" className="py-3 px-4 bg-gray-200 rounded-lg flex items-center gap-2 text-sm">
            <ArrowDownTrayIcon className="size-4" />
            <span>
                Скачать {file.name}
            </span>
        </Link>
    </li>
}

export default TaskFilesItem;
