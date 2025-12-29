import TaskList from "./Components/TaskList"
import TaskManager from "./Components/TaskManager"
import SearchBar from "./Components/SearchBar"
import EditModal from "./Components/EditModal"
import SaveSystem from "./Components/SaveSystem"

import useTasks from "./Hooks/useTasks"
import useData from "./Hooks/useData"
import GlobalColorContextProvider from "./Contexts/GlobalColorContext"

import { HiOutlineBellAlert } from "react-icons/hi2"

export default function App() {
  const {
    tasks,
    setTasks,
    displayedTasks,
    selectedTask,
    setSelectedTask,
    showEditWindow,
    setShowEditWindow,
    AddTask,
    DeleteAllTask,
    SaveTaskEdit,
    handleSearch,
    sortState,
    dispatchSort,
  } = useTasks()

  const {
    showSaveModal,
    setShowSaveModal,
    UploadTasks,
    savedTasks,
    setSavedTasks,
    SaveTasksToFile,
  } = useData(tasks, setTasks)

  return (
    <GlobalColorContextProvider>
      <div
        className="
          min-h-screen w-screen
          flex items-center justify-center
          bg-[var(--c-bg)]
          text-[var(--c-text)]
          font-['Roboto_Mono']
        "
      >
        {/* APP SHELL */}
        <div className="
          w-full max-w-5xl h-[100vh]
          flex flex-col
          bg-[var(--c-panel)]
          border border-[var(--c-border)]
          rounded-xl
          shadow-xl
          overflow-hidden
        ">
          {/* HEADER */}
          <header className="
            px-6 py-4
            border-b border-[var(--c-border)]
            flex items-center justify-between
          ">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                QUICK TASK
                <HiOutlineBellAlert className="text-[var(--c-primary)]" size={26} />
              </h1>
              <p className="text-sm text-[var(--c-text-muted)]">
                Advanced task manager
              </p>
            </div>
          </header>

          {/* TOOLBAR */}
          <div className="
            px-6 py-3
            border-b border-[var(--c-border)]
            flex items-center gap-4
          ">
            <SearchBar
              onSearch={handleSearch}
              sortState={sortState}
              dispatchSort={dispatchSort}
            />

            <TaskManager
              addTask={AddTask}
              SaveTasks={() => setShowSaveModal(true)}
              DeleteAllTask={DeleteAllTask}
              UploadTasks={UploadTasks}
            />
          </div>

          {/* CONTENT */}
          <main className="flex-1 overflow-y-auto p-4">
            <TaskList
              tasks={displayedTasks.length ? displayedTasks : tasks}
              setTasks={setTasks}
              showEditWindow={showEditWindow}
              setShowEditWindow={setShowEditWindow}
              setSelectedTask={setSelectedTask}
            />
          </main>
        </div>

        {/* MODALS */}
        {showEditWindow && (
          <EditModal
            showEditWindow={showEditWindow}
            setShowEditWindow={setShowEditWindow}
            selectedTask={selectedTask}
            setSelectedTask={setSelectedTask}
            SaveTaskEdit={SaveTaskEdit}
          />
        )}

        {showSaveModal && (
          <SaveSystem
            showSaveModal={showSaveModal}
            setShowSaveModal={setShowSaveModal}
            savedTasks={savedTasks}
            setSavedTasks={setSavedTasks}
            SaveTasksToFile={SaveTasksToFile}
          />
        )}
      </div>
    </GlobalColorContextProvider>
  )
}
