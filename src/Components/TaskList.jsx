import { useGlobalColorContext } from "../Contexts/GlobalColorContext"
import { FiClock } from "react-icons/fi"
import { FaTrashAlt, FaEdit } from "react-icons/fa"

export default function TaskList({
  tasks,
  setTasks,
  showEditWindow,
  setShowEditWindow,
  setSelectedTask,
}) {
  const { colorsComponent } = useGlobalColorContext()

  return (
    <div
      className="flex flex-col gap-3 p-3 rounded-md overflow-y-auto"
      style={{ backgroundColor: colorsComponent.Background }}
    >
      {tasks.length === 0 ? (
        <p className="text-gray-400 italic text-center mt-10">
          No tasks available
        </p>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg px-4 py-3 shadow-md transition-all duration-150 ${
              task.done
                ? "bg-green-900/30 border-green-600"
                : "bg-gray-800/40 border-gray-600"
            }`}
            style={{ color: colorsComponent.Text }}
          >
            {/* Left side: text + checkbox */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() =>
                  setTasks(
                    tasks.map((t) =>
                      t.id === task.id ? { ...t, done: !t.done } : t
                    )
                  )
                }
                className="w-5 h-5 accent-green-500 cursor-pointer"
              />
              <div>
                <h3
                  className={`font-bold ${
                    task.done ? "line-through text-gray-400" : "text-white"
                  }`}
                >
                  {task.text}
                </h3>
                <p className="text-sm text-gray-400">{task.describe}</p>
              </div>
            </div>

            {/* Right side: time + actions */}
            <div className="flex items-center gap-3 mt-2 sm:mt-0">
              <div className="flex items-center gap-1 text-gray-300 text-sm">
                <FiClock className="text-yellow-400" />
                {task.callTime ? (
                  <span>{task.callTime}</span>
                ) : (
                  <span style={{color: colorsComponent.Text}} className="italic">No reminder</span>
                )}
              </div>

              <button
              style={{backgroundColor: colorsComponent.BackgroundList, color: colorsComponent.Text}}
                className="flex items-center gap-1 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-sm"
                onClick={() => {
                  setShowEditWindow(!showEditWindow)
                  setSelectedTask(task)
                }}
              >
                <FaEdit />
                Edit
              </button>

              <button
              style={{color: colorsComponent.Text}}
                className="flex items-center gap-1 bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md text-sm"
                onClick={() =>
                  setTasks(tasks.filter((t) => t.id !== task.id))
                }
              >
                <FaTrashAlt />
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  )
}
