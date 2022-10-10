import { useState } from "react"
import { todosObj } from "../helpers/todos"

export const useDraggList = () => {

    const [currentTask, setcurrentTask] = useState(todosObj)

    const reorderTask = (list, startIndex, endIndex) => {
        const result = [...list]
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const draggControl = (result) => {
        const { source, destination } = result
        if (!destination) return
        if (source.index === destination.index
            && source.droppableId === destination.droppableId) return

        setcurrentTask((currentTask) => reorderTask(currentTask, source.index, destination.index))
    }

    return {
        currentTask,
        reorderTask,
        draggControl,
    }
}
