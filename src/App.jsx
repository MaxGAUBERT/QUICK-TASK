import TaskList from "./Components/TaskList"
import TaskManager from "./Components/TaskManager"
import useTasks from "./Hooks/useTasks"
import SearchBar from "./Components/SearchBar"
import GlobalColorContextProvider from "./Contexts/GlobalColorContext"
import EditModal from "./Components/EditModal"
import { HiOutlineBellAlert } from "react-icons/hi2";
import SaveSystem from "./Components/SaveSystem"
import useData from "./Hooks/useData"

export default function App() {

  // App.jsx
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
    SaveTasksToFile
  } = useData(tasks, setTasks)




return (
  <GlobalColorContextProvider>
    <div className="relative font-['Roboto_Mono'] italic h-screen w-screen bg-gray-800 text-white overflow-hidden">

      {/* HEADER */}
      <header className="absolute top-0 left-0 p-4">
        <h1 className="text-[30px] flex flex-row font-bold">
          QUICK TASK
          <HiOutlineBellAlert className="ml-3 bg-green-400" color="red" size={30}/>
        </h1>
        <p className="ml-1">Advanced task manager</p>
      </header>

      {/* MAIN ZONE (full responsive container) */}
      <main className="
        absolute right-0 top-0 
        flex flex-col 
        bg-gray-700
        border-4 border-gray-500 border-double
        rounded
        p-4
        h-full
        w-full
        max-w-[1100px]
        overflow-y-auto
      ">
        <div className="mt-2"> 
          <SearchBar
            onSearch={handleSearch}
            sortState={sortState}
            dispatchSort={dispatchSort}
          />
        </div>

        <div className="flex-1 mt-4 overflow-y-auto">
          <TaskList
            tasks={displayedTasks.length > 0 ? displayedTasks : tasks}
            setTasks={setTasks}
            showEditWindow={showEditWindow}
            setShowEditWindow={setShowEditWindow}
            setSelectedTask={setSelectedTask}
          />
        </div>
      </main>

      {/* EDIT MODAL */}
      {showEditWindow && (
        <EditModal
          showEditWindow={showEditWindow}
          setShowEditWindow={setShowEditWindow}
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          SaveTaskEdit={SaveTaskEdit}
        />
      )}

      {/* BOTTOM BUTTONS */}
      <div className="fixed bottom-0 left-0 p-2">
        <TaskManager
          addTask={AddTask}
          SaveTasks={() => setShowSaveModal(!showSaveModal)}
          DeleteAllTask={DeleteAllTask}
          UploadTasks={UploadTasks}
        />
      </div>

      <div>
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
    </div>
  </GlobalColorContextProvider>
);

}
