import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useDraggList } from "../hooks/useDraggList"

export const TodoApp = () => {

    const {
        currentTask,
        draggControl,
    } = useDraggList()

    return (
        <DragDropContext onDragEnd={(res) => draggControl(res)}>
            <div className="main-flex-container">
                <Droppable droppableId="todos">
                    {(droppableProvided) => (
                        <div
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                            className="todos-container">
                            {
                                currentTask.map((t, index) => (
                                    <Draggable key={t.id} draggableId={t.id} index={index}>
                                        {(draggableP) => (
                                            <div
                                                {...draggableP.draggableProps}
                                                ref={draggableP.innerRef} 
                                                {...draggableP.dragHandleProps}
                                                className="no-done-container">
                                                <p>{t.description}</p>
                                            </div>
                                        )
                                        }
                                    </Draggable>
                                ))
                            }
                            {droppableProvided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}
