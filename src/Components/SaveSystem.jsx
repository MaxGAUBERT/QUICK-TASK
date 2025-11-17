export default function SaveSystem({
  showSaveModal,
  setShowSaveModal,
  savedTasks,
  setSavedTasks,
  SaveTasksToFile
}) {

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-[2000] p-4">

      <div className="bg-white text-black w-full max-w-md rounded-xl shadow-2xl border-4 border-black border-double p-6 flex flex-col gap-5 animate-scaleIn">

        <h2 className="text-center text-xl font-semibold tracking-wide">
          Save tasks
        </h2>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">File name</label>
          <input
            type="text"
            placeholder="e.g. myTasks"
            value={savedTasks}
            onChange={(e) => setSavedTasks(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-gray-400 focus:border-black focus:ring-2 focus:ring-black/30 outline-none"
          />
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            onClick={() => setShowSaveModal(!showSaveModal)}
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            className="px-5 py-2 bg-black text-white rounded-md font-medium hover:bg-gray-900 transition"
            onClick={() => SaveTasksToFile(savedTasks)}
          >
            Save
          </button>
        </div>

      </div>
    </div>
  )
}
