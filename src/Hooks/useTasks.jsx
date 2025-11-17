import { useState, useEffect } from "react"

export default function useTasks() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Task 1", describe: "Description 1", done: false, callTime: null },
  ])

  const [showEditWindow, setShowEditWindow] = useState(false)

  const [selectedTask, setSelectedTask] = useState(tasks[0])
  const [displayedTasks, setDisplayedTasks] = useState(tasks)
  const [sortOrder, setSortOrder] = useState(null)

    // --- Gestion des tâches ---
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

  // Suppression

  const DeleteAllTask = () => {
    setTasks([])
    setSelectedTask(null)
  }

  // Sauvegarde

  const SaveTaskEdit = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === selectedTask.id
          ? {
              ...t,
              text: selectedTask.text,
              describe: selectedTask.describe,
              callTime: selectedTask.callTime,
            }
          : t
      )
    )
  }


  // --- Recherche ---
  const handleSearch = (query) => {
    const q = query?.toLowerCase() || ""
    const filtered = tasks.filter(
      (t) =>
        t.text.toLowerCase().includes(q) ||
        (t.describe && t.describe.toLowerCase().includes(q))
    )
    applySort(filtered, sortOrder)
  }

  // --- Tri ---
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

  // --- Sync global ---
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
    SaveTaskEdit

  }
}
