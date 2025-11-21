import { useState, useReducer, useEffect, use } from "react"
import {useHistoryContext} from "../Contexts/HistoryProvider"


export const priorityColors = {
  low: "bg-green-500 text-white",
  medium: "bg-yellow-500 text-white",
  high: "bg-red-500 text-white",
}


export default function useTasks() {
    const initialState = {
      key: "date",
      order: "asc"
    }

    const [tasks, setTasks] = useState([
      { id: 1, 
        text: "Task 1", 
        describe: "Description 1", 
        done: false, 
        callTime: null,
        priority: "medium",
      },
    ])

    const [showEditWindow, setShowEditWindow] = useState(false)
    const [selectedTask, setSelectedTask] = useState(tasks[0])
    const [displayedTasks, setDisplayedTasks] = useState(tasks)
    const { addAction} = useHistoryContext()


    function sortReducer(state, action) {
      switch (action.type) {
        case "SET_SORT_KEY":
          return { ...state, key: action.payload }

        case "SET_SORT_ORDER":
          return { ...state, order: action.payload }

        case "SET_SORT":
          return {
            ...state,
            key: action.payload.key,
            order: action.payload.order,
          }

        default:
          return state
      }
    }

    const [sortState, dispatchSort] = useReducer(sortReducer, initialState)

    const AddTask = () => {
      const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1
      const newTask = {
        id: nextId,
        text: `Task ${nextId}`,
        describe: `Description ${nextId}`,
        done: false,
        callTime: null,
        priority: "medium",
      }

      addAction({
        do: () => setTasks((prev) => [...prev, newTask]),
        undo: () => setTasks((prev) => prev.filter((t) => t.id !== newTask.id)),
      })

    }

    const DeleteAllTask = () => {
      const previousTasks = [...tasks] 

      addAction({
        do: () => {
          setTasks([])
          setSelectedTask(null)
        },
        undo: () => {
          setTasks(previousTasks)
        },
      })
    }

    
    /*
    const SaveTaskEdit = () => {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? {
                ...t,
                text: selectedTask.text,
                describe: selectedTask.describe,
                callTime: selectedTask.callTime,
                priority: selectedTask.priority || "medium",
              }
            : t
        )
      )
    }
    */

    const SaveTaskEdit = () => {
      const before = tasks.find(t => t.id === selectedTask.id)
      const after = { ...selectedTask }

      addAction({
        do: () => setTasks(prev =>
          prev.map(t => t.id === after.id ? after : t)
        ),
        undo: () => setTasks(prev =>
          prev.map(t => t.id === before.id ? before : t)
        )
      })
    }


  const handleSearch = (query) => {
    const q = (query || "").toLowerCase()

    const base =
      q === ""
        ? tasks
        : tasks.filter(
            (t) =>
              t.text.toLowerCase().includes(q) ||
              (t.describe && t.describe.toLowerCase().includes(q))
          )

    applySort(base)
  }


  const applySort = (list) => {
  const sorted = [...list]

  if (sortState.key === "date") {
    sorted.sort((a, b) => {
      const d1 = a.callTime ? new Date(a.callTime).getTime() : 0
      const d2 = b.callTime ? new Date(b.callTime).getTime() : 0
      return sortState.order === "asc" ? d1 - d2 : d2 - d1
    })
  }

  if (sortState.key === "priority") {
    const priorityOrder = { low: 1, medium: 2, high: 3 }
    sorted.sort((a, b) =>
      sortState.order === "asc"
        ? priorityOrder[a.priority] - priorityOrder[b.priority]
        : priorityOrder[b.priority] - priorityOrder[a.priority]
    )
  }

  if (sortState.key === "text") {
    sorted.sort((a, b) => {
      const textA = a.text.toLowerCase()
      const textB = b.text.toLowerCase()
      return sortState.order === "asc"
        ? textA.localeCompare(textB)
        : textB.localeCompare(textA)
    })
  }

  if (sortState.key === "description"){
    sorted.sort((a, b) => {
      const descA = a.describe ? a.describe.toLowerCase() : ""
      const descB = b.describe ? b.describe.toLowerCase() : ""
      return sortState.order === "asc" 
        ? descA.localeCompare(descB) && descA.length - descB.length
        : descB.localeCompare(descA) && descB.length - descA.length
    })
  }

  setDisplayedTasks(sorted)
}

useEffect(() => {
  applySort(tasks)
}, [tasks, sortState])





  return {
    tasks,        
    setTasks,
    applySort,
    dispatchSort,
    sortState,
    displayedTasks,
    selectedTask,
    setSelectedTask,
    handleSearch,
    DeleteAllTask,
    AddTask,
    showEditWindow,
    setShowEditWindow,
    SaveTaskEdit,
  }
}
