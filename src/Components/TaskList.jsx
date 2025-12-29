import { FiClock } from "react-icons/fi"
import { FaTrashAlt, FaEdit } from "react-icons/fa"
import { priorityColors } from "../Hooks/useTasks"
import { useHistoryContext } from "../Contexts/HistoryProvider"

export default function TaskList({
  tasks,
  setTasks,
  showEditWindow,
  setShowEditWindow,
  setSelectedTask,
}) {
  const { addAction } = useHistoryContext()

  return (
    <div className="
      flex flex-col gap-3 p-3 rounded-md overflow-y-auto
      bg-[var(--c-bg)]
    ">
      {tasks.length === 0 ? (
        <p className="italic text-center mt-10 text-[var(--c-text-muted)]">
          No tasks available
        </p>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            className={`
              flex flex-col sm:flex-row sm:items-center justify-between
              px-4 py-3 rounded-lg border
              transition
              ${task.done
                ? "bg-green-900/20 border-green-700 opacity-70"
                : "bg-[var(--c-panel)] border-[var(--c-border)] hover:bg-white/5"}
            `}
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks(tasks.map(t =>
                    t.id === task.id ? { ...t, done: !t.done } : t
                  ))
                }
                className="
                  w-5 h-5 cursor-pointer
                  accent-[var(--c-primary)]
                  focus:ring-2 focus:ring-[var(--c-focus)]
                "
              />

              <div>
                <h3 className={`font-bold ${task.done ? "line-through text-[var(--c-text-muted)]" : "text-[var(--c-text)]"}`}>
                  {task.text}
                </h3>
                <p className="text-sm text-[var(--c-text-muted)]">
                  {task.describe}
                </p>
              </div>

              <span className={`px-2 py-1 text-xs rounded-full ${priorityColors[task.priority]}`}>
                {task.priority || "medium"}
              </span>
            </div>

            {/* Right */}
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <div className="flex items-center gap-1 text-sm text-[var(--c-text-muted)]">
                <FiClock />
                {task.callTime || <span className="italic">No reminder</span>}
              </div>

              <button
                className="
                  px-2 py-1 rounded-md text-sm
                  bg-[var(--c-primary)]
                  hover:bg-[var(--c-primary-hover)]
                  text-white
                  transition
                "
                onClick={() => {
                  setShowEditWindow(!showEditWindow)
                  setSelectedTask(task)
                }}
              >
                <FaEdit /> Edit
              </button>

              <button
                className="
                  px-2 py-1 rounded-md text-sm
                  bg-[var(--c-danger)]
                  hover:bg-[var(--c-danger-hover)]
                  text-white
                  transition
                "
                onClick={() => {
                  const deletedTask = { ...task }
                  addAction({
                    do: () => setTasks(prev => prev.filter(t => t.id !== deletedTask.id)),
                    undo: () => setTasks(prev => [...prev, deletedTask]),
                  })
                }}
              >
                <FaTrashAlt /> Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
