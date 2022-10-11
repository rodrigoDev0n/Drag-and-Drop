import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { useDraggList } from "../hooks/useDraggList"

export const TodoApp = () => {

    const {
        currentTask,
        draggControl,
        onDeleteDirection,
        ondelete,
        styles,
    } = useDraggList()

    return (
        <DragDropContext onDragEnd={(res) => draggControl(res)} onDragStart={(res) => onDeleteDirection(res)}>
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
                                        {(draggableP, snapshot) => (
                                            <div
                                                {...draggableP.draggableProps}
                                                ref={draggableP.innerRef} 
                                                {...draggableP.dragHandleProps}
                                                className={snapshot.isDragging ? 'active-drag-styles' : 'no-done-container'}
                                                isDragging={snapshot.isDragging}
                                                >
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
                <Droppable droppableId="delete">
                    {(provided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps} 
                            className="delete-section">
                            <div>
                                <div>
                                    <h3>{ondelete}</h3>
                                </div>
                            </div>
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        </DragDropContext>
    )
}
