
import { FaPlus } from 'react-icons/fa'
import { FaMinus} from 'react-icons/fa6'
import { FiSave } from "react-icons/fi"
import { MdCloudUpload } from "react-icons/md";

export default function TaskManager({addTask, DeleteAllTask, SaveTasks, UploadTasks}){

    return (
        <div className="border-solid border-2 rounded-lg bg-white">
            <button title='add new task' onClick={() => addTask()}><FaPlus/></button>
            <button title="delete all tasks" onClick={() => DeleteAllTask()}><FaMinus/></button>
            <button className="ml-5" title="save tasks" onClick={() => SaveTasks()}><FiSave /></button>
            <button title="upload tasks" onClick={() => document.getElementById("uploadTasksInput").click()}><MdCloudUpload /></button>

            <input
                type="file"
                accept="application/json"
                id="uploadTasksInput"
                className="hidden"
                onChange={UploadTasks}
            />

        </div>
    )
}