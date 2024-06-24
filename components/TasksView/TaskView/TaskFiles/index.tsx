import ITaskFile from "@/types/task_file";
import Item from "./Item";

type TTaskFilesProps = {
    files: ITaskFile[]
}

const TaskFiles = ({ files }: TTaskFilesProps) => {
    return (
        <ul className="w-full flex items-center gap-3 py-2">
            {files.map((file, index) => <Item key={index} file={file} />)}
        </ul>
    )
}

export default TaskFiles
