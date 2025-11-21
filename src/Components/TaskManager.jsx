
import { FaPlus } from 'react-icons/fa'
import { FaMinus} from 'react-icons/fa6'
import { FiSave } from "react-icons/fi"
import { MdCloudUpload } from "react-icons/md";
import { useGlobalColorContext } from "../Contexts/GlobalColorContext"
import { MdOutlineUndo, MdOutlineRedo } from "react-icons/md";
import { useHistoryContext } from '../Contexts/HistoryProvider';

export default function TaskManager({addTask, DeleteAllTask, SaveTasks, UploadTasks}){
    const { colorsComponent } = useGlobalColorContext()
    const { undo, redo, canUndo, canRedo } = useHistoryContext();

    return (
        <div style={{backgroundColor: colorsComponent.BackgroundIO}} className="border-solid border-2 rounded-lg p-2 flex gap-2 shadow-lg">
            <button title='add new task' onClick={() => addTask()}><FaPlus/></button>
            <button title="delete all tasks" onClick={() => DeleteAllTask()}><FaMinus/></button>
            <button className="ml-5" title="save tasks" onClick={() => SaveTasks()}><FiSave /></button>
            <button title="upload tasks" onClick={() => document.getElementById("uploadTasksInput").click()}><MdCloudUpload /></button>
            <button title="undo" onClick={undo} disabled={!canUndo}>
            <MdOutlineUndo />
            </button>

            <button title="redo" onClick={redo} disabled={!canRedo}>
            <MdOutlineRedo />
            </button>


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