import { VscClearAll } from "react-icons/vsc"

export default function EditModal({
  showEditWindow,
  setShowEditWindow,
  selectedTask,
  setSelectedTask,
  SaveTaskEdit,
}) {
  if (!showEditWindow) return null

  const inputBase = `
    w-full px-3 py-1.5 rounded-md
    bg-[var(--c-bg)]
    border border-[var(--c-border)]
    text-[var(--c-text)]
    focus:outline-none
    focus:ring-2 focus:ring-[var(--c-focus)]
  `

  return (
    <div className="
      fixed inset-0 z-[1000]
      flex items-center justify-center
      bg-black/60 backdrop-blur-sm
    ">
      <div className="
        w-[820px] max-w-[95vw] h-[420px]
        rounded-xl p-5
        bg-[var(--c-panel)]
        border border-[var(--c-border)]
        shadow-2xl
        flex flex-col
      ">
        {/* Header */}
        <h3 className="text-xl font-semibold text-center text-[var(--c-text)] mb-4">
          Edit task — <span className="text-[var(--c-primary)]">{selectedTask.text}</span>
        </h3>

        {/* Body */}
        <div className="flex flex-1 gap-6">
          {/* Left column */}
          <div className="flex flex-col gap-3 w-64">
            <div>
              <label className="text-sm font-medium text-[var(--c-text-muted)]">
                Task name
              </label>
              <input
                type="text"
                value={selectedTask.text}
                onChange={e =>
                  setSelectedTask({ ...selectedTask, text: e.target.value })
                }
                className={inputBase}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--c-text-muted)]">
                Reminder time
              </label>
              <input
                type="datetime-local"
                value={selectedTask.callTime || ""}
                onChange={e =>
                  setSelectedTask({ ...selectedTask, callTime: e.target.value })
                }
                className={inputBase}
              />
            </div>

            <div>
              <label className="text-sm font-medium text-[var(--c-text-muted)]">
                Priority
              </label>
              <select
                value={selectedTask.priority}
                onChange={e =>
                  setSelectedTask({ ...selectedTask, priority: e.target.value })
                }
                className={inputBase}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="flex flex-col flex-1 relative">
            <label className="text-sm font-medium text-[var(--c-text-muted)] mb-5">
              Description
            </label>

            <textarea
              value={selectedTask.describe}
              onChange={e =>
                setSelectedTask({ ...selectedTask, describe: e.target.value })
              }
              className={`
                ${inputBase}
                resize-none h-full
              `}
            />

            <button
              title="Clear description"
              onClick={() =>
                setSelectedTask({ ...selectedTask, describe: "" })
              }
              className="
                absolute top-0 right-0
                p-1 text-[var(--c-text-muted)]
                hover:text-[var(--c-danger)]
                transition
              "
            >
              <VscClearAll size={16} />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-center gap-3 mt-5">
          <button
            onClick={() => {
              SaveTaskEdit()
              setShowEditWindow(false)
            }}
            className="
              px-5 py-1.5 rounded-md
              bg-[var(--c-primary)]
              hover:bg-[var(--c-primary-hover)]
              text-white
              transition
            "
          >
            Save
          </button>

          <button
            onClick={() => setShowEditWindow(false)}
            className="
              px-5 py-1.5 rounded-md
              border border-[var(--c-border)]
              text-[var(--c-text)]
              hover:bg-white/5
              transition
            "
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
