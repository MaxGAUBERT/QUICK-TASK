import { useState } from "react"

export default function useData(tasks, setTasks){
    const [savedTasks, setSavedTasks] = useState("")
    const [showSaveModal, setShowSaveModal] = useState(false)

    const SaveTasksToFile = (savedTasks) => {
        const blob = new Blob([JSON.stringify(tasks, null, 2)], {
            type: "application/json"
        })
        const url = URL.createObjectURL(blob)

        const a = document.createElement("a")
        a.href = url
        a.download = savedTasks || "tasks.json"
        a.click()

        URL.revokeObjectURL(url)
    }

    const UploadTasks = (event) => {
        const file = event.target.files[0]
        if (!file) return

        const reader = new FileReader()

        reader.onload = () => {
            try {
                const text = reader.result
                console.log("Raw file content:", text) // debug

                const json = JSON.parse(text)

                if (!Array.isArray(json)) {
                    console.error("Invalid JSON: expected an array of tasks.")
                    return
                }

                setTasks(json)
                console.log("Tasks uploaded:", json)

            } catch (err) {
                console.error("Invalid JSON file format.", err)
            }
        }

        reader.readAsText(file)
    }

    return {
        savedTasks,
        setSavedTasks,
        showSaveModal,
        setShowSaveModal,
        SaveTasksToFile,
        UploadTasks,
    }
}
