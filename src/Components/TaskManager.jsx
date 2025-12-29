
import { FaPlus, FaMinus } from "react-icons/fa"
import { FiSave } from "react-icons/fi"
import { MdCloudUpload, MdOutlineUndo, MdOutlineRedo } from "react-icons/md"
import { useHistoryContext } from "../Contexts/HistoryProvider"

export default function TaskManager({
  addTask,
  DeleteAllTask,
  SaveTasks,
  UploadTasks,
}) {
  const { undo, redo, canUndo, canRedo } = useHistoryContext()

  const baseBtn = `
    p-2 rounded-md
    border border-[var(--c-border)]
    text-[var(--c-text)]
    hover:bg-white/5
    transition
  `

  const primaryBtn = `
    p-2 rounded-md
    bg-[var(--c-primary)]
    hover:bg-[var(--c-primary-hover)]
    text-white
    transition
  `

  const dangerBtn = `
    p-2 rounded-md
    bg-[var(--c-danger)]
    hover:bg-[var(--c-danger-hover)]
    text-white
    transition
  `

  return (
    <div className="
      ml-12 p-2 flex gap-2 rounded-lg
      bg-[var(--c-panel)]
      border border-[var(--c-border)]
      shadow-lg
    ">
      <button title="add new task" className={primaryBtn} onClick={addTask}>
        <FaPlus />
      </button>

      <button title="delete all tasks" className={dangerBtn} onClick={DeleteAllTask}>
        <FaMinus />
      </button>

      <button title="save tasks" className={baseBtn} onClick={SaveTasks}>
        <FiSave />
      </button>

      <button
        title="upload tasks"
        className={baseBtn}
        onClick={() => document.getElementById("uploadTasksInput").click()}
      >
        <MdCloudUpload />
      </button>

      <button
        title="undo"
        className={`${baseBtn} disabled:opacity-40`}
        onClick={undo}
        disabled={!canUndo}
      >
        <MdOutlineUndo />
      </button>

      <button
        title="redo"
        className={`${baseBtn} disabled:opacity-40`}
        onClick={redo}
        disabled={!canRedo}
      >
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
