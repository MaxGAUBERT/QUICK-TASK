import { useState, useEffect } from "react"


export const priorityColors = {
  low: "bg-green-500 text-white",
  medium: "bg-yellow-500 text-white",
  high: "bg-red-500 text-white",
}

export default function useTasks() {
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
  const [sortOrder, setSortOrder] = useState(null)

  const AddTask = () => {
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1
    const newTask = {
      id: nextId,
      text: `Task ${nextId}`,
      describe: `Description ${nextId}`,
      done: false,
      callTime: null,
    }
    setTasks((prev) => [...prev, newTask])
    setSelectedTask(newTask)
  }

  const DeleteAllTask = () => {
    setTasks([])
    setSelectedTask(null)
  }

  const SaveTaskEdit = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id
          ? {
              ...t,
              text: selectedTask.text,
              describe: selectedTask.describe,
              callTime: selectedTask.callTime,
              priority: selectedTask.priority,
            }
          : t
      )
    )
  }

  const handleSearch = (query) => {
  const q = (query || "").toLowerCase()

  // Si input vide → restaurer toutes les tâches
  if (q === "") {
    applySort(tasks, sortOrder)
    return
  }

  const filtered = tasks.filter(
    (t) =>
      t.text.toLowerCase().includes(q) ||
      (t.describe && t.describe.toLowerCase().includes(q))
  )

  applySort(filtered, sortOrder)
}



  const applySort = (list, order) => {
    if (!order) {
      setDisplayedTasks(list)
      return
    }
    const sorted = [...list].sort((a, b) => {
      const dateA = a.callTime ? new Date(a.callTime).getTime() : 0
      const dateB = b.callTime ? new Date(b.callTime).getTime() : 0
      return order === "asc" ? dateA - dateB : dateB - dateA
    })

    setDisplayedTasks(sorted)
  }

  const handleSort = (order) => {
    setSortOrder(order)
    applySort(displayedTasks, order)
  }

  useEffect(() => {
    applySort(tasks, sortOrder)
  }, [tasks])

  return {
    tasks,        
    setTasks,
    displayedTasks,
    selectedTask,
    setSelectedTask,
    handleSearch,
    handleSort,
    DeleteAllTask,
    AddTask,
    showEditWindow,
    setShowEditWindow,
    SaveTaskEdit,
  }
}
