import { VscClearAll } from "react-icons/vsc";


export default function EditModal({showEditWindow, setShowEditWindow, selectedTask, setSelectedTask, SaveTaskEdit}){


  return (
  <div>
    {showEditWindow && (
      <div className="fixed inset-0 bg-[rgba(225,199,199,0.5)] flex items-center justify-center z-[1000] overflow-auto">
        <div className="bg-white p-5 border-4 border-black rounded-lg w-[800px] h-[400px] text-black shadow-lg border-double flex flex-col">
          <h3 className="text-xl font-semibold mb-4 text-center">
           Edit task - {selectedTask.text}
          </h3>

          <div className="flex flex-col flex-1 text-white">
            {/* Partie gauche avec le nom et la date */}
            <div className="flex flex-row justify-between items-start">
              <div className="flex flex-col items-start">
                <label className="font-semibold mb-1">Task name</label>
                <input
                  type="text"
                  value={selectedTask.text}
                  onChange={(e) =>
                    setSelectedTask({ ...selectedTask, text: e.target.value })
                  }
                  className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300 w-64"
                />

                <label className="font-semibold mt-0">Reminder time</label>
                <input
                  type="datetime-local"
                  value={selectedTask.callTime || ""}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      callTime: e.target.value,
                    })
                  }
                  className="border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300 w-64"
                />

                <select value={selectedTask.priority} onChange={(e) => setSelectedTask({ ...selectedTask, priority: e.target.value })} className="mt-5 border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300 w-32">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Zone de description au centre */}
              <div className="flex flex-col items-center flex-1">
                <label className="font-semibold mb-1">Describe this task</label>
                <textarea
                  value={selectedTask.describe}
                  onChange={(e) =>
                    setSelectedTask({
                      ...selectedTask,
                      describe: e.target.value,
                    })
                  }
                  className="w-[400px] h-[200px] resize-none border border-gray-400 rounded px-2 py-1 focus:outline-none focus:ring focus:ring-blue-300"
                />
              </div>
              <button className="mt-8" onClick={() => setSelectedTask({...selectedTask, describe: ""})}>
                  <VscClearAll size={15} title="Clear Description"/>
              </button>
            </div>
          </div>

          {/* Boutons en bas */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                setShowEditWindow(!showEditWindow)
                SaveTaskEdit()
              }}
              className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700 transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => setShowEditWindow(!showEditWindow)}
              className="ml-2 bg-gray-300 px-4 py-1 rounded hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
)

}