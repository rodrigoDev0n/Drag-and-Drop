import { useEffect, useRef, useState } from "react"
import { Draggable } from "react-beautiful-dnd"
import { todosObj } from "../helpers/todos"

export const useDraggList = () => {

    const [ondelete, setondelete] = useState('Delete')
    const [styles, setstyles] = useState('no-done-container')
    const [currentTask, setcurrentTask] = useState(todosObj)

    const reorderTask = (list, startIndex, endIndex) => {
        const result = [...list]
        const [removed] = result.splice(startIndex, 1)
        result.splice(endIndex, 0, removed)

        return result
    }

    const deleteTask = (result) => {
        const { draggableId } = result
        let newTasks = currentTask.filter(e => e.id !== draggableId)
        setcurrentTask(newTasks)
    }

    const draggControl = (result) => {
        setondelete('Delete')
        const { source, destination, droppableId } = result
        console.log(result.draggableId);
        if (!destination) return
        if (source.index === destination.index
            && source.droppableId === destination.droppableId) return
            
        setcurrentTask((currentTask) => reorderTask(currentTask, source.index, destination.index))
        if (destination.droppableId === 'delete') {
            console.log(result);
            deleteTask(result)
            setondelete('Delete')
        }
    }

    const onDeleteDirection = (result) => {
        setondelete('')
    }
    
    return {
        currentTask,
        reorderTask,
        draggControl,
        onDeleteDirection,
        ondelete,
    }
}
