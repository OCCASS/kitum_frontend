import IFile from "@/types/file";
import Item from "./Item";

type TFilesProps = {
    files: IFile[]
}

const Files = ({ files }: TFilesProps) => {
    return (
        <ul className="w-full flex items-center flex-row gap-3 py-2">
            {files.map((file, index) => <Item key={index} file={file} />)}
        </ul>
    )
}

export default Files
